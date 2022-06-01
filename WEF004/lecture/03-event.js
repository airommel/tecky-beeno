let gameBoard = document.querySelector('.game-board')

let ROW = 3
let COL = 3

let html = ''

let i = 0
for (let row = 0; row < ROW; row++) {
  html += '<div class="row">'
  for (let col = 0; col < COL; col++) {
    html += '<div class="col">'

    i++
    html += i

    html += '</div>'
  }
  html += '</div>'
}

gameBoard.innerHTML = html

function placeChess(event) {
  // let col = event.target
  let col = event.currentTarget
  // col.textContent = 'X'
  col.innerHTML = '<i class="far fa-circle"> O </i>'
  console.log('place chess, target:', event.target)
  console.log('place chess, currentTarget', event.currentTarget)
}

for (let col of gameBoard.querySelectorAll('.col')) {
  // col.onclick = () => {
  //   col.textContent = 'X'
  // }
  col.addEventListener('click', event => {
    console.log('col clicked, target:', event.target)
    console.log('col clicked currentTarget', event.currentTarget)
  })
  col.addEventListener('click', placeChess)
}

gameBoard.addEventListener('click', event => {
  console.log('gameBoard clicked, target:', event.target)
  console.log('gameBoard clicked, currentTarget:', event.currentTarget)
})
