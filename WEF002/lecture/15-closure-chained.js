function makeCalculator() {
  let value = 0
  let calculator = {
    add: amount => {
      value += amount
      return calculator
    },
    subtract: amount => calculator.add(-amount),
    multiply: multiplier => {
      value *= multiplier
      return calculator
    },
    divide: dividend => calculator.multiply(1 / dividend),
    getValue: () => value,
  }
  return calculator
}

let calculator = makeCalculator()

console.log('calculator:', calculator)

console.log('initial value:', calculator.getValue())

console.log(
  'current value:',
  calculator.add(10).add(20).subtract(5).multiply(2).divide(2).getValue(),
)

let secondCalculator = makeCalculator()
console.log('second calculator value:', secondCalculator.getValue())
console.log('first calculator value:', calculator.getValue())
