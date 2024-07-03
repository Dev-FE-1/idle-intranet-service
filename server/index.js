import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import db from './database.js';

const THRESHOLD = 2000;
const port = process.env.PORT || 8080;
const app = express();

app.use((req, res, next) => {
  const delayTime = Math.floor(Math.random() * THRESHOLD);

  setTimeout(() => {
    next();
  }, delayTime);
});

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.json());
app.use(cors());

app.get('/api/members/:page', (req, res) => {
  const { page } = req.params;
  const { max = 10 } = req.query;
  const limit = parseInt(max, 10);
  const offset = (parseInt(page, 10) - 1) * limit;

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

app.get('/api/members/:employeeNumber', (req, res) => {
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
app.get('/api/user', (req, res) => {
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
app.get('/api/attendance/:page', (req, res) => {
  const { page } = req.params;
  const { employeeNumber, max = 10 } = req.query;

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
  const { page } = req.params;
  const { employeeNumber, max = 10 } = req.query;

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

app.listen(port, () => {
  console.log(`ready to ${port}`);
});
