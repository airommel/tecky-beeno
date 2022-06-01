import { config } from 'dotenv'

config()

export let env = {
  PORT: +process.env.PORT! || 8100,
}
