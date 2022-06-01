let N = 3
let gameBoard = document.querySelector('.game-board')

gameBoard.style.width = `calc(80px * ${N} + 10px * 2)`
gameBoard.style.height = `calc(80px * ${N} + 10px * 2)`

let html = ''
for (let i = 0; i < N; i++) {
  html += '<div class="row">'
  for (let i = 0; i < N; i++) {
    html += '<div class="col">'
    html += '</div>'
  }
  html += '</div>'
}
gameBoard.innerHTML = html

let boxes = document.querySelectorAll('.col')
let currentI = document.querySelector('.current-turn i')
let restartButton = document.querySelector('.restart-button')

/* 
    1 2 3
    4 5 6
    7 8 9
*/

let allWinningConditions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
]

for (let winningCondition of allWinningConditions) {
  for (let i = 0; i < 3; i++) {
    winningCondition[i]--
  }
}

console.log(allWinningConditions)

allWinningConditions = []

// '-' direction
{
  let i = 0
  for (let row = 0; row < N; row++) {
    let winningCondition = []
    for (let col = 0; col < N; col++) {
      winningCondition.push(i)
      i++
    }
    allWinningConditions.push(winningCondition)
  }
}

// '|' direction
{
  for (let row = 0; row < N; row++) {
    let i = row
    let winningCondition = []
    for (let col = 0; col < N; col++) {
      winningCondition.push(i)
      i += N
    }
    allWinningConditions.push(winningCondition)
  }
}

function from2dTo1d(x, y) {
  return x + N * y
}

// '\' direction
{
  let winningCondition = []
  for (let x = 0, y = 0; x < N; x++, y++) {
    let i = from2dTo1d(x, y)
    winningCondition.push(i)
  }
  allWinningConditions.push(winningCondition)
}

// '/' direction
{
  let winningCondition = []
  for (let x = N - 1, y = 0; y < N; x--, y++) {
    let i = from2dTo1d(x, y)
    winningCondition.push(i)
  }
  allWinningConditions.push(winningCondition)
}

console.log(allWinningConditions)

let turn = 1
let hasGameOver = false

for (let box of boxes) {
  box.addEventListener('click', () => {
    // console.log('clicked:', box)
    if (hasGameOver) {
      return
    }
    let i = box.querySelector('i')
    if (i) {
      return
    }
    if (turn % 2 == 1) {
      box.innerHTML = '<i class="fas fa-times chess x-player"></i>'
      currentI.className = 'far fa-circle'
    } else {
      box.innerHTML = '<i class="far fa-circle chess o-player"></i>'
      currentI.className = 'fas fa-times'
    }
    turn++
    // console.log('new turn:', turn)

    for (let winnerCondition of allWinningConditions) {
      let numberOfSame = 0
      for (let i = 1; i < N; i++) {
        if (
          boxes[winnerCondition[i]].innerHTML ==
          boxes[winnerCondition[0]].innerHTML
        ) {
          numberOfSame++
        }
      }
      // console.log('numberOfSame:', numberOfSame)
      if (numberOfSame == N - 1 && boxes[winnerCondition[0]].innerHTML != '') {
        let winnerBox = boxes[winnerCondition[0]]
        let winner = ''
        if (winnerBox.querySelector('.x-player')) {
          winner = 'X'
        } else {
          winner = 'O'
        }
        console.log('winner:', winner)
        hasGameOver = true
        // alert(winner + ' has won')
        Swal.fire('Game over!', winner + ' has won!', 'success')
        return
      }
      if (turn == N * N + 1) {
        Swal.fire('Game over!', 'Draw! No on won!', 'warning')
      }
    }
  })
}

restartButton.addEventListener('click', () => {
  turn = 1
  currentI.className = 'fas fa-times'
  for (let i of document.querySelectorAll('.col i')) {
    i.remove()
  }
  hasGameOver = false
})
