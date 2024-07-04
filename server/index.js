import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from './database.js';
import { verifyPassword } from './passwords.js';

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();
const SECRET_KEY = process.env.JWT_SECRET;

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.json());
app.use(cors());

const generateToken = (user) => {
  const payload = { id: user.employeeNumber, email: user.email };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

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
    return res.status(401).json({ status: 'Error', error: '로그인 실패!' });
  });
});

app.get('/api/members/:page', authenticateToken, (req, res) => {
  let { page } = req.params;
  const { max = 10 } = req.query;
  const limit = parseInt(max, 10);
  const offset = (parseInt(page, 10) - 1) * limit;

  if (!parseInt(page, 10)) {
    page = 1;
  }

  const sql = `
    SELECT 
      employeeNumber, 
      name, 
      position, 
      email, 
      phoneNumber 
    FROM 
      Members 
    ORDER BY 
      employeeNumber ASC 
    LIMIT ? 
    OFFSET ?`; // 조직 추가

  // eslint-disable-next-line consistent-return
  db.all(sql, [limit, offset], (err, rows) => {
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

app.get('/api/member/:employeeNumber', authenticateToken, (req, res) => {
  const { employeeNumber } = req.params;
  const { isAdmin } = req.query;

  const selectItems = [
    'employeeNumber',
    'name',
    'position',
    'role',
    'email',
    'phoneNumber',
    'profileImage',
  ]; // 조직 추가

  if (isAdmin === 'true') {
    selectItems.push(
      'hireDate',
      'birthDate',
      'address',
      'salary',
      'education',
      'career', // 근무 유형 추가
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
app.get('/api/user', authenticateToken, (req, res) => {
  const { employeeNumber } = req.query;

  if (!employeeNumber) {
    return res.status(422).json({
      status: 'Error',
      error: '사원 번호가 누락되었습니다.',
    });
  }

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
      remainingVacationDays
    FROM 
      Members 
    WHERE 
      employeeNumber = ?`; // 조직, 근무유형 추가

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
app.get('/api/attendance/:page', authenticateToken, (req, res) => {
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
app.get('/api/vacationRequests/:page', authenticateToken, (req, res) => {
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

app.get('/api/announcements', authenticateToken, (req, res) => {
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

app.get('/api/announcements/:id', authenticateToken, (req, res) => {
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

app.listen(port, () => {
  console.log(`ready to ${port}`);
});
