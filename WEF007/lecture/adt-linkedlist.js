function ADTLinkedList() {
  console.log('create ADTLinkedList')

  let last = null
  let head = null

  function append(value) {
    let next = {
      value,
      next: null,
    }
    if (head == null) {
      head = next
    }
    if (last !== null) {
      last.next = next
    }
    last = next
  }

  function get(index) {
    let current = head
    let i = index
    for (;;) {
      if (current == null) {
        throw new Error('element not found, index: ' + index)
      }
      if (i == 0) {
        return current.value
      }
      i--
      current = current.next
    }
  }

  function getSize() {
    let size = 0
    for (let current = head; current != null; current = current.next, size++) {}
    return size
  }

  function printAllValues() {
    console.log('head:', head)
  }

  return {
    append,
    printAllValues,
    get,
    getSize,
  }
}

function test() {
  let linkedList = ADTLinkedList()
  linkedList.append('Apple')
  linkedList.append('Banana')
  linkedList.append('Cherry')
  linkedList.printAllValues()
  console.log('0:', linkedList.get(0))
  console.log('1:', linkedList.get(1))
  console.log('2:', linkedList.get(2))

  try {
    console.log('3:', linkedList.get(3))
  } catch (e) {
    console.error(e)
  }

  console.log('size:', linkedList.getSize())
}
// test()
