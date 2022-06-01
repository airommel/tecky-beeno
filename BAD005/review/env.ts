import { config } from 'dotenv'

config()

if (!process.env.DB_NAME) {
  throw new Error('missing DB_NAME in env')
}
if (!process.env.DB_USER) {
  throw new Error('missing DB_USER in env')
}
if (!process.env.DB_PASSWORD) {
  throw new Error('missing DB_PASSWORD in env')
}

export let env = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  NODE_ENV: process.env.NODE_ENV || 'development',
}
