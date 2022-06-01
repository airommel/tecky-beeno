import populateEnv from 'populate-env'
import { config } from 'dotenv'

config()

export let env = {
  JWT_SECRET: '',
}

populateEnv(env, { mode: 'halt' })
