import chalk from 'chalk'
import { basename } from 'path'
import { Monster } from './ex1.js'

class Attack {
  constructor(public name: string, public damage: number) {}
  toString() {
    return chalk.redBright(this.name + '(' + this.damage + ')')
    // return chalk.hex('#e83e8c')(string)
  }
}

interface Player {
  attack(monster: Monster): void
  switchAttack(): void
  gainExperience(exp: number): void
}

// export type AttackType = {
//   primary: Attack
//   secondary: Attack
// }
export type AttackType = Attack[]

export type PlayerType = 'Amazon' | 'Paladin' | 'Barbarian' | 'Tester'

const AttackTypes: Record<PlayerType, AttackType> = {
  Amazon: [new Attack('Bow and Arrow', 30), new Attack('Throwing Spear', 40)],
  Paladin: [new Attack('Swards', 50), new Attack('Magic Spells', 25)],
  Barbarian: [new Attack('Swards', 55), new Attack('Throwing Spear', 30)],
  Tester: [
    new Attack('Type 1', 1),
    new Attack('Type 2', 2),
    new Attack('Type 3', 3),
  ],
}

class GamePlayer implements Player {
  private attackType: AttackType
  private currentAttack: Attack
  private exp: number = 0
  private rateOfCritical = 1 / 4
  constructor(playerType: PlayerType) {
    this.attackType = AttackTypes[playerType]
    if (this.attackType.length == 0) {
      throw Error('no available attack types')
    }
    this.currentAttack = this.attackType[0]
  }

  toString() {
    let name = this.constructor.name
    return chalk.green('Player') + ' ' + name
  }

  attack(monster: Monster): void {
    for (; monster.isAlive(); ) {
      let attack = this.currentAttack
      let isCritical = Math.random() < this.rateOfCritical
      let damage = attack.damage * (isCritical ? 2 : 1)
      monster.injure(damage)
      this.reportAttack(monster, attack, isCritical)
      this.switchAttack()
    }
    this.gainExperience(monster.getExp())
  }

  reportAttack(monster: Monster, attack: Attack, isCritical: boolean) {
    let message = this + ' attack with ' + attack + ' on ' + monster
    if (isCritical) {
      message += ' ' + chalk.cyan('[CRITICAL]')
    }
    console.log(message)
  }

  switchAttack() {
    let index = this.attackType.indexOf(this.currentAttack)
    index = (index + 1) % this.attackType.length
    this.currentAttack = this.attackType[index]
  }

  gainExperience(exp: number): void {
    if (exp >= 0) {
      this.exp += exp
    } else {
      throw new Error('should gain positive exp')
    }
  }

  getExp() {
    return this.exp
  }
}

export function test() {
  let monster = new Monster()
  let player = new GamePlayer('Tester')
  player.attack(monster)
}

if (basename(import.meta.url) == basename(process.argv[1])) {
  test()
}
