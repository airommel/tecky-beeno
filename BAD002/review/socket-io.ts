import { Server as SocketIOServer } from 'socket.io'
import { sessionMiddleware } from './session'
import express from 'express'

export let io: SocketIOServer

export function setIO(socketIoServer: SocketIOServer) {
  io = socketIoServer

  io.use((socket, next) => {
    let req = socket.request as express.Request
    let res = req.res!
    sessionMiddleware(req, res, next as express.NextFunction)
  })

  setInterval(() => {
    io.to('admin').emit('/admin/clock', { clock: Date.now() })
  }, 2000)

  io.on('connection', socket => {
    console.log('socket.io client connected:', socket.id)
    let req = socket.request as express.Request
    // console.log('socket session:', req.session)
    if (req.session.user?.is_admin) {
      socket.join('admin')
    }
  })
}
