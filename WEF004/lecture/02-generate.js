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

for (let col of gameBoard.querySelectorAll('.col')) {
  // col.onclick = () => {
  //   col.textContent = 'X'
  // }
  col.addEventListener('click', () => {
    console.log('turn into X')
    col.textContent = 'X'
  })
  col.addEventListener('click', () => {
    console.log('turn into O')
    col.textContent = 'O'
  })
}
