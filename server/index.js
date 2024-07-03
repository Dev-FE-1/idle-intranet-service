import express from 'express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from './database.js';
import { verifyPassword } from './passwords.js';

dotenv.config();

const THRESHOLD = 2000;
const port = process.env.PORT || 8080;
const app = express();
const SECRET_KEY = process.env.JWT_SECRET;

app.use((req, res, next) => {
  const delayTime = Math.floor(Math.random() * THRESHOLD);
  setTimeout(() => {
    next();
  }, delayTime);
});

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.json());

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
  const sql = 'SELECT * FROM Members WHERE email = ?';
  db.get(sql, [email], async (err, row) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }
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
    return res.status(400).json({ status: 'Error', error: '로그인 실패!' });
  });
});

app.get('/api/attendance', authenticateToken, (req, res) => {
  const sql = 'SELECT * FROM Attendance';
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

app.get('/api/vacationRequests', authenticateToken, (req, res) => {
  const sql = 'SELECT * FROM VacationRequests';

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

app.get('/api/departments', authenticateToken, (req, res) => {
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
