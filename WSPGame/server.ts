import express from 'express'
import { print } from 'listening-on'
import http from 'http'
import socketIO from 'socket.io'
import { env } from './env'
import { World } from './world'
import cors from 'cors'

let app = express()
let server = http.createServer(app)
let io = new socketIO.Server(server, {
  cors: {
    origin: '*',
  },
})

app.use(cors())

app.use(express.static('public'))

let world = new World(app, io)

server.listen(env.PORT, () => {
  print(env.PORT)
})
