import { HttpError } from './http-error'
import { Bearer } from 'permit'
import express from 'express'
import { userService } from './services'
import { JWTPayload } from './models'

const permit = new Bearer({
  query: 'access_token',
})

export function requireJWTPayload(req: express.Request): JWTPayload {
  let token: string
  try {
    token = permit.check(req)
  } catch (error) {
    throw new HttpError('Invalid Bearer Token', 401)
  }

  let payload = userService.decodeToken(token)
  return payload
}
