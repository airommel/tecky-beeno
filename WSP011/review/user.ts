import express from 'express'
import fetch from 'node-fetch'
import { QueryResult } from 'pg'
import { client } from './db'
import { adminOnly } from './guard'
import { comparePassword } from './hash'
import { User } from './models'
import './session'

export type GoogleUserInfo = {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string // .e.g. 'en'
  hd: string // e.g. 'tecky.io'
}

export let userRoutes = express.Router()

userRoutes.post('/user/logout', (req, res) => {
  req.session.user = undefined
  req.session.save()
  res.json({ message: 'Logout Success' })
})
userRoutes.post('/user/login/password', async (req, res) => {
  if (!req.body.username || typeof req.body.username != 'string') {
    res.status(400).json({ message: 'Missing username string in req.body' })
    return
  }
  if (!req.body.password || typeof req.body.password != 'string') {
    res.status(400).json({ message: 'Missing password string in req.body' })
    return
  }

  let rows: Pick<User, 'id' | 'is_admin' | 'password_hash'>[]
  try {
    // sql: and password = '${req.body.password}'
    // password: 123' or true or password = '123
    // password: 123' or password <> '123
    let result = await client.query(
      'select id, is_admin, password_hash from "user" where email = $1',
      [req.body.username],
    )
    rows = result.rows
  } catch (error: any) {
    console.error('Failed to get user for login:', error)
    res.status(500).json({ message: 'Database Error' })
    return
  }

  if (rows.length == 0) {
    res.status(400).json({
      message: 'This username is not registered. Maybe wrong username?',
    })
    return
  }
  let user = rows[0]

  if (!(await comparePassword(req.body.password, user.password_hash))) {
    res.status(400).json({
      message: 'Wrong username or password',
    })
    return
  }

  req.session.user = {
    id: user.id,
    is_admin: user.is_admin,
    username: req.body.username,
  }
  req.session.save()
  res.json({ message: 'Login Success' })
})


userRoutes.get('/user/login/google', async (req, res) => {
  let accessToken = req.session.grant?.response?.access_token
  if (!accessToken) {
    res.status(400).json({ message: 'missing access_token in grant session' })
    return
  }
  let fetchRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  })
  let userInfo: GoogleUserInfo = await fetchRes.json()
  let result = await client.query(
    'select id, is_admin from "user" where email = $1',
    [userInfo.email],
  )
  if (result.rowCount == 0) {
    // new user
    result = await client.query(
      'insert into "user" (email, avatar) values ($1, $2) returning id',
      [userInfo.email, userInfo.picture || null],
    )
    let id = result.rows[0].id
    req.session.user = {
      id,
      username: userInfo.email,
      is_admin: false,
    }
  } else {
    // existing user
    let user = result.rows[0]
    req.session.user = {
      id: user.id,
      is_admin: user.is_admin,
      username: userInfo.email,
    }
  }
  req.session.save()
  res.redirect('/')
})

userRoutes.get('/user', async (req, res) => {
  let user = req.session.user
  if (!user) {
    res.json({ user: null })
    return
  }
  let result: QueryResult
  try {
    result = await client.query('select avatar from "user" where id = $1', [
      user.id,
    ])
  } catch (error) {
    console.error('Failed to get user avatar:', error)
    res.status(500).json({ message: 'Database Error' })
    return
  }

  if (result.rowCount == 0) {
    res.json({ user: null })
    return
  }
  let row = result.rows[0]
  res.json({
    user: {
      id: user.id,
      username: user.username,
      is_admin: user.is_admin,
      avatar: row.avatar,
    },
  })
})

userRoutes.get('/secret', adminOnly, (req, res) => {
  res.json('why are you asking?')
})
