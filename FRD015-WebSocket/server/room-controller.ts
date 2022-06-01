import express, { Request } from 'express'
import { decodeToken, wrapControllerMethod } from './controller-helpers'
import { HttpError } from './http-error'
import { RoomService } from './room-service'

export class RoomController {
  routes = express.Router()

  constructor(public roomService: RoomService) {
    this.routes.get('/room', wrapControllerMethod(this.getRoomList))
    this.routes.post('/room', wrapControllerMethod(this.createRoom))
  }

  getRoomList = async (req: Request) => {
    return await this.roomService.getRoomList()
  }

  createRoom = async (req: Request) => {
    const { name } = req.body
    if (!name) {
      throw new HttpError(400, 'missing name')
    }
    let creator_id = decodeToken(req).id
    return await this.roomService.createRoom({ name, creator_id })
  }
}
