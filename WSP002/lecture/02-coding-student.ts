import { Student } from './01-student'
import { Programmer } from './08-programmer'

export interface Human {
  // name: string
  getName(): string
}

export class CodingStudent extends Student implements Programmer, Human {
  readonly coding = (hour: number) => {
    this.learn(hour, 2)
  }
  readStackOverFlow(hour: number) {
    this.learn(hour, 1.5)
  }
  // spy() {
  //   return this.age
  // }
  learn(hour: number, efficiency: number) {
    this.validateHour(hour, 1 / 60, 4)
    this.level += hour * efficiency
  }
}

export function test() {
  let alice = new CodingStudent('Alice', 12)
  alice.greet()
  alice.coding(2)
  alice.greet()

  alice.coding(3)
  alice.greet()

  // alice.learn(1,1)
  console.log('Is alice adult?', alice.isAdult())
  // console.log('Age of alice:', alice.age)

  // alice.hacking()
  alice.greet()
}
// test()
