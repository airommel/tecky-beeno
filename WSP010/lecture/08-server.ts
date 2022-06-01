import express from 'express'
import { print } from 'listening-on'
import { loadTeacherList } from './07-join'
import { Server as SocketIOServer } from 'socket.io'
import { Server as HttpServer } from 'http'

let app = express()
let httpServer = new HttpServer(app)
let socketIoServer = new SocketIOServer(httpServer)

type Room = {
  id: number
  name: string
  counter: number
}

let roomList: Room[] = [
  null as any,
  { id: 1, name: 'Demo Room', counter: 0 },
  { id: 2, name: 'Test Room', counter: 0 },
  {
    id: 3,
    name: '<button onmouseover="alert(\'You won an iPhone\')">join</button>',
    counter: 0,
  },
]

socketIoServer.on('connection', socket => {
  console.log('socket connected:', socket.id)
  socket.on('/room/join', data => {
    let id = data.id
    socket.join('/room/' + id)
  })
  socket.on('/room/quit', data => {
    let id = data.id
    socket.leave('/room/' + id)
  })
  // socket.emit('counter-update', { counter })
})

app.use(express.static('public'))

app.post('/room', (req, res) => {
  let id = roomList.length
  let name = req.body.name
  if (!name) {
    res.status(400).json({ error: 'missing name in req.body' })
    return
  }
  roomList[id] = {
    id,
    name,
    counter: 0,
  }
  res.json({ message: 'ok' })
  socketIoServer.emit('/room/new', { id, name, counter: 0 })
})

app.get('/room', (req, res) => {
  res.json({ roomList: roomList.filter(room => room) })
})

app.get('/room/:id/counter', (req, res) => {
  let room = roomList[req.params.id]
  if (!room) {
    res.status(404).json({ error: 'Room not found' })
    return
  }
  res.json({ counter: room.counter })
})

app.post('/room/:id/counter/inc', (req, res) => {
  let id = req.params.id
  let room = roomList[id]
  if (!room) {
    res.status(404).json({ error: 'Room not found' })
    return
  }
  room.counter++
  res.json({ message: 'ok' })
  socketIoServer.to('/room/' + id).emit(`/room/update`, {
    id,
    counter: room.counter,
  })
})

app.get('/teacher', async (req, res) => {
  try {
    let teacherList = await loadTeacherList()
    res.json({ teacherList })
  } catch (error: any) {
    res.status(500).json({ error: error.toString() })
  }
})

let port = 3000
httpServer.listen(port, () => {
  print(port)
})
