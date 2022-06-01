function explode() {
  // throw new Error('explode')
  throw 'explode'
}

it('should throw error (DIY)', () => {
  let hasError = false
  try {
    explode()
  } catch (error: any) {
    hasError = true
    expect(error.message).toBe('explode')
  }
  expect(hasError).toBeTruthy()
})

it('should throw error (jest)', () => {
  expect(explode).toThrowError('explode')
})

it('should throw (jest)', () => {
  expect(explode).toThrow('explode')
})
