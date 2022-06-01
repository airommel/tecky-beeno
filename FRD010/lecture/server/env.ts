import { config } from 'dotenv'

config()

function ensure(key: string) {
  let value = process.env[key]
  if (!value) {
    throw new Error(`missing ${key} environment variable`)
  }
  return value
}

export let env = {
  port: +ensure('PORT'),
  database: {
    host: ensure('POSTGRES_HOST'),
    port: +ensure('POSTGRES_PORT'),
    database: ensure('POSTGRES_DB'),
    user: ensure('POSTGRES_USER'),
    password: ensure('POSTGRES_PASSWORD'),
  },
}
