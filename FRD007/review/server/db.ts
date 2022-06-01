import Knex, { Knex as KnexInstance } from 'knex'
import { env } from './env'

let configs = require('./knexfile')
let mode = env.NODE_ENV
let config = configs[mode]

export let knex: KnexInstance = Knex(config)
