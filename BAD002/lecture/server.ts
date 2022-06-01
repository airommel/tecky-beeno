import { Server } from 'http'
import { app } from './app'
import { print } from 'listening-on'
import { env } from './env'

let server = new Server(app)
server.listen(env.port, () => {
  print(env.port)
})
