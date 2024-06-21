import sqlite3 from 'sqlite3'

const databaseName = 'toyprj1'
const database = new sqlite3.Database(`./${databaseName}.db`)

database.serialize(() => {
  database.run(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )`)
})

export default database
