import express, { Request } from 'express'
import { wrapControllerMethod } from './controller-helpers'
import { HttpError } from './http-error'
import { UserService } from './user-service'

export class UserController {
  routes = express.Router()

  constructor(public userService: UserService) {
    this.routes.post('/user/login', wrapControllerMethod(this.login))
    this.routes.post('/user/register', wrapControllerMethod(this.register))
  }

  login = async (req: Request) => {
    let { username, password } = req.body
    if (!username) {
      throw new HttpError(400, 'missing username')
    }
    if (!password) {
      throw new HttpError(400, 'missing password')
    }
    return await this.userService.login({ username, password })
  }

  register = async (req: Request) => {
    let { username, password } = req.body
    if (!username) {
      throw new HttpError(400, 'missing username')
    }
    if (!password) {
      throw new HttpError(400, 'missing password')
    }
    return await this.userService.register({ username, password })
  }
}
