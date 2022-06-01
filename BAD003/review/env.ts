import dotenv from 'dotenv'

dotenv.config()

export let env = {
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  NODE_ENV: process.env.NODE_ENV || 'development',
}
