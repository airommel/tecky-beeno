function ADTArray(length, genValue) {
  console.log('create ADTArray, length:', length)
  if (!(length >= 0 && length <= 1000)) {
    throw new Error('invalid length: ' + length)
  }
  if (typeof genValue != 'function') {
    throw new Error('invalid genValue: ' + typeof genValue)
  }
  let data = []
  for (let i = 0; i < length; i++) {
    data[i] = genValue()
  }
  function checkIndex(index) {
    if (index < 0 || index >= length) {
      throw new Error(
        'index out of range, length: ' + length + ' index: ' + index,
      )
    }
  }
  function get(index) {
    checkIndex(index)
    return data[index]
  }
  function set(index, value) {
    checkIndex(index)
    data[index] = value
  }
  return {
    get,
    set,
  }
}

function test() {
  let array = ADTArray(10, () => 0)
  array.set(0, 'Apple')
  array.set(1, 'Banana')
  console.log(array.get(0))
  console.log(array.get(1))
  array.set(10, 'eleven')
}
