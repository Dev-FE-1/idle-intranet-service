import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

// eslint-disable-next-line consistent-return
export const extractEmployeeNumber = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 'Error',
      error: '토큰이 없습니다.',
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.employeeNumber = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({
      status: 'Error',
      error: '사원 정보가 없습니다.',
    });
  }
};
