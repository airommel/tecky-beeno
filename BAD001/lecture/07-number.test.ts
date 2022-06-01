test('compare two number', () => {
  expect(3).toBeGreaterThan(2)
})

test('compare number and string', () => {
  expect('Failed to get username input').toBeGreaterThan(2)
})

test('compare number and object', () => {
  expect({ error: 'Failed to get username input' }).toBeGreaterThan(2)
})

test('compare two number but failed', () => {
  expect(1).toBeGreaterThan(2)
})

test('compare number and NaN', () => {
  expect(NaN).toBeGreaterThan(2)
})

test('compare number and NaN', () => {
  expect(NaN).not.toBeLessThanOrEqual(2)
})
