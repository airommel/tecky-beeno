function add(a, b) {
  return a + b
}

// arrow function
let subtract = (a, b) => {
  return a - b
}

function makeAdder() {
  let sum = 0
  // return num => sum = sum + num
  return num => sum += num
}

let adder = makeAdder()
console.log('add 1:', adder(1))
console.log('add 1:', adder(1))
