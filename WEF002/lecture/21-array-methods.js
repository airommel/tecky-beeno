function joinArray(array) {
  if (array.length == 0) {
    return '<empty>'
  }
  if (array.length <= 1) {
    return array.join()
  }
  array = array.map(x => x)
  let last = array.pop()
  return array.join(', ') + ' and ' + last
}

function test(numbers) {
  console.log('numbers:', numbers, 'text:', joinArray(numbers))
}

test([1, 2, 3])
test([1, 2])
test([1])
test([])
