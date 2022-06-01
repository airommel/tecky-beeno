import $ from 'jquery'
import { on } from './socket'
import { Data, SocketEvent } from './types'
import { q, qTemplate } from './ui-utils'

namespace dom {
  export let world = q('.world')
  export let scoreBoard = q('.score-board')

  export let worldRect = world.getBoundingClientRect()
}

namespace template {
  export let row = qTemplate('.row', dom.world)
  export let col = qTemplate('.col', row)
  export let life = qTemplate('.life', col)

  export let scoreItem = qTemplate('.score-item', dom.scoreBoard)
}

let cellMatrix: HTMLDivElement[][] = []

let config: Data.WorldConfig = {
  width: 0,
  height: 0,
  cool_down_interval: 0,
  max_step: 0,
  spawn_cost: 0,
}

on<SocketEvent.Init>('Init', data => {
  dom.world.innerHTML = ''
  cellMatrix = []
  config = data.config
  for (let y = 0; y < config.height; y++) {
    let row = template.row.cloneNode(true)
    cellMatrix[y] = []
    for (let x = 0; x < config.width; x++) {
      let col = template.col.cloneNode(true) as HTMLDivElement
      row.appendChild(col)
      cellMatrix[y][x] = col
    }
    dom.world.appendChild(row)
  }
  dom.worldRect = dom.world.getBoundingClientRect()
  data.cell_list.forEach(data => {
    let position = data.position
    let cell = getCell(position)!
    if (data.owner) {
      applyTerritoryStyle(cell, data.owner)
    }
    data.life_list.forEach(data => {
      let life = createLifeElement({
        id: data.id,
        player: data.player,
        score: data.score,
        position,
      })
      cell.appendChild(life)
    })
  })

  dom.scoreBoard.innerHTML = ''
  data.player_list
    .sort((a, b) => b.score - a.score)
    .forEach(data =>
      showPlayerOnScoreBoard({
        player: data.player,
        score: data.score,
        life_count: data.life_count,
      }),
    )
})

on<SocketEvent.ControllerAdded>('ControllerAdded', data => {
  showPlayerOnScoreBoard({
    player: data,
    score: 0,
    life_count: 1,
  })
})

on<SocketEvent.ControllerRemoved>('ControllerRemoved', data => {
  let scoreItem = dom.scoreBoard.querySelector(`[data-id="${data.id}"]`)
  scoreItem?.remove()
  dom.world
    .querySelectorAll(`.life[data-player-id="${data.id}"]`)
    .forEach(life => life.remove())
  dom.world
    .querySelectorAll<HTMLElement>(`.cell[data-player-id="${data.id}"]`)
    .forEach(cell => {
      cell.style.background = ''
      cell.removeAttribute('data-player-id')
    })
})

on<SocketEvent.LifeAdded>('LifeAdded', data => {
  let cell = getCell(data.position)
  if (!cell) return
  let life = createLifeElement(data)
  cell.appendChild(life)
})

on<SocketEvent.LifeMoved>('LifeMoved', data => {
  let cell = getCell(data.position)
  if (!cell) return
  let life = dom.world.querySelector<HTMLElement>(`.life[data-id="${data.id}"]`)
  if (!life) {
    life = createLifeElement(data)
    cell.appendChild(life)
    return
  }
  moveLife(life, cell)
})

on<SocketEvent.LifeDead>('LifeDead', data => {
  let life = dom.world.querySelector<HTMLElement>(`.life[data-id="${data.id}"]`)
  if (life) {
    life.remove()
  }
})

on<SocketEvent.TerritoryOccupied>('TerritoryOccupied', data => {
  let cell = getCell(data.position)
  if (!cell) return
  applyTerritoryStyle(cell, data.player)
})

on<SocketEvent.ScoreChanged>('ScoreChanged', data => {
  let life = dom.world.querySelector<HTMLDivElement>(
    `.life[data-id="${data.life_id}"]`,
  )
  if (life) {
    q('.score', life).textContent = data.life_score.toString()
  }

  let scoreItem = dom.scoreBoard.querySelector<HTMLDivElement>(
    `[data-id="${data.player_id}"]`,
  )
  if (scoreItem) {
    q('.info .score', scoreItem).textContent = data.player_score.toString()
    q('.life .score', scoreItem).textContent = data.life_count.toString()
    sortScoreBoard()
  }
})

function showPlayerOnScoreBoard(data: {
  player: Data.Player
  score: number
  life_count: number
}) {
  let scoreItem = template.scoreItem.cloneNode(true) as HTMLDivElement
  scoreItem.dataset.id = data.player.id
  q('.info .username', scoreItem).textContent = data.player.username
  q('.info .score', scoreItem).textContent = data.score.toString()
  let previewLife = q('.life', scoreItem) as HTMLDivElement
  applyPlayerStyle(previewLife, data.player, data.life_count)
  dom.scoreBoard.appendChild(scoreItem)
}

function moveLife(life: HTMLElement, cell: HTMLElement) {
  const $life = $(life)
  life.style.position = 'absolute'

  let fullDuration = 400
  if (config.cool_down_interval < 400) {
    fullDuration = config.cool_down_interval / 2
  }
  let halfDuration = fullDuration / 2

  let destRect = cell.getBoundingClientRect()
  let destLeft = destRect.left
  let destTop = destRect.top
  let destPosition = calcLifePosition(destRect)

  let currentRect = life.getBoundingClientRect()
  let currentLeft = currentRect.left
  let currentTop = currentRect.top
  let currentPosition = calcLifePosition(currentRect)

  let halfWidth = destRect.width / 2
  let halfHeight = destRect.height / 2

  let halfLeft1 = destLeft
  let halfLeft2 = destLeft
  let halfTop1 = destTop
  let halfTop2 = destTop
  let half = false

  if (currentPosition.x == 0 && destPosition.x > 1) {
    half = true
    halfLeft1 = currentLeft - halfWidth
    halfLeft2 = destLeft + halfWidth
  } else if (currentPosition.x == config.width - 1 && destPosition.x == 0) {
    half = true
    halfLeft1 = currentLeft + halfWidth
    halfLeft2 = destLeft - halfWidth
  }
  if (currentPosition.y == 0 && destPosition.y > 1) {
    half = true
    halfTop1 = currentTop - halfHeight
    halfTop2 = destTop + halfHeight
  } else if (currentPosition.y == config.height - 1 && destPosition.y == 0) {
    half = true
    halfTop1 = currentTop + halfHeight
    halfTop2 = destTop - halfHeight
  }

  if (!half) {
    $life.animate(
      {
        top: destTop,
        left: destLeft,
      },
      fullDuration,
    )
    return
  }

  $life.animate(
    {
      top: halfTop1,
      left: halfLeft1,
    },
    halfDuration,
    () => {
      life.style.left = halfLeft2 + 'px'
      life.style.top = halfTop2 + 'px'
      $life.animate(
        {
          top: destTop,
          left: destLeft,
        },
        halfDuration,
      )
    },
  )
}

function calcLifePosition(rect: DOMRect) {
  let left = rect.left - dom.worldRect.left
  let top = rect.top - dom.worldRect.top
  let x = left / rect.width
  let y = top / rect.height
  return {
    x: Math.round(x),
    y: Math.round(y),
  }
}

function createLifeElement(data: Data.Life) {
  let life = template.life.cloneNode(true) as HTMLDivElement
  life.dataset.id = data.id.toString()
  life.dataset.playerId = data.player.id
  applyPlayerStyle(life, data.player, data.score)
  return life
}

function applyPlayerStyle(
  life: HTMLElement,
  player: Data.Player,
  score: number,
) {
  life.style.background = player.background
  life.style.color = player.color
  life.style.outline = '1px solid ' + player.color
  q('.username', life).textContent = player.username
  q('.score', life).textContent = score.toString()
}

function applyTerritoryStyle(cell: HTMLElement, player: Data.Player) {
  cell.style.background = player.background
  cell.dataset.playerId = player.id
}

function sortScoreBoard() {
  Array.from(dom.scoreBoard.querySelectorAll('.score-item'))
    .map(scoreItem => {
      let score = +scoreItem.querySelector('.score')!.textContent!
      return { scoreItem, score }
    })
    .sort((a, b) => b.score - a.score)
    .forEach(({ scoreItem }) => {
      dom.scoreBoard.appendChild(scoreItem)
    })
}

function getCell(position: Data.Point): HTMLElement | undefined {
  let cell = cellMatrix[position.y]?.[position.x]
  return cell
}
