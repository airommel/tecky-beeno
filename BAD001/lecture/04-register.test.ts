import { checkRegister, register } from './05-register'
import { getSampleCommonPasswordList } from './06-common-password'

describe('Register Function', () => {
  it('should require password', () => {
    expect(() => register({ username: 'alice' })).toThrowError(
      'missing password',
    )
    // expect(function () {
    //   register({ username: 'alice' })
    // }).toThrowError('missing password')
  })
  it('should require password to be at least 8 characters', () => {
    expect(() => register({ username: 'alice', password: '123' })).toThrowError(
      'password must be at least 8 characters',
    )
  })
  it('should reject common password', () => {
    let sampleSize = 30
    getSampleCommonPasswordList(sampleSize).forEach(commonPassword =>
      expect(() =>
        register({
          username: 'alice',
          password: commonPassword,
          confirmPassword: commonPassword,
        }),
      ).toThrowError('should not use easy-to-guess password'),
    )
  })
  it("should reject when two password entry doesn't match", () => {
    expect(
      checkRegister({
        username: 'alice',
        password: '7891i2345',
        confirmPassword: '789lI2345',
      }),
    ).toEqual({ error: "confirm password doesn't match" })
  })
})
