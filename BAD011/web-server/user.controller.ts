import express from 'express'
import { RestfulController } from './rest.controller'

export class UserController extends RestfulController {
  constructor() {
    super()
    this.router.get('/users/:id', this.getUserById)
    this.router.get('/users', this.getUserList)
  }

  getUserById = this.handleRequest(async (req, res) => {
    return { user: { id: req.params.id, name: 'alice' } }
  })

  getUserList = this.handleRequest(
    async (req: express.Request, res: express.Response) => {
      return { user_list: [{ id: 1, name: 'alice' }] }
    },
  )
}
