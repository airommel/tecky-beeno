import { Person } from './03-person'

export class Bar {
  enter(group: Person[]) {
    for (let person of group) {
      if (person.age >= 18) {
        person.drink()
      }
    }
  }
}
