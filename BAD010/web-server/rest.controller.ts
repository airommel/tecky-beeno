import express from 'express'

export class RestfulController {
  router = express.Router()

  handleRequest(
    fn: (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => Promise<any>,
  ) {
    return async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      try {
        let json = await fn(req, res, next)
        res.json(json)
      } catch (error: any) {
        if ('status' in error && 'message' in error) {
          res.status(error.status).json({ error: String(error.message) })
        } else {
          res.status(500).json({ error: String(error) })
        }
      }
    }
  }
}
