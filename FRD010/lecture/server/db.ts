import { Client } from 'pg'
import { env } from './env'

export let db = new Client(env.database)
