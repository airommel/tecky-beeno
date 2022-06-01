import {
  getSpyRoutes,
  groupRoutesByPath,
  spyRoutes,
} from 'collect-express-routes'
import dayjs from 'dayjs'
import express from 'express'
import path from 'path'
import { adminOnly } from './guard'
import { sessionMiddleware } from './session'
import { memoRoutes } from './memo'
import { userRoutes } from './user'
import { isAppleStaff, appleRoutes } from './apple'
import { oAuthMiddleware } from './oauth'
import { shouldSpyRoute, verbose } from './config'

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

app.use(memoRoutes)
app.use(userRoutes)
app.use('/apple', isAppleStaff, appleRoutes)

app.use(express.static('public'))
app.use(express.static('uploads'))
app.use('/admin', adminOnly, express.static('admin'))

app.use((req, res) => {
  res.status(404).sendFile(path.resolve(path.join('public', '404.html')))
})

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
