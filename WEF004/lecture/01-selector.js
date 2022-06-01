let item = document.getElementById('item-456')
item.textContent = '456'

let elements = document.getElementsByClassName('items')
for (let element of elements) {
  element.textContent += ' (I am an element with "items" class)'
}

let matches = document.querySelectorAll('.game-board .col')
let i = 0
for (let col of matches) {
  i++
  col.textContent = i
}
