import { fizzbuzz, fizzbuzzOneNum } from './fizzbuzz'

describe('fizzbuzzOneNum', () => {
  let answers: string[] = []
  answers[0] = ''
  answers[1] = '1'
  answers[2] = '2'
  answers[3] = 'Fizz'
  answers[4] = '4'
  answers[5] = 'Buzz'
  answers[6] = 'Fizz'
  answers[7] = '7'
  answers[8] = '8'
  answers[15] = 'Fizz Buzz'
  answers[99] = 'Dog Dog'
  answers[99 * 2] = 'Dog Dog'
  answers.forEach((expected, num) => {
    it(`should return '${expected}' if input ${num}`, () => {
      expect(fizzbuzzOneNum(num)).toBe(expected)
    })
  })
  // it('should return empty string if input zero', () => {
  //   expect(fizzbuzz(0)).toBe('')
  // })
  // it('should return 1 for input one', () => {
  //   expect(fizzbuzz(1)).toBe('1')
  // })
  // it('should return 2 for input two', () => {
  //   expect(fizzbuzz(2)).toBe('2')
  // })
  // it('should return fizz for input three', () => {
  //   expect(fizzbuzz(3)).toBe('fizz')
  // })
  // it('should return 4 for input four', () => {
  //   expect(fizzbuzz(4)).toBe('4')
  // })
})

describe('fizzbuzz', () => {
  test('sample output', () => {
    expect(fizzbuzz(15)).toBe(
      '1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, Fizz Buzz',
    )
  })
})
