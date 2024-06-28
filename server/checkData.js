import database from './database.js';

// 테이블에서 처음 5개의 데이터 출력
const printFirstFiveRows = (tableName) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} LIMIT 5`;
    database.all(query, [], (err, rows) => {
      if (err) {
        console.error(`Error fetching data from ${tableName}:`, err);
        reject(err);
      } else {
        console.log(`First 5 rows from ${tableName}:`);
        console.table(rows);
        resolve(rows);
      }
    });
  });
};

// 데이터 조회 및 출력 함수
const checkDatabase = async () => {
  try {
    await printFirstFiveRows('Departments');
    await printFirstFiveRows('Members');
    await printFirstFiveRows('Attendance');
    await printFirstFiveRows('VacationRequests');
    await printFirstFiveRows('Announcements');
  } catch (error) {
    console.error('Error checking database:', error);
  } finally {
    database.close((err) => {
      if (err) {
        console.error('Error closing the database:', err);
      } else {
        console.log('Database connection closed.');
      }
    });
  }
};

checkDatabase();
