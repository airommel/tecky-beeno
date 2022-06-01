function makeCalculator() {
  let sum = 0
  function add(amount) {
    sum = sum + amount
    return sum
  }
  return add
}

let adder = makeCalculator()

function multiply(adder, multiplier) {
  let base = adder(0)
  let value = base
  for (let i = 1; i < multiplier; i++) {
    value = adder(base)
  }
  return value
}

console.log('adder:', adder)
console.log('add(10):', adder(10)) // output 10
console.log('add(20):', adder(20)) // output 30
console.log('add(-5):', adder(-5)) // output 25

console.log('multiply(2):', multiply(adder, 2)) // output 50
console.log('multiply(0.5):', multiply(adder, 0.5)) // output 25
