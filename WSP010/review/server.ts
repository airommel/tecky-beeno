import dayjs from 'dayjs'
import express from 'express'
import { print } from 'listening-on'
import path from 'path'
import { adminOnly } from './guard'
import { attachSession } from './session'
import { attachMemoRoutes } from './memo'
import { attachUserRoutes } from './user'

let app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

attachSession(app)

app.use((req, res, next) => {
  let counter = req.session.counter || 0
  counter++
  req.session.counter = counter
  req.session.save()

  let time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  console.log(`[${time}]`, `Request (${counter})`, req.url)
  next()
})

attachMemoRoutes(app)
attachUserRoutes(app)

app.use(express.static('public'))
app.use(express.static('uploads'))
app.use('/admin', adminOnly, express.static('admin'))

app.use((req, res) => {
  res.status(404).sendFile(path.resolve(path.join('public', '404.html')))
})

let port = 8100

app.listen(port, () => {
  print(port)
})
