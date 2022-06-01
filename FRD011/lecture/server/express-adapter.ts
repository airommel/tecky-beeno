import express from 'express'
import { HttpError } from './http-error'

export function wrapControllerMethod(
  fn: (req: express.Request) => object | Promise<object>,
) {
  return async (req: express.Request, res: express.Response) => {
    try {
      let json = await fn(req)
      res.json(json)
    } catch (error) {
      console.error(`API Error: ${req.method} ${req.url}, error:`, error)
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message })
      } else {
        res.status(500).json({ error: String(error) })
      }
    }
  }
}
