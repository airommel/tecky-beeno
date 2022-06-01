function isInRange(num, lower, upper) {
  // return num >= lower && num <= upper
  return !(num > lower || num < upper)
}

console.log(isInRange(NaN, 1, 10))
