import { config } from 'dotenv'

config()

export let port = +process.env.PORT! || 8100
export let host = process.env.HOST || '127.0.0.1'
