let main = document.querySelector('main')
let debug = document.querySelector('#debug')

let lastProgress = 0
let screenWidth = 1
let screenHeight = 1
let x = 0
let y = 0

function move(x, y) {
  main.style.transform = `translate(-${x}px, -${y}px)`
}

function updateScreenSize() {
  let rect = main.getBoundingClientRect()
  screenWidth = rect.width
  screenHeight = rect.height
}

window.addEventListener('scroll', () => {
  updateScreenSize()
  let progress = document.scrollingElement.scrollTop
  let cx = x + screenWidth / 2
  let cy = y + screenHeight / 2
  let speed = progress - lastProgress
  lastProgress = progress
  if (2550 <= cx && cx <= 3000) {
    let dy = 400 - 200
    let dx = 3000 - 2450
    let ratio = dy / dx
    y += speed * ratio
    cy += speed * ratio
    x += speed
    cx += speed
  } else {
    x += speed
    cx += speed
  }
  debug.textContent = `progress: ${progress}, x: ${x}, y: ${y}, cx: ${cx}, cy: ${cy}, speed: ${speed}`
  move(x, y)
})

window.addEventListener('resize', () => {
  updateScreenSize()
})
