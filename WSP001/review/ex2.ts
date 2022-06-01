import { Hour, Minute } from './types'

export let version = 1

export function findFactors(num: number): number[] {
  let factors = []
  for (let factor = 2; factor <= num / 2; factor++) {
    if (num % factor === 0) {
      factors.push(factor)
    }
  }
  return factors
}

export function leapYear(year: number): boolean {
  if (year % 400 === 0) {
    console.log('Leap Year')
    return true
  } else if (year % 100 === 0) {
    console.log('Not a Leap Year')
    return false
  } else if (year % 4 === 0) {
    console.log('Leap Year')
    return true
  } else {
    console.log('Not a Leap Year')
    return false
  }
}

export type DNAElement = 'A' | 'C' | 'G' | 'T'
export function rnaTranscription(dna: string | Array<DNAElement>): string {
  let rna = ''
  for (let nucleotide of dna as Array<DNAElement>) {
    switch (nucleotide) {
      case 'G':
        rna += 'C'
        break
      case 'C':
        rna += 'G'
        break
      case 'T':
        rna += 'A'
        break
      case 'A':
        rna += 'U'
        break
      default:
        throw new Error(`The nucleotide ${nucleotide} does not exist`)
    }
  }
  return rna
}

export function factorial(number: bigint): bigint {
  if (number === BigInt(0) || number === BigInt(1)) {
    return BigInt(1)
  }

  return factorial(number - BigInt(1)) * number
}

export type Teacher = {
  name: string
  age: number
  students: Student[]
}
export type Student = {
  name: string
  age: number
  exercises?: Exercise[]
}
export type Exercise = {
  score: number
  date: Date
}

export const peter: Teacher = {
  name: 'Peter',
  age: 50,
  students: [
    { name: 'Andy', age: 20 },
    { name: 'Bob', age: 23 },
    {
      name: 'Charlie',
      age: 25,
      exercises: [{ score: 60, date: new Date('2019-01-05') }],
    },
  ],
}

export type TimeoutHandler = () => void

const timeoutHandler: TimeoutHandler = () => {
  console.log('Timeout happens!')
}

const timeout: number = 1000

setTimeout(timeoutHandler, timeout)

export const someValue: 12 | null = Math.random() > 0.5 ? 12 : null

export function formatTime(hour: Hour, minute: Minute) {
  let text = ''

  if (hour < 10) {
    text += '0' + hour
  } else {
    text += hour
  }

  text += ':'

  if (minute < 10) {
    text += '0' + minute
  } else {
    text += minute
  }

  return text
}

console.log(formatTime(23, 7))
