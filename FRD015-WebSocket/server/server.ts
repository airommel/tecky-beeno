import express from 'express'
import http from 'http'
import socketIO from 'socket.io'
import { print } from 'listening-on'
import cors from 'cors'
import { UserController } from './user-controller'
import { UserService } from './user-service'
import { knex } from './knex'
import { RoomService } from './room-service'
import { RoomController } from './room-controller'

let app = express()
let server = http.createServer(app)
let io = new socketIO.Server(server, { cors: { origin: '*' } })

app.use(cors())
app.use(express.json())

let userService = new UserService(knex)
let roomService = new RoomService(knex, io)

let userController = new UserController(userService)
let roomController = new RoomController(roomService)

app.use(userController.routes)
app.use(roomController.routes)

app.use((req, res) => {
  res
    .status(404)
    .json({ error: 'route not found: ' + req.method + ' ' + req.url })
})

let port = 8100
server.listen(port, () => {
  print(port)
})
