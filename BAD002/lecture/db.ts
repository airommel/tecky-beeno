import { Client } from 'pg'
import { env } from './env'

export let client = new Client(env.pg)
client.connect()
