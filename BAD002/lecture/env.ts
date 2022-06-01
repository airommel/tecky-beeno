import { config } from 'dotenv'

config()

function getString(name: string) {
  let value = process.env[name]
  if (!value) {
    throw new Error(`missing '${name}' in ENV`)
  }
  return value
}

export let env = {
  port: +process.env.PORT! || 8100,
  pg: {
    database: getString('DB_NAME'),
    user: getString('DB_USER'),
    password: getString('DB_PASSWORD'),
  },
}

// let missingFields: string[] = []
// if (!env.pg.database) {
//   missingFields.push('DB_NAME')
// }
// if (!env.pg.user) {
//   missingFields.push('DB_USER')
// }
