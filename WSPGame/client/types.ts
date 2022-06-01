export namespace Data {
  export type Player = {
    id: string
    username: string
    color: string
    background: string
  }

  export type Point = {
    readonly x: number
    readonly y: number
  }

  export type Cell = {
    position: Data.Point
    // lifeList: Data.Player[]
    life_list: Omit<Life, 'position'>[]
    owner?: Player
  }

  export type Life = {
    id: number
    position: Data.Point
    player: Data.Player
    score: number
  }

  export type WorldConfig = {
    width: number
    height: number
    max_step: number
    spawn_cost: number
    cool_down_interval: number
  }
}
export namespace SocketEvent {
  /* from client */
  export type Login = Pick<Data.Player, 'username' | 'color' | 'background'>
  export type MoveLife = {
    id: number
    direction: Data.Point
  }
  export type OccupyTerritory = {
    life_id: number
  }
  export type AttackLife = {
    life_id: number
  }
  export type SpawnLife = {
    id: number
    direction: Data.Point
  }

  /* from server */
  export type Init = {
    config: Data.WorldConfig
    cell_list: Data.Cell[]
    player_list: {
      player: Data.Player
      score: number
      life_count: number
    }[]
  }
  export type ControllerAdded = Data.Player
  export type ControllerRemoved = { id: string }
  export type LifeAdded = Data.Life
  export type LifeMoved = Data.Life
  export type LifeDead = { id: number }
  export type TerritoryOccupied = {
    position: Data.Point
    player: Data.Player
    life_id: number
  }
  export type ScoreChanged = {
    life_id: number
    life_score: number
    player_id: string
    player_score: number
    life_count: number
  }
}
