test('string match', () => {
  expect('failed to register, missing password and username').toMatch(
    'missing password',
  )

  expect('failed to register, missing password and username').toMatch(
    /missing.*username/,
  )

  expect('Failed to register. Missing password and username').toMatch(
    /missing.*username/i,
  )

  expect(
    'Failed to register. Missing username, password and confirm password',
  ).not.toMatch(/missing.*username.*\.$/i)

  expect(
    'Failed to register. Missing username, password and confirm password.',
  ).toMatch(/missing.*username.*\.$/i)

  let failMessage =
    'Failed to register. Missing username, password and confirm password'
  expect(failMessage.toLowerCase()).toContain('missing')
  expect(failMessage.toLowerCase()).toContain('username')
  expect(failMessage[failMessage.length - 1]).not.toBe('.')

  let correctMessage =
    'Failed to register. Missing username, password and confirm password.'
  expect(correctMessage.toLowerCase()).toContain('missing')
  expect(correctMessage.toLowerCase()).toContain('username')
  expect(correctMessage[correctMessage.length - 1]).toBe('.')
})
