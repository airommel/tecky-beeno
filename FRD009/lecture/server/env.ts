import { config } from 'dotenv'

config()

if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable')
}

export let env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: +process.env.PORT! || 8100,
  JWT_SECRET: process.env.JWT_SECRET,
}
