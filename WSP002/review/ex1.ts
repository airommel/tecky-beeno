import chalk from 'chalk'
import { basename } from 'path'

class Player {
  private exp = 0
  constructor(
    private strength: number,
    private name: string,
    private rateOfCritical = 1 / 4,
  ) {}

  toString() {
    return chalk.green('Player') + ' ' + this.name
  }

  attack(monster: Monster) {
    for (;;) {
      if (!monster.isAlive()) {
        break
      }
      let isCritical = Math.random() < this.rateOfCritical
      if (isCritical) {
        monster.injure(this.strength * 2)
      } else {
        monster.injure(this.strength)
      }
      let message = this + ` attacks ` + monster
      if (isCritical) {
        message += ' ' + chalk.cyan(`[CRITICAL]`)
      }
      console.log(message)
    }
    this.gainExperience(monster.getExp())
  }

  private gainExperience(exp: number) {
    this.exp += exp
  }

  getExp() {
    this.exp
  }
}

export class Monster {
  private exp: number
  constructor(private hp: number = 100) {
    this.exp = hp
  }
  getExp() {
    return this.exp
  }
  injure(strength: number) {
    if (strength > this.hp) {
      this.hp = 0
    } else {
      this.hp -= strength
    }
  }
  isAlive() {
    return this.hp > 0
  }
  toString() {
    return `a monster (HP: ${this.hp})`
  }
}

export function test() {
  // Invocations of the class and its methods
  const player = new Player(20, 'Peter')
  const monster = new Monster()
  // English counterpart: Player attacks monster
  player.attack(monster)
}

if (basename(import.meta.url) == basename(process.argv[1])) {
  test()
}
