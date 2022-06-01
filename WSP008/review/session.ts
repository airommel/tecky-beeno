import { Application } from 'express'
import session from 'express-session'
import { config } from 'dotenv'

declare module 'express-session' {
  interface SessionData {
    counter: number
    user: {
      username: string
      is_admin: boolean
    }
  }
}

export function attachSession(app: Application) {
  config()
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
}
