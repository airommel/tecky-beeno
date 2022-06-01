import dotenv from 'dotenv'
import grant from 'grant'
import { host, port } from './config'

dotenv.config()

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error('missing GOOGLE_CLIENT_ID in env')
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('missing GOOGLE_CLIENT_SECRET in env')
}

export let oAuthMiddleware = grant.express({
  defaults: {
    origin: `http://${host}:${port}`,
    transport: 'session',
    state: true,
  },
  google: {
    key: process.env.GOOGLE_CLIENT_ID || '',
    secret: process.env.GOOGLE_CLIENT_SECRET || '',
    scope: ['profile', 'email'],
    callback: '/user/login/google',
  },
})
