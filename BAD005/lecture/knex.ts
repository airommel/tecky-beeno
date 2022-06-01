import Knex from 'knex'
import { env } from './env'

let profiles = require('./knexfile')

let mode = env.NODE_ENV
// console.log('mode:', mode)

export let knex = Knex(profiles[mode])
