import express from 'express'
import { Multer } from 'multer'
import './express'
import { wrapControllerMethod } from './express-adapter'
import { HttpError } from './http-error'
import { LoginInput, LoginResult } from 'shared'
import { UserService } from './user-service'
import { to_full_hk_mobile_phone } from '@beenotung/tslib/validate'

export class UserController {
  router = express.Router()

  constructor(private userService: UserService) {
    this.router.post('/user/login', wrapControllerMethod(this.login))
  }

  login = async (req: express.Request): Promise<LoginResult> => {
    let body = req.body as LoginInput
    if ('tel' in body) {
      // 987654325
      // +852 98765432
      let tel = to_full_hk_mobile_phone(body.tel)
      if (!tel) {
        throw new HttpError(
          'invalid tel, expected a Hong Kong mobile phone number',
          400,
        )
      }
      return await this.userService.loginWithTel(body.tel)
    } else if ('email' in body) {
      return await this.userService.loginWithEmail(body.email)
    }
    throw new HttpError('missing tel or email in request body', 400)
  }
}
