import express from 'express'
import path from 'path'
import session from 'express-session'
import { print } from 'listening-on'
import { config } from 'dotenv'
import dayjs from 'dayjs'

config()

let app = express()

if (!process.env.SESSION_SECRET) {
  throw new Error('missing SESSION_SECRET in env')
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
)

declare module 'express-session' {
  interface SessionData {
    counter: number
  }
}

app.use((req, res, next) => {
  let counter = req.session.counter || 0
  counter++
  req.session.counter = counter
  req.session.save()

  let time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  console.log(`[${time}]`, `Request (${counter})`, req.url)
  next()
})

app.use(express.static('public'))

app.use((req, res) => {
  res.status(404).sendFile(path.resolve(path.join('public', '404.html')))
})

let port = 8100

app.listen(port, () => {
  print(port)
})
