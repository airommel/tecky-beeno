const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log(
  'reduce function:',
  numbers.reduce(function (acc, elem) {
    return acc + elem
  }, 0),
)

console.log(
  'reduce arrow number:',
  numbers.reduce((acc, elem) => acc + elem, 0),
)

let sum = 0
for (let number of numbers) {
  sum += number
}
console.log('for loop:', sum)
