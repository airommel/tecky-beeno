import dotenv from 'dotenv'
import fs from 'fs'

let NODE_ENV = process.env.NODE_ENV || 'development'

function loadEnv() {
  if (NODE_ENV === 'ci') {
    return {
      DB_NAME: process.env.POSTGRES_DB,
      DB_USER: process.env.POSTGRES_USER,
      DB_PASSWORD: process.env.POSTGRES_PASSWORD,
      DB_HOST: process.env.POSTGRES_HOST,
      ...process.env,
    } as any
  }
  let env_file = process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
  let env_text = fs.readFileSync(env_file)
  return dotenv.parse(env_text)
}

let env_dict = loadEnv()

export let env = {
  PORT: +env_dict.PORT! || 8100,
  DB_NAME: env_dict.DB_NAME,
  DB_USER: env_dict.DB_USER,
  DB_PASSWORD: env_dict.DB_PASSWORD,
  DB_HOST: env_dict.DB_HOST,
  NODE_ENV,
}
