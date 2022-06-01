let numbers = [10, 20, 40, 120, 60, 80, 40, 20, 10, 50, 70, 123, 40, 120]

let sorted = []

for (let number of numbers) {
  let count = sorted[number] || 0
  sorted[number] = count + 1
}

for (let number = 0; number < sorted.length; number++) {
  let count = sorted[number]
  for (let i = 0; i < count; i++) {
    console.log(number)
  }
}
