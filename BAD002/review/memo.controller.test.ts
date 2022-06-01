import { Request, Response, NextFunction } from 'express'
import { Multer } from 'multer'
import { MemoController } from './memo.controller'
import { MemoService } from './memo.service'

describe('Memo Controller', () => {
  let adminOnly: jest.MockedFunction<any>
  let loginOnly: jest.MockedFunction<any>
  let upload: Multer
  let io: jest.MockedFunction<any>

  let req: any
  let res: any
  let next: any
  let json: jest.MockedFunction<any>

  let memoController: MemoController
  let memoService: MemoService

  describe('DELETE /memo/:id', () => {
    beforeEach(() => {
      adminOnly = jest.fn((req: Request, res: Response, next: NextFunction) => {
        next()
      })
      loginOnly = jest.fn()
      upload = {
        single: jest.fn(
          () => (req: Request, res: Response, next: NextFunction) => {
            next()
          },
        ),
      } as any
      io = jest.fn()

      json = jest.fn()
      req = {
        params: {},
        body: {},
        query: {},
        session: {
          user: {
            id: 123,
            username: 'mock username',
            is_admin: true,
          },
        },
      }
      res = {
        status: jest.fn(() => res),
        json,
      }
      next = jest.fn()

      memoService = {} as any
      memoController = new MemoController(
        {
          adminOnly,
          loginOnly,
        },
        upload,
        io,
        memoService,
      )
    })

    it('should reject when receiving invalid id', async () => {
      req.params.id = 'abc'
      memoService.deleteMemo = jest.fn()
      await memoController.deleteMemo(req, res, next)
      expect(json).toBeCalledWith({
        message: 'invalid id in req.params',
      })
      expect(memoService.deleteMemo).not.toBeCalled()
    })

    it('should call memoService to delete memo if given valid id', async () => {
      req.params.id = '123'
      memoService.deleteMemo = jest.fn()
      await memoController.deleteMemo(req, res, next)
      expect(memoService.deleteMemo).toBeCalled()
    })
  })
})
