import Knex from 'knex'
import { env } from './env'

let profiles = require('./knexfile')

export let knex = Knex(profiles[env.NODE_ENV])
