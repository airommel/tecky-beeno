let numbers = [10, 20, 40, 120, 60, 80, 40, 20, 10, 50, 70, 123, 40, 120]

for (let number of numbers) {
  setTimeout(() => {
    console.log(number)
  }, number)
}
