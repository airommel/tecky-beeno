import { config } from 'dotenv'
import express from 'express'
import session from 'express-session'
import { print } from 'listening-on'
import path from 'path'
import { attachCountRoutes } from './count'
import { attachUserRoutes } from './user'

config()

let app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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

attachCountRoutes(app)
attachUserRoutes(app)

app.use(express.static('public'))

app.use((req, res) => {
  res.status(404).sendFile(path.resolve(path.join('public', '404.html')))
})

let port = 8100

app.listen(port, () => {
  print(port)
})

// fetch
