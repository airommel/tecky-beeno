function makeCalculator() {
  let value = 0
  let calculator = {
    add: amount => value += amount,
    subtract: amount => calculator.add(-amount),
    multiply: multiplier => value *= multiplier,
    divide: dividend => calculator.multiply(1 / dividend),
    getValue: () => value,
  }
  return calculator
}

let calculator = makeCalculator()

console.log('calculator:', calculator)

console.log('initial value:', calculator.getValue())

console.log('add(10):', calculator.add(10))
console.log('add(20):', calculator.add(20))
console.log('subtract(5):', calculator.subtract(5))
console.log('multiply(2):', calculator.multiply(2))
console.log('divide(2):', calculator.divide(2))

console.log('current value:', calculator.getValue())

let secondCalculator = makeCalculator()
console.log('second calculator value:', secondCalculator.getValue())
console.log('first calculator value:', calculator.getValue())
