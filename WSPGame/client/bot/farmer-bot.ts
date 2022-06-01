import { emit, on, socket } from '../socket'
import { Data, SocketEvent } from '../types'

let username = 'farmer'
let { color, background } = randomColor()

// life_id -> Data.Life
const lifeMap = new Map<number, Data.Life>()

// life_id -> Bot
const botMap = new Map<number, FarmerBot>()

const ownerMatrix: { life_id?: number }[][] = [[]]

let config: Data.WorldConfig = {
  width: 0,
  height: 0,
  cool_down_interval: 0,
  max_step: 0,
  spawn_cost: 0,
}

socket.on('connect', () => {
  emit<SocketEvent.Login>('Login', {
    username,
    color,
    background,
  })
})

on<SocketEvent.Init>('Init', data => {
  config = data.config
  for (let y = 0; y < config.height; y++) {
    ownerMatrix[y] = []
    for (let x = 0; x < config.width; x++) {
      ownerMatrix[y][x] = {}
    }
  }
})

on<SocketEvent.LifeAdded>('LifeAdded', data => {
  lifeMap.set(data.id, data)
  if (data.player.id != socket.id) {
    return
  }
  let prevBot = botMap.get(data.id)
  prevBot?.stop()
  let bot = new FarmerBot(data)
  botMap.set(data.id, bot)
  bot.tick()
})
on<SocketEvent.LifeMoved>('LifeMoved', data => {
  let life = lifeMap.get(data.id)
  if (!life) return
  life.position = data.position
})
on<SocketEvent.ScoreChanged>('ScoreChanged', data => {
  let life = lifeMap.get(data.life_id)
  if (!life) return
  life.score = data.life_score
})
on<SocketEvent.LifeDead>('LifeDead', data => {
  lifeMap.delete(data.id)
  botMap.get(data.id)?.stop()
  botMap.delete(data.id)
})
on<SocketEvent.TerritoryOccupied>('TerritoryOccupied', data => {
  ownerMatrix[data.position.y][data.position.x].life_id = data.life_id
})

class FarmerBot {
  timer?: any

  moveDirection = Math.random() < 0.5 ? { x: -1, y: 0 } : { x: 0, y: -1 }
  spawnDirection = {
    x: this.moveDirection.x == 0 ? -1 : 0,
    y: this.moveDirection.y == 0 ? -1 : 0,
  }

  constructor(public life: Data.Life) {
    // detect server restart
    on<SocketEvent.LifeAdded>('LifeAdded', data => {
      if (data.id < life.id) {
        this.stop()
        lifeMap.delete(life.id)
        botMap.delete(life.id)
      }
    })
  }

  get score() {
    let life = lifeMap.get(this.life.id)
    return life?.score || 0
  }

  get id() {
    return this.life.id
  }

  getCurrentOwner() {
    return ownerMatrix[this.life.position.y][this.life.position.x].life_id
  }

  tick() {
    this.timer = setTimeout(() => this.tick(), config.cool_down_interval)

    if (this.findEnemy()) {
      emit<SocketEvent.AttackLife>('AttackLife', {
        life_id: this.id,
      })
      return
    }

    if (this.score >= config.spawn_cost) {
      emit<SocketEvent.SpawnLife>('SpawnLife', {
        id: this.id,
        direction: this.spawnDirection,
      })
      return
    }

    if (this.getCurrentOwner() != this.life.id) {
      emit<SocketEvent.OccupyTerritory>('OccupyTerritory', {
        life_id: this.id,
      })
      return
    }

    emit<SocketEvent.MoveLife>('MoveLife', {
      id: this.id,
      direction: this.moveDirection,
    })
    return
  }

  stop() {
    clearTimeout(this.timer)
  }

  findEnemy() {
    for (let life of lifeMap.values()) {
      if (
        life.position.x == this.life.position.x &&
        life.position.y == this.life.position.y &&
        life.player.id != this.life.player.id
      ) {
        return life
      }
    }
  }
}

function randomColor() {
  let r = Math.floor(Math.random() * 128)
  let g = Math.floor(Math.random() * 128)
  let b = Math.floor(Math.random() * 128)

  let background = formatColor(r, g, b)

  // let color = formatColor(255 - r, 255 - g, 255 - b)
  let color = formatColor(r + 128, g + 128, b + 128)
  // let color = formatColor(127 - r + 128, 127 - g + 128, 127 - b + 128)

  return { background, color }
}

function formatColor(r: number, g: number, b: number) {
  return '#' + formatHex(r) + formatHex(g) + formatHex(b)
}

function formatHex(num: number) {
  let hex = num.toString(16)
  if (hex.length == 1) {
    return '0' + hex
  }
  return hex
}
