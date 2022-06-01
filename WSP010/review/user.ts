import { Application } from 'express'
import { client } from './db'
import { adminOnly } from './guard'
import { User } from './models'
import './session'

export function attachUserRoutes(app: Application) {
  app.post('/user/logout', (req, res) => {
    req.session.user = undefined
    req.session.save()
    res.json({ message: 'Logout Success' })
  })
  app.post('/user/login', async (req, res) => {
    if (!req.body.username || typeof req.body.username != 'string') {
      res.status(400).json({ message: 'Missing username string in req.body' })
      return
    }
    if (!req.body.password || typeof req.body.password != 'string') {
      res.status(400).json({ message: 'Missing password string in req.body' })
      return
    }

    let rows: Pick<User, 'id' | 'is_admin'>[]
    try {
      let result = await client.query(
        'select id, is_admin from "user" where username = $1 and password = $2',
        [req.body.username, req.body.password],
      )
      rows = result.rows
    } catch (error: any) {
      console.error('Failed to get user for login:', error)
      res.status(500).json({ message: 'Database Error' })
      return
    }

    if (rows.length == 0) {
      res.status(400).json({ message: 'Wrong username or password' })
      return
    }
    let user = rows[0]

    req.session.user = {
      id: user.id,
      is_admin: user.is_admin,
      username: req.body.username,
    }
    req.session.save()
    res.json({ message: 'Login Success' })
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
