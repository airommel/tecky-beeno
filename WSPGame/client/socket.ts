import { io } from 'socket.io-client'

export let socket = io('ws://localhost:8100')

socket.on('connect', () => {
  console.log('connected', socket.id)
})

export function on<T>(type: string, callback: (data: T) => void) {
  socket.on(type, data => {
    console.log(type, data)
    callback(data)
  })
}

export function emit<T>(type: string, data: T) {
  socket.emit(type, data)
}
