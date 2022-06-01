function add(/* type, */ a, b) {
  if (typeof a == 'string') {
    return a + ' and ' + b
  }
  if (Array.isArray(a)) {
    let c = []
    for (let x of a) {
      c.push(x)
    }
    for (let x of b) {
      c.push(x)
    }
    return c
  }
  return a + b
}

function test(a, b) {
  console.log('test')
  console.log('a:', a)
  console.log('b:', b)
  let c = add(a, b)
  console.log('c:', c)
  console.log()
}

test(2, 3)
test('apple', 'orange')
test([1, 2], [3, 4])
