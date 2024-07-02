import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';

// __dirname 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON 파일 경로
const departmentsJsonPath = path.join(__dirname, './data/departments.json');
const membersJsonPath = path.join(__dirname, './data/members.json');
const attendanceJsonPath = path.join(__dirname, './data/attendance.json');
const vacationRequestsJsonPath = path.join(
  __dirname,
  './data/vacationRequests.json',
);
const announcementsJsonPath = path.join(__dirname, './data/announcements.json');

// JSON 파일 읽기
const readJsonFileSync = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// 데이터베이스 파일 이름 및 경로 설정
const databaseName = 'employee-management';
const database = new sqlite3.Database(`./${databaseName}.db`);

// 데이터베이스 초기화
const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    try {
      const departments = readJsonFileSync(departmentsJsonPath);
      const members = readJsonFileSync(membersJsonPath);
      const attendance = readJsonFileSync(attendanceJsonPath);
      const vacationRequests = readJsonFileSync(vacationRequestsJsonPath);
      const announcements = readJsonFileSync(announcementsJsonPath);

      database.serialize(() => {
        // Departments 데이터 삽입
        database.run(`
          CREATE TABLE IF NOT EXISTS Departments (
            departmentNumber INTEGER PRIMARY KEY,
            departmentName TEXT NOT NULL,
            admin INTEGER NOT NULL,
            numberOfMembers INTEGER NOT NULL,
            FOREIGN KEY(departmentNumber) REFERENCES Members(departmentNumber)
          )`);

        const insertDepartment = database.prepare(`
          INSERT OR IGNORE INTO departments (
            departmentNumber, departmentName, admin, numberOfMembers
          ) VALUES (?, ?, ?, ?)
        `);

        departments.forEach((department) => {
          insertDepartment.run(
            department.departmentNumber,
            department.departmentName,
            department.admin,
            department.numberOfMembers,
          );
        });
        insertDepartment.finalize();

        // Members 데이터 삽입
        database.run(`
          CREATE TABLE IF NOT EXISTS Members (
            employeeNumber INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            departmentName TEXT NOT NULL,
            position TEXT NOT NULL,
            employmentType TEXT NOT NULL,
            hireDate TEXT NOT NULL,
            birthDate TEXT NOT NULL,
            address TEXT NOT NULL,
            email TEXT NOT NULL,
            phoneNumber TEXT NOT NULL,
            salary INTEGER NOT NULL,
            isAdmin INTEGER NOT NULL,
            departmentNumber INTEGER NOT NULL,
            education TEXT NOT NULL,
            career TEXT,
            role TEXT NOT NULL,
            profileImage TEXT NOT NULL,
            remainingVacationDays REAL NOT NULL,
            password TEXT NOT NULL,
            FOREIGN KEY(departmentNumber) REFERENCES Departments(departmentNumber)
          )`);

        const insertMember = database.prepare(`
          INSERT OR IGNORE INTO members (
            employeeNumber, name, departmentName, position, employmentType, hireDate, birthDate, address, email, phoneNumber,
            salary, isAdmin, departmentNumber, education, career, role,
            profileImage, remainingVacationDays, password
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        members.forEach((member) => {
          insertMember.run(
            member.employeeNumber,
            member.name,
            member.departmentName,
            member.position,
            member.employmentType,
            member.hireDate,
            member.birthDate,
            member.address,
            member.email,
            member.phoneNumber,
            member.salary,
            member.isAdmin ? 1 : 0,
            member.departmentNumber,
            member.education,
            JSON.stringify(member.career),
            member.role,
            member.profileImage,
            member.remainingVacationDays,
            member.password,
          );
        });
        insertMember.finalize();

        // Attendance 데이터 삽입
        database.run(
          `CREATE TABLE IF NOT EXISTS Attendance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employeeNumber INTEGER NOT NULL,
            date TEXT NOT NULL,
            startTime TEXT,
            endTime TEXT,
            status TEXT NOT NULL,
            FOREIGN KEY(employeeNumber) REFERENCES Members(employeeNumber)
          )`,
        );

        const insertAttendance = database.prepare(`
          INSERT OR IGNORE INTO attendance (
            employeeNumber, date, startTime, endTime, status
          ) VALUES (?, ?, ?, ?, ?)
        `);

        attendance.forEach((record) => {
          insertAttendance.run(
            record.employeeNumber,
            record.date,
            record.startTime,
            record.endTime,
            record.status,
          );
        });
        insertAttendance.finalize();

        // VacationRequests 데이터 삽입
        database.run(
          `CREATE TABLE IF NOT EXISTS VacationRequests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employeeNumber INTEGER NOT NULL,
            departmentNumber INTEGER NOT NULL,
            vacationRequestDate TEXT NOT NULL,
            vacationStartDate TEXT NOT NULL,
            vacationEndDate TEXT NOT NULL,
            position TEXT NOT NULL,
            approvalStatus TEXT NOT NULL,
            usageStatus TEXT NOT NULL,
            vacationType TEXT NOT NULL,
            FOREIGN KEY(employeeNumber) REFERENCES Members(employeeNumber),
            FOREIGN KEY(departmentNumber) REFERENCES Departments(departmentNumber)
          )`,
        );

        const insertVacationRequest = database.prepare(`
          INSERT OR IGNORE INTO vacationRequests (
            employeeNumber, departmentNumber, vacationRequestDate,
            vacationStartDate, vacationEndDate, position, approvalStatus,
            usageStatus, vacationType
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        vacationRequests.forEach((request) => {
          insertVacationRequest.run(
            request.employeeNumber,
            request.departmentNumber,
            request.vacationRequestDate,
            request.vacationStartDate,
            request.vacationEndDate,
            request.position,
            request.approvalStatus,
            request.usageStatus,
            request.vacationType,
          );
        });
        insertVacationRequest.finalize();

        // Announcements 데이터 삽입
        database.run(`
          CREATE TABLE IF NOT EXISTS Announcements (
            announcementId INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            employeeNumber INTEGER,
            departmentNumber INTEGER,
            postedDate TEXT NOT NULL,
            imageUrl TEXT,
            FOREIGN KEY(employeeNumber) REFERENCES Members(employeeNumber),
            FOREIGN KEY(departmentNumber) REFERENCES Departments(departmentNumber)
        )`);

        const insertAnnouncement = database.prepare(`
          INSERT OR IGNORE INTO Announcements (
            announcementId, title, content, employeeNumber, departmentNumber, postedDate, imageUrl
          ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        announcements.forEach((announcement) => {
          insertAnnouncement.run(
            announcement.announcementId,
            announcement.title,
            announcement.content,
            announcement.employeeNumber,
            announcement.departmentNumber,
            announcement.postedDate,
            announcement.imageUrl,
          );
        });

        insertAnnouncement.finalize();
      });
    } catch (error) {
      console.error('Error initializing database:', error);
      reject(error);
    }
  });
};

initializeDatabase();

export default database;
