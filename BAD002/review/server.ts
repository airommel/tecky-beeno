import { print } from 'listening-on'
import { port } from './config'
import { app, attachApp, printRoutes } from './app'
import { Server as HttpServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { setIO } from './socket-io'

export let httpServer = new HttpServer(app)
let io = new SocketIOServer(httpServer)

setIO(io)
attachApp(io)

httpServer.listen(port, () => {
  print(port)
  printRoutes()
})
