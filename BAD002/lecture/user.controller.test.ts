import { UserController } from './user.controller'
import { UserService } from './user.service'

describe('UserController', () => {
  let userService: UserService
  let userController: UserController

  let req: any
  let res: any
  let status: jest.MockedFunction<(status: number) => Response>
  let json: jest.MockedFunction<(body: any) => Response>

  beforeEach(() => {
    userService = {} as UserService
    userController = new UserController(userService)

    req = {}
    json = jest.fn()
    status = jest.fn((status: number) => res)
    res = {
      json,
      status,
    }
  })

  it('should be able to signup', async () => {
    req.body = {
      username: 'alice',
      password: 'a long enough password',
    }
    userService.signup = jest.fn().mockReturnValue(1)
    await userController.signup(req, res)

    expect(userService.signup).toBeCalledWith(req.body)
    expect(json).toBeCalledWith({ id: 1 })
  })

  it('should require both username and password', async () => {
    req.body = {}
    userService.signup = jest.fn()
    await userController.signup(req, res)

    expect(status).toBeCalledWith(400)
    expect(json).toBeCalled()
    let body = json.mock.calls[0][0]
    expect(body).toBeDefined()
    expect(body.errors).toBeDefined()
    expect(body.errors).toContain(
      'Invalid username, should be at least 3 characters',
    )
    expect(body.errors).toContain(
      'Invalid password, should be at least 8 characters',
    )
    expect(userService.signup).not.toBeCalled()
  })
})
