import { Application } from 'express'
import { Server, Socket } from 'socket.io'
import { Data, SocketEvent } from './client/types'

const config: Data.WorldConfig = {
  width: 10,
  height: 10,
  max_step: 1,
  spawn_cost: 5,
  cool_down_interval: 100,
}

export class World {
  // socket.id -> Controller
  private readonly controllerMap = new Map<string, Controller>()

  // username -> Controller
  private readonly userMap = new Map<string, Controller>()

  cellMatrix: Cell[][]
  cellList: Cell[]

  constructor(public app: Application, public io: Server) {
    io.on('connection', socket => {
      console.log('connected', socket.id)
      socket.emit('Init', this.getInitData())
      socket.on('Login', (data: SocketEvent.Login) => {
        console.log('Login', data)
        let player: Data.Player = {
          id: socket.id,
          username: data.username,
          color: data.color,
          background: data.background,
        }
        let controller = new Controller(this, socket, player)
        this.addController(controller)
        let position = this.getNextPosition()
        let cell = this.cellMatrix[position.y][position.x]
        let life: Life = new Life(this, controller, cell)
        this.addLife(life)
      })
    })
    this.cellMatrix = []
    this.cellList = []
    for (let y = 0; y < config.height; y++) {
      this.cellMatrix[y] = []
      for (let x = 0; x < config.width; x++) {
        let position: Data.Point = { x, y }
        let cell = new Cell(this, position)
        this.cellMatrix[y][x] = cell
        this.cellList.push(cell)
      }
    }
  }

  emit<T>(type: string, data: T) {
    this.io.emit(type, data)
  }

  addLife(life: Life) {
    life.controller.addLife(life)
    life.cell.lifeSet.add(life)
    this.emit<SocketEvent.LifeAdded>('LifeAdded', {
      id: life.id,
      position: life.cell.position,
      player: life.player,
      score: life.score,
    })
  }

  getNextPosition(): Data.Point {
    let x = 0
    let y = 0
    let trial = 10
    do {
      x = Math.floor(Math.random() * config.width)
      y = Math.floor(Math.random() * config.height)
      if ('dev') {
        return { x, y }
      }
      trial--
    } while (this.cellMatrix[y][x].lifeSet.size > 0 || trial > 0)
    return { x, y }
  }

  addController(controller: Controller) {
    console.log('addController', controller.id)
    this.controllerMap.get(controller.id)?.terminate()
    this.userMap.get(controller.player.username)?.terminate()
    this.controllerMap.set(controller.id, controller)
    this.userMap.set(controller.player.username, controller)
    this.emit<SocketEvent.ControllerAdded>('ControllerAdded', controller.player)
  }

  removeController(controller: Controller) {
    console.log('removeController', controller.id)
    this.controllerMap.delete(controller.id)
    controller.lifeMap.forEach(life => {
      let cell = life.cell
      if (cell.owner == life) {
        cell.owner = undefined
      }
      cell.lifeSet.delete(life)
    })
    this.emit<SocketEvent.ControllerRemoved>('ControllerRemoved', {
      id: controller.id,
    })
  }

  getInitData(): SocketEvent.Init {
    return {
      config,
      cell_list: this.cellList
        .filter(cell => cell.lifeSet.size > 0 || cell.owner)
        .map(cell => cell.toJSON()),
      player_list: Array.from(this.controllerMap.values()).map(controller => ({
        player: controller.player,
        score: controller.score,
        life_count: controller.lifeMap.size,
      })),
    }
  }
}

export class Controller {
  lifeMap = new Map<number, Life>()
  hasTerminate = false

  constructor(
    public world: World,
    public socket: Socket,
    public player: Data.Player,
  ) {
    socket.on('disconnect', () => {
      world.removeController(this)
    })
    this.on<SocketEvent.MoveLife>('MoveLife', data => {
      this.lifeMap.get(data.id)?.move(data.direction)
    })
    this.on<SocketEvent.OccupyTerritory>('OccupyTerritory', data => {
      let life = this.lifeMap.get(data.life_id)
      if (!life) return
      life.occupyTerritory()
    })
    this.on<SocketEvent.AttackLife>('AttackLife', data => {
      let life = this.lifeMap.get(data.life_id)
      if (!life) return
      life.attackLife()
    })
    this.on<SocketEvent.SpawnLife>('SpawnLife', data =>
      this.lifeMap.get(data.id)?.spawnLife(data.direction),
    )
  }

  emit<T>(type: string, data: T) {
    this.socket.emit(type, data)
  }

  on<T>(type: string, callback: (data: T) => void) {
    this.socket.on(type, data => {
      console.log(type, data)
      callback(data)
    })
  }

  get id() {
    return this.socket.id
  }

  get score() {
    let totalScore = 0
    this.lifeMap.forEach(life => {
      totalScore += life.score
    })
    return totalScore
  }

  addLife(life: Life) {
    this.lifeMap.set(life.id, life)
  }

  terminate() {
    console.log('terminate', this.id)
    if (this.hasTerminate) {
      return
    }
    this.hasTerminate = true
    let close = true
    this.socket.disconnect(close)
  }
}

export class Life {
  static nextId = 1
  id: number
  score = 0
  lastTick = 0
  territoryList = new Set<Cell>()

  constructor(
    public world: World,
    public controller: Controller,
    public cell: Cell,
  ) {
    this.id = Life.nextId
    Life.nextId++
  }

  get player() {
    return this.controller.player
  }

  toJSON(): Data.Life {
    return {
      id: this.id,
      position: this.cell.position,
      player: this.player,
      score: this.score,
    }
  }

  checkCoolDown(fn: () => void) {
    let now = Date.now()
    if (now - this.lastTick < config.cool_down_interval) {
      console.log('not enough cool down', this.id)
      // this.terminate()
      return
    }
    this.lastTick = now
    fn()
  }

  setScore(score: number) {
    this.score = score
    this.world.emit<SocketEvent.ScoreChanged>('ScoreChanged', {
      life_id: this.id,
      life_score: score,
      player_id: this.player.id,
      player_score: this.controller.score,
      life_count: this.controller.lifeMap.size,
    })
    if (score < 0) {
      this.die()
    }
  }

  die() {
    this.controller.lifeMap.delete(this.id)
    this.cell.lifeSet.delete(this)
    this.world.emit<SocketEvent.LifeDead>('LifeDead', { id: this.id })
  }

  checkDirection(
    direction: Data.Point,
    callback: (direction: Data.Point) => void,
  ) {
    let x = Math.round(direction.x)
    let y = Math.round(direction.y)
    let step = Math.abs(x) + Math.abs(y)
    if (step == 0 || step > config.max_step) return
    callback({ x, y })
  }

  move(direction: Data.Point) {
    this.checkCoolDown(() => {
      this.checkDirection(direction, direction => {
        let y =
          (this.cell.position.y + direction.y + config.height) % config.height
        let x =
          (this.cell.position.x + direction.x + config.width) % config.width
        let cell = this.world.cellMatrix[y][x]
        this.cell.lifeSet.delete(this)
        this.cell = cell
        cell.lifeSet.add(this)
        this.world.emit<SocketEvent.LifeMoved>('LifeMoved', this.toJSON())
      })
    })
  }

  occupyTerritory() {
    this.checkCoolDown(() => {
      this.cell.setOwner(this)
    })
  }

  attackLife() {
    this.checkCoolDown(() => {
      let scoreGain = 0
      this.cell.lifeSet.forEach(life => {
        if (life != this) {
          scoreGain += life.score
          life.die()
        }
      })
      this.cell.lifeSet = new Set([this])
      this.setScore(this.score + scoreGain)
    })
  }

  spawnLife(direction: Data.Point) {
    this.checkCoolDown(() => {
      if (this.score < config.spawn_cost) return
      this.checkDirection(direction, direction => {
        this.setScore(this.score - config.spawn_cost)
        let y =
          (this.cell.position.y + direction.y + config.height) % config.height
        let x =
          (this.cell.position.x + direction.x + config.width) % config.width
        let cell = this.world.cellMatrix[y][x]
        let life = new Life(this.world, this.controller, cell)
        this.world.addLife(life)
      })
    })
  }
}

export class Cell {
  public lifeSet = new Set<Life>()
  public owner: Life | undefined

  constructor(public world: World, public position: Data.Point) {}

  toJSON(): Data.Cell {
    let life_list: Data.Cell['life_list'] = []
    this.lifeSet.forEach(life => {
      life_list.push({
        id: life.id,
        score: life.score,
        player: life.player,
      })
    })
    return {
      position: this.position,
      life_list,
      owner: this.owner?.player,
    }
  }

  setOwner(life: Life) {
    if (this.owner == life) return
    if (this.owner) {
      this.owner.setScore(this.owner.score - 1)
    }
    this.owner = life
    life.setScore(life.score + 1)
    this.world.emit<SocketEvent.TerritoryOccupied>('TerritoryOccupied', {
      position: life.cell.position,
      player: life.player,
      life_id: life.id,
    })
  }
}
