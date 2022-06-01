import session from 'express-session'
import { config } from 'dotenv'
import { GrantSession } from 'grant'

declare module 'express-session' {
  interface SessionData {
    counter: number
    user: {
      id: number
      username: string
      is_admin: boolean
    }
    grant?: GrantSession
  }
}

config()
if (!process.env.SESSION_SECRET) {
  throw new Error('missing SESSION_SECRET in env')
}

export let sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
})
