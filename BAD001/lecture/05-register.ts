import express from 'express'
import { isCommonPassword } from './06-common-password'

let app = express()

app.post('/register', (req, res) => {
  try {
    let json = checkRegister(req.body)
    if (json.error) {
      res.status(400).json(json)
    } else {
      res.json(json)
    }
    // TODO connect database
  } catch (error: any) {
    res.status(500).json({ error: error.toString() })
  }
})

export function checkRegister(
  body: Partial<{
    username: string
    password: string
    confirmPassword: string
  }>,
): { error?: string } {
  if (!body.username) {
    return { error: 'missing username' }
  }
  if (!body.password) {
    return { error: 'missing password' }
  }
  if (body.password.length < 8) {
    return { error: 'password must be at least 8 characters' }
  }
  if (isCommonPassword(body.password)) {
    return { error: 'should not use easy-to-guess password' }
  }
  if (!body.confirmPassword) {
    return { error: 'missing confirmPassword' }
  }
  if (body.password != body.confirmPassword) {
    return { error: "confirm password doesn't match" }
  }
  return {}
}

export function register(body: any) {
  let json = checkRegister(body)
  if (json.error) {
    throw new Error(json.error)
  }
}

export let signup = register
