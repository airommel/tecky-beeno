import Knex from 'knex'
import { env } from './env'

// import * as configs from './knexfile'
import './knexfile'
let configs = require('./knexfile')

// @ts-ignore
let profile = configs[env.nodeEnv]


export let knex = Knex(profile)
