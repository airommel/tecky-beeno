export type StudentType = {
  name: string
  score: number
  greet: () => void
}

export interface StudentInterface {
  name: string
  score: number
  greet(): void
}

export type Color = 'red' | 'green'
export type Hour = 1 | 2 | 3

export type DOMEvent =
  | {
      type: 'click'
      mouseX: number
      mouseY: number
    }
  | {
      type: 'keyboard'
      key: string
    }

export interface CodingStudentInterface extends StudentInterface {
  coding(hour: number): void
}

export type CodingStudentType = StudentType & {
  coding: (hour: number) => void
}
