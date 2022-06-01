import { config } from 'dotenv'

config()

export let env = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,

  TEST_DB_NAME: process.env.TEST_DB_NAME,
  TEST_DB_USER: process.env.TEST_DB_USER,
  TEST_DB_PASSWORD: process.env.TEST_DB_PASSWORD,

  PORT: +process.env.PORT! || 8100,
  NODE_ENV: process.env.NODE_ENV || 'development',
}
