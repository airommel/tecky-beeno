// type Student = {
//   name: string
//   age: number
// }

export class Student {
  protected name: string
  // title = 'Mr'
  // nickname = 'Alice'
  // surname = 'Wong'
  private age: number
  protected level: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
    this.level = 1
  }
  getName() {
    // return `${this.title} ${this.surname}`
    return this.name
  }
  getLevel() {
    return this.level
  }
  greet() {
    console.log('Hi, I am', this.name, '; I am level', this.level)
  }
  isAdult() {
    return this.age >= 18
  }
  protected validateHour(hour: number, min: number, max: number) {
    if (hour < min) {
      throw new Error('invalid hour, should be at least 1 minute')
    }
    if (hour > max) {
      throw new Error('invalid hour, should not excess 2 hours')
    }
    if (Number.isNaN(hour)) {
      throw new Error('invalid hour, should not be NaN')
    }
  }
  protected learn(hour: number, efficiency: number) {
    this.validateHour(hour, 1 / 60, 2)
    this.level += hour * efficiency
  }
  readBook(hour: number) {
    this.learn(hour, 1)
  }
}

export function test() {
  // let peter: Student = {
  //   name: 'Peter',
  //   age: 12,
  // }

  let peter = new Student('Peter', 12)
  let mary = new Student('Mary', 13)
  peter.greet()
  mary.greet()

  console.log('The name of mary:', mary.name)
  console.log('Is mary adult?', mary.isAdult())
  // console.log('The age of mary:', mary.age)

  peter.readBook(1.5)
  peter.greet()

  // peter.level = 1000
  // peter.learn(NaN)
  // peter.learn(1, 1000)
  // peter.readBook(1100)
  peter.greet()
}

// test()
