import type { Knex } from 'knex'
import { env } from './env'

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  local: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  development: {
    client: 'postgresql',
    connection: env.database,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: env.database,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}

module.exports = config
