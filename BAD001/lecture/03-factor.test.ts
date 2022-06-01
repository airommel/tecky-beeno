import { findFactors } from './01-factor'

test('print message with console.log', () => {
  console.log('hello world')
})

describe('findFactors(x)', () => {
  test('should be defined as a function', () => {
    // console.log(typeof findFactors)
    // expect(typeof findFactors === 'function').toBe(true)
    // expect(findFactors).toBeDefined()
    expect(typeof findFactors).toBe('function')
    expect(findFactors.length).toBe(1)
  })

  test('should return [1] for input 1', () => {
    expect(findFactors(1)).not.toBe([1])
    expect(findFactors(1)).toEqual([1])
  })

  test('should return [1,n] for prime number n', () => {
    expect(findFactors(2)).toEqual([1, 2])
    expect(findFactors(3)).toEqual([1, 3])
    expect(findFactors(5)).toEqual([1, 5])
    expect(findFactors(7)).toEqual([1, 7])
  })

  test('should return all factors for positive non prime integer', () => {
    expect(findFactors(4)).toEqual([1, 2, 4])
    expect(findFactors(6)).toEqual([1, 2, 3, 6])
    expect(findFactors(8)).toEqual([1, 2, 4, 8])
  })

  test('should reject non positive number', () => {
    expect(() => findFactors(0)).toThrowError(
      'x should be non-zero positive integer',
    )
    expect(() => findFactors(-1)).toThrowError(
      'x should be non-zero positive integer',
    )
  })

  test('should reject non integer number', () => {
    expect(() => findFactors(1.5)).toThrowError('x should be integer')
  })

  test('should reject NaN', () => {
    expect(() => findFactors(NaN)).toThrowError('x should be integer')
    expect(() => findFactors(1 / 0)).toThrowError('x should be integer')
    expect(() => findFactors(parseInt('abc'))).toThrowError(
      'x should be integer',
    )
  })

  test('should reject non number', () => {
    expect(() => findFactors('abc' as any)).toThrowError('x should be integer')
    expect(() => findFactors(+'abc')).toThrowError('x should be integer')
    expect(() => findFactors([1, 3, 5, 7, 9] as any)).toThrowError(
      'x should be integer',
    )
  })
})
