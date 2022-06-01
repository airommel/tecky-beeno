let root = null

function addValue(value) {
  if (root == null) {
    root = { value, count: 1, smallerNode: null, biggerNode: null }
    return
  }
  placeValue(root, value)
}

function placeValue(root, value) {
  if (value < root.value) {
    if (root.smallerNode == null) {
      root.smallerNode = {
        value,
        count: 1,
        smallerNode: null,
        biggerNode: null,
      }
    } else {
      placeValue(root.smallerNode, value)
    }
  } else if (value > root.value) {
    if (root.biggerNode == null) {
      root.biggerNode = { value, count: 1, smallerNode: null, biggerNode: null }
    } else {
      placeValue(root.biggerNode, value)
    }
  } else if (value == root.value) {
    console.log('repeated value:', value)
    root.count++
  } else {
    throw new Error('unexpected condition')
  }
}

addValue(3)
addValue(1)
addValue(5)
addValue(7)
addValue(6)
addValue(3)
addValue(1)
for (let i = 0; i < 10; i++) {
  addValue(Math.floor(Math.random() * 20))
}
addValue(7 / 0)
addValue(-7 / 0)
// addValue('d' * 1)

console.dir(root, { depth: 5 })

function toDOM(root, element) {
  // console.log({ root, element })
  root.element = element
  let span = document.createElement('span')
  span.textContent = `"${root.value}" x ${root.count}`
  element.appendChild(span)

  let children = document.createElement('div')

  let leftChild = document.createElement('div')
  leftChild.classList.add('node')

  let rightChild = document.createElement('div')
  rightChild.classList.add('node')

  children.appendChild(leftChild)
  children.appendChild(rightChild)

  element.appendChild(children)

  if (root.smallerNode != null) {
    toDOM(root.smallerNode, leftChild)
  }

  if (root.biggerNode != null) {
    toDOM(root.biggerNode, rightChild)
  }
}

toDOM(root, document.querySelector('#root'))

let valueInput = document.querySelector('#value')

function search() {
  let value = valueInput.valueAsNumber
  searchNode(root, value)
}

function searchNode(root, value) {
  if (root == null) {
    console.error('value not found:', value)
    return
  }
  console.log('search', { root, value })
  root.element.classList.add('visited')
  setTimeout(() => {
    if (root.value == value) {
      console.log('found:', root)
      root.element.classList.add('goal')
    } else if (value < root.value) {
      searchNode(root.smallerNode, value)
    } else if (value > root.value) {
      searchNode(root.biggerNode, value)
    } else {
      console.error('unexpected value:', value)
    }
  }, 1000)
}
