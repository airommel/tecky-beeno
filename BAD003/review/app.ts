import {
  getSpyRoutes,
  groupRoutesByPath,
  spyRoutes,
} from 'collect-express-routes'
import dayjs from 'dayjs'
import express from 'express'
import path from 'path'
import { adminOnly, loginOnly } from './guard'
import { sessionMiddleware } from './session'
import { userRoutes } from './user'
import { isAppleStaff, appleRoutes } from './apple'
import { oAuthMiddleware } from './oauth'
import { shouldSpyRoute, verbose } from './config'
import { MemoService } from './memo.service'
import { knex } from './db'
import { MemoController } from './memo.controller'
import { Server } from 'socket.io'
import { upload } from './upload'

export let app = express()
if (shouldSpyRoute) {
  spyRoutes(app)
}

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(sessionMiddleware)
app.use(oAuthMiddleware)

if (verbose) {
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

app.use(userRoutes)
app.use('/apple', isAppleStaff, appleRoutes)

app.use(express.static('public'))
app.use(express.static('uploads'))
app.use('/admin', adminOnly, express.static('admin'))

export function printRoutes() {
  if (!shouldSpyRoute) {
    console.info('printRoutes only works in debug mode')
  }
  let groups = groupRoutesByPath(getSpyRoutes(app))
  for (let url in groups) {
    let methods = groups[url].map(method => method.toUpperCase())
    for (let method of methods) {
      console.log(method, '\t', url)
    }
    // console.log(url, methods)
  }
}

export function attachApp(io: Server) {
  let memoService = new MemoService(knex)
  let memoController = new MemoController(
    {
      adminOnly,
      loginOnly,
    },
    upload,
    io,
    memoService,
  )

  app.use(memoController.router)

  app.use((req, res) => {
    res.status(404).sendFile(path.resolve(path.join('public', '404.html')))
  })
}
