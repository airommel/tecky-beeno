export type Player = 'X' | 'O'

export type Position = [x: number, y: number]

export enum Direction {
  Up = 'w',
  Down = 's',
  Left = 'a',
  Right = 'd',
}

export enum PositionIndex {
  X = 0,
  Y = 1,
}

function createPlayer(player: Player) {
  let position: Position = [0, 0]
  function move(direction: Direction) {
    switch (direction) {
      case Direction.Up:
        position[PositionIndex.Y]--
        break
      case Direction.Down:
        position[PositionIndex.Y]++
        break
      case Direction.Left:
        position[PositionIndex.X]--
        break
      case Direction.Right:
        position[PositionIndex.X]++
        break
    }
  }
  function getPosition() {
    return position
  }
  return {
    move,
    getPosition,
  }
}

console.log('Available directions:')
for (let direction in Direction) {
  console.log(' - ' + direction)
}

let player = createPlayer('X')

console.log('initial position:', player.getPosition())

console.log('move upward')
player.move(Direction.Up)

console.log('current position:', player.getPosition())
