import { emit, on, socket } from '../socket'
import { Data, SocketEvent } from '../types'

let username = 'hunter'
let color = 'gold'
let background = 'red'

// life_id -> Life
const lifeMap = new Map<number, Life>()

const cellMatrix: Cell[][] = [[]]

let config: Data.WorldConfig = {
  width: 0,
  height: 0,
  cool_down_interval: 0,
  max_step: 0,
  spawn_cost: 0,
}

socket.on('connect', () => {
  console.log(username, 'login')
  emit<SocketEvent.Login>('Login', {
    username,
    color,
    background,
  })
})

on<SocketEvent.Init>('Init', data => {
  config = data.config
  for (let y = 0; y < config.height; y++) {
    cellMatrix[y] = []
    for (let x = 0; x < config.width; x++) {
      cellMatrix[y][x] = new Cell({ x, y })
    }
  }
})

on<SocketEvent.LifeAdded>('LifeAdded', data => {
  let life = Life.get(data)
  if (data.player.id == socket.id) {
    let bot = HunterBot.get(life)!
    if (!bot.timer) {
      bot.tick()
    }
  }
  checkAllBot()
})
on<SocketEvent.LifeMoved>('LifeMoved', data => {
  let life = Life.get(data)
  let cell = cellMatrix[data.position.y][data.position.x]
  life.moveTo(cell)
  checkAllBot()
})
on<SocketEvent.ScoreChanged>('ScoreChanged', data => {
  let life = lifeMap.get(data.life_id)
  if (!life) return
  life.data.score = data.life_score
})
on<SocketEvent.LifeDead>('LifeDead', data => {
  let life = lifeMap.get(data.id)
  life?.bot?.stop()
  lifeMap.delete(data.id)
})
on<SocketEvent.TerritoryOccupied>('TerritoryOccupied', data => {
  let cell = cellMatrix[data.position.y][data.position.x]
  cell.owner_life_id = data.life_id
  checkAllBot()
})

function checkAllBot() {
  lifeMap.forEach(life => life?.bot?.checkTick())
}

class HunterBot {
  timer?: any

  constructor(public life: Life) {
    // detect server restart
    on<SocketEvent.LifeAdded>('LifeAdded', data => {
      if (data.id < life.data.id) {
        this.stop()
      }
    })
  }

  get score() {
    return this.life.data.score
  }

  get id() {
    return this.life.data.id
  }

  getCurrentOwner() {
    return this.life.cell.owner_life_id
  }

  randomDirection() {
    let random = Math.random()
    return random < 1 / 4
      ? { x: -1, y: 0 }
      : random < 2 / 4
      ? { x: 1, y: 0 }
      : random < 3 / 4
      ? { x: 0, y: -1 }
      : { x: 0, y: 1 }
  }

  tick() {
    this.timer = 0
    let hasOwn = false
    let hasOther = false
    this.life.cell.lifeSet.forEach(life => {
      hasOwn =
        hasOwn ||
        (life.data.player.id == this.player.id && life.data.id !== this.id)
      hasOther = hasOther || life.data.player.id != this.player.id
    })
    console.log({ own: hasOwn, other: hasOther })

    if (hasOwn) {
      emit<SocketEvent.MoveLife>('MoveLife', {
        id: this.id,
        direction: this.randomDirection(),
      })
      this.timer = setTimeout(() => this.tick(), config.cool_down_interval)
      return
    }

    if (hasOther) {
      emit<SocketEvent.AttackLife>('AttackLife', {
        life_id: this.id,
      })
      this.timer = setTimeout(() => this.tick(), config.cool_down_interval)
      this.life.cell.lifeSet = new Set([this.life])
      return
    }

    if (this.score >= config.spawn_cost) {
      emit<SocketEvent.SpawnLife>('SpawnLife', {
        id: this.id,
        direction: this.randomDirection(),
      })
      this.timer = setTimeout(() => this.tick(), config.cool_down_interval)
      return
    }

    if (this.getCurrentOwner() != this.id) {
      emit<SocketEvent.OccupyTerritory>('OccupyTerritory', {
        life_id: this.id,
      })
      this.timer = setTimeout(() => this.tick(), config.cool_down_interval)
      return
    }

    // wait for enemy to enter
  }

  checkTick() {
    if (!this.timer) {
      this.tick()
    }
  }

  stop() {
    clearTimeout(this.timer)
    this.life.cell.lifeSet.delete(this.life)
    lifeMap.delete(this.life.data.id)
  }

  get position() {
    return this.life.data.position
  }

  get player() {
    return this.life.data.player
  }

  findEnemy() {
    for (let life of lifeMap.values()) {
      if (
        life.position.x == this.position.x &&
        life.position.y == this.position.y &&
        life.data.player.id != this.player.id
      ) {
        return life
      }
    }
  }

  static get(life: Life) {
    if (!life.bot && life.data.player.id == socket.id) {
      life.bot = new HunterBot(life)
    }
    return life.bot
  }
}

class Cell {
  owner_life_id?: number
  lifeSet = new Set<Life>()

  constructor(public position: Data.Point) {}
}

class Life {
  bot?: HunterBot
  cell: Cell
  constructor(public data: Data.Life) {
    this.cell = cellMatrix[data.position.y][data.position.x]
  }
  get position(): Data.Point {
    return this.data.position
  }
  moveTo(cell: Cell) {
    this.cell.lifeSet.delete(this)
    this.cell = cell
    this.cell.lifeSet.add(this)
  }
  static get(data: Data.Life) {
    let life = lifeMap.get(data.id)
    if (!life) {
      life = new Life(data)
      lifeMap.set(data.id, life)
    }
    return life
  }
}
