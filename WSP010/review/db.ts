import dotenv from 'dotenv'
import { Client } from 'pg'
dotenv.config()

export const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
})

export const connectPromise = client.connect()
