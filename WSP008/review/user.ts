import { Application } from 'express'
import { DataFile } from './data-file'
import { adminOnly } from './guard'
import './session'

export type User = {
  is_admin: boolean
  username: string
  password: string
  ban_reason?: string
}

export let userDataFile = new DataFile<User[]>('user-list.json', [])

export function attachUserRoutes(app: Application) {
  app.post('/user/logout', (req, res) => {
    req.session.user = undefined
    req.session.save()
    res.json({ message: 'Logout Success' })
  })
  app.post('/user/login', (req, res) => {
    userDataFile.useData(req, res, userList => {
      if (!req.body.username || typeof req.body.username != 'string') {
        res.status(400).json({ message: 'Missing username string in req.body' })
        return
      }
      if (!req.body.password || typeof req.body.password != 'string') {
        res.status(400).json({ message: 'Missing password string in req.body' })
        return
      }
      for (let user of userList) {
        if (
          user.username == req.body.username &&
          user.password == req.body.password
        ) {
          req.session.user = {
            is_admin: true,
            username: user.username,
          }
          req.session.save()
          res.json({ message: 'Login Success' })
          return
        }
      }
      res.status(400).json({ message: 'Wrong username or password' })
    })
  })

  app.get('/user', (req, res) => {
    res.json({
      user: req.session.user,
    })
  })

  app.get('/secret', adminOnly, (req, res) => {
    res.json('why are you asking?')
  })
}
