import { config } from 'dotenv'

config()

export let env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: +process.env.PORT! || 8100,
}
