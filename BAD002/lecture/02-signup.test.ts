import { handleSignup } from './02-signup'
import type { Response } from 'express'

describe('signup', () => {
  let req: any
  let res: any
  let status: jest.MockedFunction<(status: number) => Response>
  let json: jest.MockedFunction<(body: any) => Response>
  beforeEach(() => {
    req = {}
    json = jest.fn()
    status = jest.fn((status: number) => res)
    res = {
      json,
      status,
    }
  })
  function expectCalledError(error: string) {
    expect(json).toBeCalled()
    let body = json.mock.calls[0][0]
    expect(body.errors).toBeDefined()
    expect(body.errors).toContain(error)
  }
  function expectNotCalledError(error: string) {
    expect(json).toBeCalled()
    let body = json.mock.calls[0][0]
    if (body.errors) {
      expect(body.errors).not.toContain(error)
    }
  }
  describe('username should be at least 3 characters', () => {
    let error = 'Invalid username, should be at least 3 characters'

    it('should reject if missing', () => {
      handleSignup(req, res)
      expect(status).toBeCalledWith(400)
      // expect(json).toBeCalledWith({
      //   error,
      // })
      expectCalledError(error)
    })
    it('should reject if too shorter', () => {
      req.body = {
        username: 'an',
      }
      handleSignup(req, res)
      expect(status).toBeCalledWith(400)
      // expect(json).toBeCalledWith({
      //   error,
      // })
      expectCalledError(error)
    })
    it('should not reject if given exact length', () => {
      req.body = {
        username: 'bob',
      }
      handleSignup(req, res)
      // expect(json).not.toBeCalledWith({
      //   error,
      // })
      expectNotCalledError(error)
    })
    it('should not reject if longer', () => {
      req.body = {
        username: 'dave',
      }
      handleSignup(req, res)
      // expect(json).not.toBeCalledWith({
      //   error,
      // })
      expectNotCalledError(error)
    })
  })
  describe('password should be at least 8 characters', () => {
    let error = 'Invalid password, should be at least 8 characters'
    it('should reject if missing', () => {
      handleSignup(req, res)
      expect(status).toBeCalledWith(400)
      expectCalledError(error)
    })
    it('should reject if too shorter', () => {
      req.body = {
        password: '1234567',
      }
      handleSignup(req, res)
      expect(status).toBeCalledWith(400)
      expectCalledError(error)
    })
    it('should not reject if given exact length', () => {
      req.body = {
        password: '12345678',
      }
      handleSignup(req, res)
      expectNotCalledError(error)
    })
    it('should not reject if longer', () => {
      req.body = {
        password: '123456789',
      }
      handleSignup(req, res)
      expectNotCalledError(error)
    })
  })
})
