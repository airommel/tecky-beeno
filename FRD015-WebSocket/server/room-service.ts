import { Knex } from 'knex'
import { Server } from 'socket.io'
import { HttpError } from './http-error'
import { RoomInLobby } from './model'

export class RoomService {
  constructor(public knex: Knex, public io: Server) {
    io.on('connection', socket => {
      socket.on('join', channel => {
        if (channel === 'lobby') {
          socket.join('lobby')
        }
      })
    })
  }

  async getRoomList() {
    let roomList: RoomInLobby[] = await this.knex
      .select('room.id', 'room.name', 'username')
      .from('room')
      .innerJoin('user', 'user.id', 'room.creator_id')
      .orderBy('room.id', 'desc')
    return { roomList }
  }

  async createRoom(room: { name: string; creator_id: number }) {
    let room_id: number
    try {
      let rows: any[] = await this.knex
        .insert(room)
        .into('room')
        .returning('id')
      room_id = rows[0].id as number
    } catch (error) {
      if (String(error).includes('UNIQUE')) {
        throw new HttpError(400, 'Room name already used')
      }
      throw error
    }
    let creator = await this.knex
      .select('username')
      .from('user')
      .where({ id: room.creator_id })
      .first()
    this.io.to('lobby').emit('new-room', {
      id: room_id,
      name: room.name,
      username: creator?.username,
    })
    return { room_id }
  }
}
