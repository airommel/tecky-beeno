function ADTArrayList() {
	console.log('create ADTArrayList')
  let defaultLength = 2
  let defaultValue = () => 0

  let capacity = defaultLength
  let array = ADTArray(defaultLength, defaultValue)
  let size = 0
  function insert(value) {
    set(size, value)
    size++
  }
  function get(index) {
    if (index < 0 || index >= size) {
      throw new Error(`index out of range, size: ${size}, index: ${index}`)
    }
    return array.get(index)
  }
  function set(index, value) {
    if (index >= capacity) {
      let newArray = ADTArray(index + defaultLength, defaultValue)
			capacity = index + defaultLength
      for (let i = 0; i < size; i++) {
        newArray.set(i, array.get(i))
      }
      array = newArray
    }
    array.set(index, value)
  }
  return {
    insert,
    get,
    set,
  }
}

function test() {
  let arrayList = ADTArrayList()
  arrayList.insert('Apple')
  arrayList.insert('Banana')
  arrayList.insert('Cherry')
  console.log(arrayList.get(2))
  arrayList.set(2, 'Cherry Pie')
  console.log(arrayList.get(2))
}

// test()
