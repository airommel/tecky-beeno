jest.mock('./db')

import { handleSignup } from './06-signup'
import { client } from './db'

describe('signup function', () => {
  it('should be able to signup', async () => {
    let req: any = {
      body: {
        username: 'alice',
        password: 'password must be at least 8 characters',
      },
    }
    let json = jest.fn()
    let status = jest.fn(() => res)
    let res: any = {
      status,
      json,
    }
    let result = {
      rows: [{ id: 1 }],
    }
    jest.spyOn(client, 'query').mockReturnValue(result)
    await handleSignup(req, res)
    expect(json).toBeCalledWith({ id: 1 })
  })
})
