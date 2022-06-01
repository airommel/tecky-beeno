import type { MemoService } from './memo.service'
import type { NextFunction, Request, Response } from 'express'
import express from 'express'
import { HttpError } from './http-error'
import { SessionData, Session } from 'express-session'
import { Multer } from 'multer'
import fs from 'fs'
import { Server } from 'socket.io'
import './session'

export class MemoController {
  router = express.Router()

  constructor(
    private guards: {
      adminOnly: express.RequestHandler
      loginOnly: express.RequestHandler
    },
    private upload: Multer,
    private io: Server,
    private memoService: MemoService,
  ) {
    // this.router.get('/memo', this.loadMemoList)
    // this.router.delete('/memo/:id', adminOnly, this.deleteMemo)
  }

  defineAPI<Route extends string>(
    method: 'get' | 'delete' | 'post',
    route: Route,
    ...routeHandlers: express.RequestHandler[]
  ) {
    let originalFn = routeHandlers.pop()!
    // console.log({
    //   route,
    //   method,
    //   routeHandlers,
    // })
    let fn = async (req: Request, res: Response, next: NextFunction) => {
      try {
        await originalFn(req, res, next)
      } catch (error: any) {
        if (error instanceof HttpError) {
          res.status(error.status).json({ message: error.message })
        } else {
          res.status(500).json({ message: error.toString() })
        }
      }
    }
    this.router[method](route, ...routeHandlers, fn)
    return fn
  }

  loadMemoList = this.defineAPI('get', '/memo', async (req, res) => {
    let memoList = await this.memoService.loadMemoList()
    res.json({ memoList })
  })

  // loadMemoList_old = async (req: Request, res: Response) => {
  //   try {
  //     let memoList = await this.memoService.loadMemoList()
  //     res.json({ memoList })
  //   } catch (error) {
  //     console.error('Failed to load memo list:', error)
  //     res.status(500).json({ message: 'Database Error' })
  //   }
  // }

  deleteMemo = this.defineAPI(
    'delete',
    '/memo/:id',
    this.guards.adminOnly,
    async (req: Request, res: Response) => {
      let sessionUser = req.session.user!

      let memo_id = +req.params.id
      if (!memo_id) {
        res.status(400).json({ message: 'invalid id in req.params' })
        return
      }

      await this.memoService.deleteMemo({
        memo_id,
        user_id: sessionUser.id,
        session: req.session as SessionData & Session,
      })

      res.json({ ok: true })
    },
  )

  createMemo = this.defineAPI(
    'post',
    '/memo',
    this.guards.loginOnly,
    this.upload.single('photo'),
    async (req, res) => {
      let user = req.session.user!
      function cleanup() {
        if (req.file) {
          fs.unlink(req.file.path, error => {
            console.error('Failed to cleanup memo photo:', error)
          })
        }
      }
      let content: string = req.body.content
      if (!content) {
        res.status(400).json({ message: 'missing content' })
        cleanup()
        return
      }
      let color = req.body.color || req.body.custom_color
      if (!color) {
        res.status(400).json({ message: 'missing color or custom_color' })
        cleanup()
        return
      }

      let memo = {
        user_id: user.id,
        content,
        color,
        image: req.file ? req.file.filename : null,
      }

      let id: number = await this.memoService.createMemo(memo)

      this.io.emit('/memo/create', {
        memo: {
          id,
          ...memo,
        },
      })
      res.json({ message: 'Created Memo' })
    },
  )
}
