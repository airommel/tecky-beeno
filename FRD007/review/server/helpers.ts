import express from 'express'
import { HttpError } from './http-error'

export function wrapControllerMethod(method: (req: express.Request) => any) {
  return async (req: express.Request, res: express.Response) => {
    try {
      let result = await method(req)
      res.json(result)
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message })
      } else {
        res.status(500).json({ error: String(error) })
      }
    }
  }
}
