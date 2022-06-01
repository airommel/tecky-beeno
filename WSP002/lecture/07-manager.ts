import { CodingStudent } from './02-coding-student'
import Chance from 'chance'
import { Programmer } from './08-programmer'

export class SoftwareFirmManager {
  team: Programmer[] = []

  hire(programmer: Programmer) {
    this.team.push(programmer)
  }

  takeJob(manHour: number) {
    console.log('take job of', manHour, 'man hours')
    if (this.team.length < 1) {
      throw Error('not capable, no team members!')
    }
    let averageHour = manHour / this.team.length
    for (let programmer of this.team) {
      console.log('this programmer do', averageHour, 'coding')
      programmer.coding(averageHour)
    }
    console.log('finished job')
  }
}

let peter = new SoftwareFirmManager()

let chance = new Chance()
for (let i = 0; i < 50; i++) {
  let name = chance.name()
  let age = chance.age()
  console.log({ name, age })
  let alice = new CodingStudent(name, age)
  peter.hire(alice)
}

peter.takeJob(100)
