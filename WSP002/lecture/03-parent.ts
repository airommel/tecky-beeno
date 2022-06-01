// import { Student } from './01-student'
import { CodingStudent } from './02-coding-student'
// import { Hacker } from './04-hacker'

export class CodingParent {
  child: CodingStudent
  constructor(child: CodingStudent) {
    // console.log('is coding student?', child instanceof CodingStudent)
    // console.log('child:', child)
    // console.log('how is child constructed?', child.constructor)
    if (child.constructor !== CodingStudent) {
      throw new Error('invalid child, expect Coding Student')
    }
    this.child = child
  }
  takeCareChild() {
    console.log('start take care')
    this.child.greet()
    let beforeLevel = this.child.getLevel()
    for (;;) {
      console.log('turn once')
      this.child.readBook(1)
      this.child.coding(2)
      let afterLevel = this.child.getLevel()
      let changedLevel = afterLevel - beforeLevel
      console.log('changed level:', changedLevel)
      if (changedLevel >= 10) {
        break
      }
    }
    console.log('finish take care')
  }
}

// let alice = new Hacker('Alice', 12)
let alice = new CodingStudent('Alice', 12)

let bob = new CodingParent(alice)

bob.takeCareChild()
