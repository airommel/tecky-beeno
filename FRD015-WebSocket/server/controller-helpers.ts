import { Request, Response, NextFunction } from 'express'
import { HttpError } from './http-error'
import jwt from 'jwt-simple'
import { Bearer } from 'permit'
import { env } from './env'
import { JWTPayload } from './model'

export function wrapControllerMethod(fn: (req: Request) => any) {
  return async (req: Request, res: Response) => {
    try {
      let json = await fn(req)
      res.json(json)
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: String(error.message) })
      } else {
        res.status(500).json({ error: String(error) })
      }
    }
  }
}

const permit = new Bearer({ query: 'access_token' })

export function decodeToken(req: Request) {
  try {
    let token = permit.check(req)
    let payload: JWTPayload = jwt.decode(token, env.JWT_SECRET)
    return payload
  } catch (error) {
    throw new HttpError(403, 'invalid jwt')
  }
}
