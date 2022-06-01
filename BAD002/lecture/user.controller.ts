import type { Request, Response } from 'express'
import { Router } from 'express'
import type { UserService } from './user.service'

export class UserController {
  router = Router()

  // router2 = this.router

  constructor(private userService: UserService) {
    this.router.get('/user/:id/profile', this.todo)
    this.router.post('/user/login', this.todo)
    this.router.post('/user/signup', this.signup)
  }

  async todo(req: Request, res: Response) {
    res.status(501).json({ errors: ['not implemented'] })
  }

  // login = async function(req: Request, res: Response)  {
  // }

  signup = async (req: Request, res: Response) => {
    let errors: string[] = []
    let username = req.body?.username
    let password = req.body?.password
    if (typeof username !== 'string' || username.length < 3) {
      errors.push('Invalid username, should be at least 3 characters')
    }
    if (typeof password !== 'string' || password.length < 8) {
      errors.push('Invalid password, should be at least 8 characters')
    }
    if (errors.length > 0) {
      res.status(400).json({ errors })
      return
    }
    try {
      let id = await this.userService.signup({ username, password })
      res.json({ id })
    } catch (error: any) {
      res.status(500).json({ errors: [error.toString()] })
    }
  }
}
