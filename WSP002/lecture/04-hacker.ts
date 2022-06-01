import { CodingStudent } from './02-coding-student'

export class Hacker extends CodingStudent {
  // coding(hour: number) {
  //   this.learn(hour, 1000)
  // }
	learn(){
		this.level += 1000000
	}
}
