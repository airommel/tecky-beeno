import { Request, Response, NextFunction } from 'express'
import './session'

export function adminOnly(req: Request, res: Response, next: NextFunction) {
  if (req.session.user?.is_admin) {
    next()
  } else {
    res.status(401).json({ message: 'Only accessible by admin' })
  }
}

export function loginOnly(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) {
    next()
  } else {
    res.status(401).json({ message: 'Only accessible by user' })
  }
}
