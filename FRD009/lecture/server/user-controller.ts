import express from 'express'
import { wrapControllerMethod } from './helpers'
import { HttpError } from './http-error'
import { requireJWTPayload } from './jwt-helper'
import { UserService } from './user-service'
import { LoginUserWithOAuthDTO, LoginUserWithPasswordDTO } from './models'
import fetch from 'node-fetch'
import type { ReactFacebookLoginInfo } from 'react-facebook-login'

export class UserController {
  router = express.Router()

  constructor(private userService: UserService) {
    this.router.post(
      '/user/login/password',
      wrapControllerMethod(this.loginWithPassword),
    )
    this.router.post(
      '/user/login/facebook',
      wrapControllerMethod(this.loginWithFacebook),
    )
    this.router.post('/user/register', wrapControllerMethod(this.register))
  }

  loginWithPassword = async (req: express.Request) => {
    let { username, password } = req.body
    if (!username) throw new HttpError('missing username in request body', 400)
    if (!password) throw new HttpError('missing password in request body', 400)
    let user: LoginUserWithPasswordDTO = { username, password }
    let token = await this.userService.loginWithPassword(user)
    return { token }
  }

  loginWithFacebook = async (req: express.Request) => {
    let { accessToken } = req.body
    if (!accessToken)
      throw new HttpError('missing accessToken in request body', 400)
    let oAuthRes = await fetch(
      `https://graph.facebook.com/me?access_token=${accessToken}&fields=email`,
    )
    let oAuthJson: ReactFacebookLoginInfo = await oAuthRes.json()
    let email = oAuthJson.email
    if (!email) {
      throw new HttpError('missing email in oauth response', 400)
    }
    let token = await this.userService.loginWithOAuth({ email })
    return { token }
  }

  register = async (req: express.Request) => {
    let { username, password } = req.body
    if (!username) throw new HttpError('missing username in request body', 400)
    if (!password) throw new HttpError('missing password in request body', 400)
    let user: LoginUserWithPasswordDTO = { username, password }
    let token = await this.userService.register(user)
    return { token }
  }
}
