import { P5 } from './09-p5'

export class GameOfLife extends P5 {
  constructor(public name: string) {
		super()
	}
  life = 0
  setup(): void {
    this.life = 0
    this.setFrameRate(1)
  }
  draw(): void {
    this.life++
    console.log(`[${this.name}] life: ${this.life}`)
  }
}

let game1 = new GameOfLife('game 1')
let game2 = new GameOfLife('game 2')
console.log(game1)
console.log(game2)
