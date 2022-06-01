import { env } from './env'
import { startServer } from './server'
import { print } from 'listening-on'

async function main() {
  await startServer(env.PORT)
  print(env.PORT)
}
main()
