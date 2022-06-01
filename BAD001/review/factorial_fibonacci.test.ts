import { factorial, fibonacci } from './factorial_fibonacci'

describe('factorial()', () => {
  it('should be a function', () => {
    expect(typeof factorial).toBe('function')
  })
  it('should match sample answers from wikipedia.org', () => {
    // reference: https://en.wikipedia.org/wiki/Factorial
    expect(factorial(0)).toBe(1)
    expect(factorial(1)).toBe(1)
    expect(factorial(2)).toBe(2)
    expect(factorial(3)).toBe(6)
    expect(factorial(4)).toBe(24)
  })
  it('should reject negative integer', () => {
    expect(() => factorial(-1)).toThrowError('n should be NON-NEGATIVE integer')
  })
  it('should reject non-integer number', () => {
    expect(() => factorial(1.5)).toThrowError(
      'n should be non-negative INTEGER',
    )
  })
  it('should reject non-negative non-integer number', () => {
    expect(() => factorial(-1.5)).toThrowError(
      'n should be NON-NEGATIVE INTEGER',
    )
  })
})

describe('fibonacci()', () => {
  it('should be a function', () => {
    expect(typeof fibonacci).toBe('function')
  })
  describe('should follows the recurrent relation', () => {
    // reference: https://en.wikipedia.org/wiki/Fibonacci_number
    let answers = []
    answers[0] = 0
    answers[1] = 1
    answers[2] = 1
    answers[3] = 2
    answers[4] = 3
    answers[5] = 5
    answers[10] = 55
    answers[15] = 610
    answers[20] = 6765
    answers.forEach((value, i) => {
      test(`fib(${i}) should be ${value}`, () => {
        expect(fibonacci(i)).toBe(value)
      })
    })
    // expect(fibonacci(0)).toBe(0)
    // expect(fibonacci(1)).toBe(1)
    // expect(fibonacci(2)).toBe(1)
    // expect(fibonacci(3)).toBe(2)
    // expect(fibonacci(4)).toBe(3)
    // expect(fibonacci(5)).toBe(5)
    // expect(fibonacci(10)).toBe(55)
    // expect(fibonacci(20)).toBe(6765)
  })
  describe('performance test', () => {
    test.skip('speed test', () => {
      for (let i = 0; ; i++) {
        let start = Date.now()
        fibonacci(i)
        let end = Date.now()
        let duration = end - start
        console.log({ i, duration })
      }
    })
    it('should calculate fib(42) within 1 second', () => {
      let start = Date.now()
      fibonacci(42)
      let end = Date.now()
      let duration = end - start
      expect(duration).toBeLessThanOrEqual(1000)
    })
  })
})
