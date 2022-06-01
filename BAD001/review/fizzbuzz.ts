let specialCaseList: { base: number; output: string }[] = [
  { base: 99, output: 'Dog Dog' },
  { base: 15, output: 'Fizz Buzz' },
  { base: 3, output: 'Fizz' },
  { base: 5, output: 'Buzz' },
]

export function fizzbuzzOneNum(num: number): string {
  if (num == 0) {
    return ''
  }
  for (let specialCase of specialCaseList) {
    if (num % specialCase.base == 0) {
      return specialCase.output
    }
  }
  // if (num % 15 == 0) {
  //   return 'Fizz Buzz'
  // }
  // if (num % 3 == 0) {
  //   return 'Fizz'
  // }
  // if (num % 5 == 0) {
  //   return 'Buzz'
  // }
  return num.toString()
}

export function fizzbuzz(num: number): string {
  let output = ''
  for (let i = 1; i <= num; i++) {
    if (i != 1) {
      output += ', '
    }
    output += fizzbuzzOneNum(i)
  }
  return output
}
