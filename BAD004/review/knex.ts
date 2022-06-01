import Knex from 'knex'
import { env } from './env'

let profiles = require('./knexfile')
let mode = env.NODE_ENV
let settings = profiles[mode]

export let knex = Knex(settings)
