const unitLength = 30
const bgColor = 'rgba(0,0,0,0)'
const penColor = 'rgba(127,127,127,0.5)'
const strokeColor = 50
let columns /* To be determined by window width */
let rows /* To be determined by window height */
let worlds = 1
let cursorX
let cursorY
let pen = [[0, 0]]
let penW = 0

const fire = 'red'
const earth = 'orange'
const metal = 'black'
const water = '#0D6EFD'
const wood = 'green'
const growthWheel = [fire, earth, metal, water, wood]

let penMode = 'life'

let boxColor = growthWheel[0]

// a 3-dimensional matrix of (columns * rows * world), each element is an cell object
let board = []

const main = document.querySelector('main')
const cursor = document.querySelector('#cursor')
const container = document.querySelector('#canvas')
let containerRect

const penWInput = document.querySelector('#penWInput')
penWInput.value = 0
const patternTextarea = document.querySelector('#patternText')

function trimUnitLength(size) {
  let reminder = size % unitLength
  return size - reminder
}

function setup() {
  /* Set the canvas to be under the element #canvas*/
  const canvas = createCanvas(1, 1)
  canvas.parent(container)
  container.style.margin = unitLength + 'px'

  for (let i = 0; i < growthWheel.length; i++) {
    growthWheel[i] = color(growthWheel[i])
  }

  main.classList.add('ready')
  windowResized()

  frameRate(5)
  render()
}

function windowResized() {
  const heightForControlPanel =
    patternTextarea.parentElement.getBoundingClientRect().height

  resizeCanvas(
    trimUnitLength(windowWidth - unitLength * 2) + 1,
    trimUnitLength(windowHeight - unitLength * 2 - heightForControlPanel) + 1,
  )

  /* for cursor range */
  containerRect = container.getBoundingClientRect()

  /*Calculate the number of columns and rows */
  columns = floor(width / unitLength)
  rows = floor(height / unitLength)

  // Set the initial values of the board
  init()
}

function newCell() {
  return {
    color: 0,
    isWall: false,
    isAlive: false,
    isSurvive: false,
    generation: 0,
  }
}

/**
 * Initialize/reset the board state
 */
function init() {
  for (let x = 0; x < columns; x++) {
    if (board[x] == undefined) {
      board[x] = []
    }
    for (let y = 0; y < rows; y++) {
      if (board[x][y] == undefined) {
        board[x][y] = []
      }
      for (let w = 0; w < worlds; w++) {
        if (board[x][y][w] == undefined) {
          board[x][y][w] = newCell()
        }
      }
    }
  }
}

function draw() {
  generate()
  render()
}

function render() {
  // background(bgColor)
  clear()
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      renderCell(x, y)
    }
  }
  renderPen()
}

function renderPen() {
  const cx = Math.floor(cursorX / unitLength)
  const cy = Math.floor(cursorY / unitLength)
  for (const xy of pen) {
    const x = cx + xy[0]
    const y = cy + xy[1]
    fill(penColor)
    stroke(strokeColor)
    rect(x * unitLength + 1, y * unitLength + 1, unitLength - 1, unitLength - 1)
  }
}

function fillCellColor(x, y, w) {
  const cell = board[x][y][w]
  if (cell.isWall) {
    fill(cell.color)
    return
  }
  if (!cell.isAlive) {
    fill(bgColor)
    return
  }
  const alpha = cell.generation == 1 ? 127 : 255
  let boxColor = color(cell.color)
  boxColor = color(
    boxColor.levels[0],
    boxColor.levels[1],
    boxColor.levels[2],
    alpha,
  )
  fill(boxColor)
}

function renderCell(x, y) {
  for (let w = 0; w < worlds; w++) {
    const cell = board[x][y][w]
    fillCellColor(x, y, w)
    stroke(strokeColor)
    const top = y * unitLength + 1
    const left = x * unitLength + 1
    rect(left, top, unitLength - 1, unitLength - 1)
    if (cell.isAlive) {
      textSize((unitLength / 3) * 2)
      fill('black')
      text(w.toString(), left, top + unitLength / 2)
    }
    if (cell.isWall) {
      textSize((unitLength / 3) * 2)
      fill('black')
      text(w.toString(), left + unitLength / 2, top + (unitLength / 2) * 2)
    }
  }
}

function mod(number, base) {
  return (number + base) % base
}

function generate() {
  //Loop over every single box on the board
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      for (let w = 0; w < worlds; w++) {
        const cell = board[x][y][w]
        // Count all living members in the Moore neighborhood(8 boxes surrounding)
        let neighbors = []
        for (let dx of [-1, 0, 1]) {
          for (let dy of [-1, 0, 1]) {
            if (dx == 0 && dy == 0) {
              // the cell itself is not its own neighbor
              continue
            }
            // The modulo operator is crucial for wrapping on the edge
            const peerX = mod(x + dx, board.length)
            const peerY = mod(y + dy, board[peerX].length)
            const neighbor = board[peerX][peerY][w]
            if (neighbor.isAlive) {
              neighbors.push(neighbor)
            }
          }
        }

        // Rules of Life
        if (cell.isAlive && neighbors.length < 2) {
          // Die of Loneliness
          cell.isSurvive = false
        } else if (cell.isAlive && neighbors.length > 3) {
          // Die of Overpopulation
          cell.isSurvive = false
        } else if (!cell.isAlive && !cell.isWall && neighbors.length == 3) {
          // New life due to Reproduction
          let childColor =
            random() < 0.9
              ? calcChildrenColorByAvg(neighbors)
              : calcChildrenColorByGrowth(neighbors)
          cell.color = childColor
          cell.isSurvive = true
          cell.generation = 1
        } else {
          // Stasis
          cell.isSurvive = cell.isAlive
          cell.generation++
        }
      }
    }
  }

  // apply survival status to isAlive
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      for (let w = 0; w < worlds; w++) {
        const cell = board[x][y][w]
        cell.isAlive = cell.isSurvive
      }
    }
  }
}

function calcChildrenColorByAvg(neighbors) {
  let r = 0
  let g = 0
  let b = 0
  let n = 0
  neighbors.map(neighbor => {
    n++
    let levels = color(neighbor.color).levels
    r += levels[0]
    g += levels[1]
    b += levels[2]
  })
  return color(r / n, g / n, b / n)
}

function calcChildrenColorByGrowth(neighbors) {
  const counts = []
  neighbors.forEach(neighbor => {
    const boxColor = color(neighbor.color)
    const index = growthWheel
      .map((wheelColor, index) => {
        const r = boxColor.levels[0] - wheelColor.levels[0]
        const g = boxColor.levels[1] - wheelColor.levels[1]
        const b = boxColor.levels[2] - wheelColor.levels[2]
        const d = r * r + g * g + b * b
        return { index, d }
      })
      .sort((a, b) => a.d - b.d)[0].index
    counts[index] = (counts[index] || 0) + 1
  })
  const majorIndex = Object.entries(counts)
    .sort((a, b) => a[1] - b[1])
    .pop()[0]
  const newIndex = (majorIndex + 1) % growthWheel.length
  return growthWheel[newIndex]
}

/**
 * When mouse is dragged
 */
function mouseDragged() {
  /**
   * If the mouse coordinate is outside the board
   */
  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return
  }
  cursorX = mouseX
  cursorY = mouseY
  renderCursor()
  const x = Math.floor(mouseX / unitLength)
  const y = Math.floor(mouseY / unitLength)
  placePen(x, y)
}

function placePen(cx, cy) {
  for (const xy of pen) {
    const x = cx + xy[0]
    const y = cy + xy[1]
    if (!board[x] || !board[x][y]) {
      continue
    }
    const cell = board[x][y][penW]
    if (penMode == 'life') {
      cell.isAlive = true
      cell.isWall = false
      cell.color = boxColor
    } else {
      cell.isWall = true
      cell.isAlive = false
      let wallColor = color(boxColor)
      cell.color = color(
        wallColor.levels[0],
        wallColor.levels[1],
        wallColor.levels[2],
        63,
      )
    }
    renderCell(x, y)
  }
}

/**
 * When mouse is pressed
 */
function mousePressed() {
  noLoop()
  mouseDragged()
}

/**
 * When mouse is released
 */
function mouseReleased() {
  // loop()
}

function mouseMoved() {
  if (mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY >= height) {
    cursor.style.display = 'none'
    return
  }
  cursor.style.display = 'block'
  cursorX = mouseX
  cursorY = mouseY
  renderCursor()
  render()
}

function renderCursor() {
  cursor.style.top = containerRect.top + cursorY - 4 + 'px'
  cursor.style.left = containerRect.left + cursorX - 4 + 'px'
}

const SPACE = 32
function keyPressed(event) {
  if (event.target.tagName == 'TEXTAREA') {
    return
  }
  switch (keyCode) {
    case LEFT_ARROW: {
      cursorX -= unitLength
      noLoop()
      renderCursor()
      break
    }
    case RIGHT_ARROW: {
      cursorX += unitLength
      noLoop()
      renderCursor()
      break
    }
    case UP_ARROW: {
      cursorY -= unitLength
      noLoop()
      renderCursor()
      break
    }
    case DOWN_ARROW: {
      cursorY += unitLength
      noLoop()
      renderCursor()
      break
    }
    case SPACE: {
      const x = Math.floor(cursorX / unitLength)
      const y = Math.floor(cursorY / unitLength)
      placePen(x, y)
      noLoop()
      renderCell(x, y)
      break
    }
    default: {
      console.log(keyCode)
    }
  }
  render()
}

// document.querySelector('#reset-game').addEventListener('click', function () {
//   init()
// })

function toDot() {
  pen = [[0, 0]]
}
function toCross() {
  pen = [
    [0, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
    [2, 2],
    [-2, -2],
    [-2, 2],
    [2, -2],
  ]
}
function toT() {
  pen = [
    [-1, -2],
    [0, -2],
    [1, -2],
    [0, -1],
    [0, 0],
    [0, 1],
    [0, 2],
  ]
}
function toE() {
  pen = [
    [-1, -2],
    [0, -2],
    [1, -2],

    [-1, -1],

    [-1, 0],
    [0, 0],
    [1, 0],

    [-1, 1],

    [-1, 2],
    [0, 2],
    [1, 2],
  ]
}
function toCustomPen() {
  pen = []

  let text = patternTextarea.value
  let lines = text.split('\n')

  let maxX = 0
  let maxY = lines.length - 1

  for (let y = 0; y < lines.length; y++) {
    let line = lines[y]
    if (line.length - 1 > maxX) {
      maxX = line.length - 1
    }
    for (let x = 0; x < line.length; x++) {
      let char = line[x]
      if (char == 'x') {
        pen.push([x, y])
      }
    }
  }

  for (let xy of pen) {
    xy[0] -= floor(maxX / 2)
    xy[1] -= floor(maxY / 2)
  }
}

function updatePenW() {
  penW = penWInput.valueAsNumber
  if (worlds <= penW) {
    worlds = penW + 1
  }
  init()
}
