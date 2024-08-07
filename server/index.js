import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from './database.js';
import { verifyPassword } from './passwords.js';
import { extractEmployeeNumber } from './middlewares/authMiddleware.js';
import { uploadImageToCloudinary } from './cloudinary.js';

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();
const SECRET_KEY = process.env.JWT_SECRET;

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.json({ limit: '10mb' }));

const allowedOrigins = [
  'https://dev-fe-1.github.io',
  'http://localhost:5173',
  'http://localhost:8080',
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  }),
);

const generateToken = (user) => {
  const payload = { id: user.employeeNumber, email: user.email };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

app.post('/api/verify-token', async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.json({ valid: false });
  }

  try {
    await jwt.verify(token, SECRET_KEY);
    return res.json({ valid: true });
  } catch (err) {
    return res.json({ valid: false });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // 이메일과 비밀번호가 제공되지 않은 경우: STATUS 400
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: 'Error', error: '이메일과 비밀번호는 필수입니다!' });
  }

  const sql = 'SELECT * FROM Members WHERE email = ?';

  db.get(sql, [email], async (err, row) => {
    // 데이터베이스 쿼리 중 서버 에러 발생: STATUS 500
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    // 이메일이 데이터베이스에 없는 경우: STATUS 400
    if (!row) {
      return res
        .status(400)
        .json({ status: 'Error', error: '존재하지 않는 계정입니다!' });
    }

    const match = await verifyPassword(password, row.password);
    if (match) {
      const token = generateToken(row);
      return res.json({ status: 'OK', token });
    }

    // 비밀번호가 틀린 경우: STATUS 401
    return res.status(401).json({
      status: 'Error',
      error:
        '로그인에 실패하였습니다. 이메일과 비밀번호를 다시 확인해 주시기 바랍니다!',
    });
  });
  return null;
});

app.get('/api/members/:page', (req, res) => {
  let { page } = req.params;
  const { max = 10 } = req.query;
  const limit = parseInt(max, 10);
  const offset = (parseInt(page, 10) - 1) * limit;

  if (!parseInt(page, 10)) {
    page = 1;
  }

  const sqlData = `
    SELECT 
      employeeNumber, 
      name, 
      position, 
      email, 
      phoneNumber,
      departmentName,
      profileImage
    FROM 
      Members
    ORDER BY 
      employeeNumber ASC 
    LIMIT ? 
    OFFSET ?`;

  const sqlCount = `
    SELECT COUNT(*) AS total
    FROM Members`;

  // eslint-disable-next-line consistent-return
  db.get(sqlCount, (err, countRow) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    // eslint-disable-next-line consistent-return
    db.all(sqlData, [limit, offset], (error, rows) => {
      if (err) {
        return res.status(500).json({
          status: 'Error',
          error: error.message,
        });
      }

      res.json({
        status: 'OK',
        total: countRow.total,
        data: rows,
      });
    });
  });
});

// eslint-disable-next-line consistent-return
app.get('/api/members/search/:name', (req, res) => {
  const { name } = req.params;
  const { max = 10, page = 1 } = req.query;
  const limit = parseInt(max, 10);
  const offset = (parseInt(page, 10) - 1) * limit;

  if (!name) {
    return res.status(400).json({
      status: 'Error',
      error: 'Name query parameter is required',
    });
  }

  const decodedName = decodeURIComponent(name);

  const sqlData = `
    SELECT 
      employeeNumber, 
      name, 
      position, 
      email, 
      phoneNumber,
      departmentName,
      profileImage
    FROM 
      Members
    WHERE
      name LIKE ?
    ORDER BY 
      employeeNumber ASC
    LIMIT ?
    OFFSET ?`;

  const sqlCount = `
    SELECT COUNT(*) AS total
    FROM Members
    WHERE name LIKE ?`;

  // eslint-disable-next-line consistent-return
  db.get(sqlCount, [`%${decodedName}%`], (err, countRow) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    // eslint-disable-next-line no-shadow, consistent-return
    db.all(sqlData, [`%${decodedName}%`, limit, offset], (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: 'Error',
          error: err.message,
        });
      }

      res.json({
        status: 'OK',
        total: countRow.total,
        data: rows,
      });
    });
  });
});

app.get('/api/member/:employeeNumber', (req, res) => {
  const { employeeNumber } = req.params;
  const { isAdmin, isOwner } = req.query;

  const selectItems = [
    'employeeNumber',
    'name',
    'position',
    'role',
    'email',
    'phoneNumber',
    'profileImage',
    'departmentName',
  ];

  if (isAdmin === '1' || isOwner) {
    selectItems.push(
      'hireDate',
      'birthDate',
      'address',
      'salary',
      'education',
      'career',
      'employmentType',
    );
  }

  const sql = `
    SELECT ${selectItems.join(',')} FROM Members WHERE employeeNumber = ?`;

  // eslint-disable-next-line consistent-return
  db.get(sql, [employeeNumber], (err, row) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    if (!row) {
      return res.status(404).json({
        status: 'Error',
        error: '사용자를 찾을 수 없습니다.',
      });
    }

    res.json({
      status: 'OK',
      data: row,
    });
  });
});

// eslint-disable-next-line consistent-return
app.get('/api/user', extractEmployeeNumber, (req, res) => {
  const { employeeNumber } = req;

  const sql = `
    SELECT 
      employeeNumber,
      name, 
      position, 
      hireDate, 
      birthDate, 
      address, 
      email, 
      phoneNumber, 
      isAdmin, 
      departmentNumber, 
      education, 
      career, 
      role, 
      profileImage, 
      remainingVacationDays,
      departmentName,
      employmentType
    FROM 
      Members 
    WHERE 
      employeeNumber = ?`;

  // eslint-disable-next-line consistent-return
  db.get(sql, [employeeNumber], (err, row) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    if (!row) {
      return res.status(404).json({
        status: 'Error',
        error: '사용자를 찾을 수 없습니다.',
      });
    }

    res.json({
      status: 'OK',
      data: row,
    });
  });
});

// eslint-disable-next-line consistent-return
app.get('/api/attendance/weekly', extractEmployeeNumber, (req, res) => {
  const { employeeNumber } = req;

  const today = new Date();
  const dayOfWeek = today.getDay();
  const diffToMonday = (dayOfWeek + 6) % 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - diffToMonday);
  const mondayStr = monday.toISOString().split('T')[0];
  const todayStr = today.toISOString().split('T')[0];

  const sql = `
    SELECT * 
    FROM 
      Attendance 
    WHERE 
      employeeNumber = ? AND date BETWEEN ? AND ?
    ORDER BY date DESC`;

  // eslint-disable-next-line consistent-return
  db.all(sql, [employeeNumber, mondayStr, todayStr], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    res.json({
      status: 'OK',
      data: rows,
    });
  });
});

app.post('/api/addAttendance', (req, res) => {
  const { employeeNumber, date, startTime, endTime, status } = req.body;

  const sql = `
    INSERT INTO Attendance (employeeNumber, date, startTime, endTime, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  // eslint-disable-next-line consistent-return
  db.run(sql, [employeeNumber, date, startTime, endTime, status], (err) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    res.json({
      status: 'OK',
    });
  });
});

app.post('/api/updateAttendance', (req, res) => {
  const { employeeNumber, date, endTime } = req.body;

  const sql = `
    UPDATE Attendance
    SET endTime = ?
    WHERE employeeNumber = ? AND date = ? AND endTime IS NULL
  `;

  // eslint-disable-next-line consistent-return
  db.run(sql, [endTime, employeeNumber, date], (err) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    res.json({
      status: 'OK',
    });
  });
});

app.post('/api/vacationRequests', (req, res) => {
  const {
    employeeNumber,
    departmentNumber,
    vacationStartDate,
    vacationEndDate,
    approvalStatus,
    vacationType,
    vacationStartTime,
    vacationEndTime,
    vacationReason,
    vacationRequestDate,
    usageStatus,
  } = req.body;

  const sql = `
    INSERT INTO VacationRequests(
      employeeNumber,
      departmentNumber,
      vacationRequestDate,
      vacationStartDate,
      vacationEndDate,
      approvalStatus,
      vacationType,
      vacationStartTime,
      vacationEndTime,
      vacationReason,
      usageStatus
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      employeeNumber,
      departmentNumber,
      vacationRequestDate,
      vacationStartDate,
      vacationEndDate,
      approvalStatus,
      vacationType,
      vacationStartTime,
      vacationEndTime,
      vacationReason,
      usageStatus,
    ],
    // eslint-disable-next-line consistent-return
    (err) => {
      if (err) {
        console.error('DB error:', err.message);
        return res.status(500).json({
          status: 'Error',
          error: err.message,
        });
      }

      res.json({
        status: 'OK',
      });
    },
  );
});

// eslint-disable-next-line consistent-return
app.get('/api/attendance/:page', (req, res) => {
  let { page } = req.params;
  const { employeeNumber, max = 10 } = req.query;

  if (!parseInt(page, 10)) {
    page = 1;
  }

  if (!employeeNumber) {
    return res.status(422).json({
      status: 'Error',
      error: '사원 번호가 누락되었습니다.',
    });
  }

  const limit = parseInt(max, 10);
  const offset = (parseInt(page, 10) - 1) * limit;

  const sql = `
    SELECT * 
    FROM 
      Attendance 
    WHERE 
      employeeNumber = ? 
    ORDER BY date DESC 
    LIMIT ? 
    OFFSET ?`;

  // eslint-disable-next-line consistent-return
  db.all(sql, [employeeNumber, limit, offset], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    res.json({
      status: 'OK',
      data: rows,
    });
  });
});

// eslint-disable-next-line consistent-return
app.get('/api/vacationRequests/:page', (req, res) => {
  let { page } = req.params;
  const { employeeNumber, max = 10 } = req.query;

  if (!parseInt(page, 10)) {
    page = 1;
  }

  if (!employeeNumber) {
    return res.status(422).json({
      status: 'Error',
      error: '사원 번호가 누락되었습니다.',
    });
  }

  const limit = parseInt(max, 10);
  const offset = (parseInt(page, 10) - 1) * limit;

  const sql = `
    SELECT * 
    FROM 
      VacationRequests 
    WHERE 
      employeeNumber = ? 
    ORDER BY vacationRequestDate DESC 
    LIMIT ? 
    OFFSET ?`;

  // eslint-disable-next-line consistent-return
  db.all(sql, [employeeNumber, limit, offset], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    res.json({
      status: 'OK',
      data: rows,
    });
  });
});

app.get('/api/announcements', (req, res) => {
  const sql = 'SELECT * FROM Announcements';

  // eslint-disable-next-line consistent-return
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    res.json({
      status: 'OK',
      data: rows,
    });
  });
});

app.get('/api/announcements/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM Announcements WHERE announcementId = ?';

  // eslint-disable-next-line consistent-return
  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    if (!row) {
      return res.status(404).json({
        status: 'Error',
        error: '공지를 찾을 수 없습니다.',
      });
    }

    res.json({
      status: 'OK',
      data: row,
    });
  });
});

app.get('/api/departments', (req, res) => {
  const sql = 'SELECT * FROM Departments';

  // eslint-disable-next-line consistent-return
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    res.json({
      status: 'OK',
      data: rows,
    });
  });
});

app.put('/api/updateProfile', async (req, res) => {
  const { employeeNumber, profileData } = req.body;
  const { address, phoneNumber } = profileData;
  let { profileImage } = profileData;

  try {
    if (profileImage && profileImage.startsWith('data:image')) {
      profileImage = await uploadImageToCloudinary(profileImage);
    }

    const sql = `
      UPDATE Members
      SET profileImage = ?, address = ?, phoneNumber = ?
      WHERE employeeNumber = ?
    `;

    // eslint-disable-next-line consistent-return
    // eslint-disable-line prefer-arrow-callback
    db.run(
      sql,
      [profileImage, address, phoneNumber, employeeNumber],
      // eslint-disable-next-line consistent-return
      function (err) {
        if (err) {
          return res.status(500).json({
            status: 'Error',
            error: err.message,
          });
        }

        if (this.changes === 0) {
          return res.status(404).json({
            status: 'Error',
            error: '해당 사용자를 찾을 수 없습니다.',
          });
        }

        res.json({
          status: 'OK',
          message: '프로필이 성공적으로 업데이트되었습니다.',
        });
      },
    );
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      error: '프로필 업데이트 중 오류가 발생했습니다.',
    });
  }
});

app.listen(port, () => {
  console.log(`ready to ${port}`);
});
