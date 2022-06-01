import Knex from 'knex'
import { env } from './env'

let knexfile = require('./knexfile')
let config = knexfile[env.NODE_ENV]

export let knex = Knex(config)
