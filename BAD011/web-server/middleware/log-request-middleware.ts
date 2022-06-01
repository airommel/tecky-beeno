import express from 'express'
import { logService } from '../services'

export let logRequestMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  logService.logRequest({
    method: req.method,
    url: req.url,
    user_agent: req.headers['user-agent'],
  })
  next()
}
