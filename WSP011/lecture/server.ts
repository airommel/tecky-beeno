import dayjs from 'dayjs'
import express from 'express'
import { print } from 'listening-on'
import path from 'path'
import { adminOnly } from './guard'
import { sessionMiddleware } from './session'
import { app, printRoutes } from './app'
import { memoRoutes } from './memo'
import { userRoutes } from './user'
import { Server as HttpServer } from 'http'
import { isAppleStaff, appleRoutes } from './apple'
import { startSocketIOServer } from './socket-io'
import { oAuthMiddleware } from './oauth'
import { port } from './config'

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(sessionMiddleware)
app.use(oAuthMiddleware)

let mode = 'verbose'
mode = 'dev'
if (mode == 'verbose') {
  app.use((req, res, next) => {
    let counter = req.session.counter || 0
    counter++
    req.session.counter = counter
    req.session.save()

    let time = dayjs().format('YYYY-MM-DD HH:mm:ss')
    console.log(`[${time}]`, `Request (${counter})`, req.url)
    next()
  })
}

app.use(memoRoutes)
app.use(userRoutes)
app.use('/apple', isAppleStaff, appleRoutes)

app.use(express.static('public'))
app.use(express.static('uploads'))
app.use('/admin', adminOnly, express.static('admin'))

app.use((req, res) => {
  res.status(404).sendFile(path.resolve(path.join('public', '404.html')))
})

let httpServer = new HttpServer(app)
startSocketIOServer(httpServer)

httpServer.listen(port, () => {
  print(port)
  printRoutes()
})
