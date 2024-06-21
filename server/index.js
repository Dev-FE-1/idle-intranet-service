import express from 'express'
import morgan from 'morgan'
import fs from 'fs'
import db from './database.js'

const THRESHOLD = 2000
const port = process.env.PORT || 8080
const app = express()

app.use((req, res, next) => {
  const delayTime = Math.floor(Math.random() * THRESHOLD)

  setTimeout(() => {
    next();
  }, delayTime);
})

app.use(morgan('dev'))
app.use(express.static('dist'))
app.use(express.json())

app.get('/api/counter', (req, res) => {
  const counter = Number(req.query.latest)

  if (Math.floor(Math.random() * 10) <= 3) {
    res.status(400).send({
      status: 'Error',
      data: null,
    })
  } else {
    res.status(200).send({
      status: 'OK',
      data: counter + 1,
    })
  }
})

app.get('/api/users.json', (req, res) => {
  fs.readFile('./server/data/users.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err)
        return res.status(500).send({ 
          status: 'Internal Server Error',
          message: err,
          data: null,
        })
    }

    try {
        const jsonData = JSON.parse(data)
        res.json(jsonData)
    } catch (parseErr) {
        console.error('Error parsing JSON file:', parseErr)
        return res.status(500).send({ 
          status: 'Internal Server Error',
          message: parseErr,
          data: null,
        })
    }
  })
})

app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM Users'

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ 
        status: 'Error',
        error: err.message
      })
    }

    res.json({ 
      status: 'OK',
      data: rows 
    })
  })
})

app.listen(port, () => {
  console.log(`ready to ${port}`)
})
