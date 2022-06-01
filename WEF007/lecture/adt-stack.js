function ADTStack(capacity) {
  console.log('create ADTStack, capacity: ' + capacity)
  let array = ADTArray(capacity, () => 0)
  let size = 0
  function push(value) {
    if (size >= capacity) {
      throw new Error('maximum stack overflow, capacity: ' + capacity)
    }
    array.set(size, value)
    size++
  }
  function pop() {
    if (size <= 0) {
      throw new Error('pop on empty stack')
    }
    let value = array.get(size - 1)
    size--
    return value
  }
  return {
    push,
    pop,
  }
}

function test() {
  let stack = ADTStack(2)
	stack.push('Apple')
	stack.push('Banana')
	stack.push('Cherry')
  console.log(stack.pop())
  console.log(stack.pop())
}
test()
