let promise = new Promise<number>((resolve, reject) => {
  // try to comment out the resolves
  resolve(1)
  resolve(2)
  reject(3)
})

promise
  .then(result => console.log('got result:', result))
  .catch(error => console.log('caught:', error))

promise
  .then(result => console.log('got data:', result))
  .catch(error => console.log('failed:', error))

promise
  .then(result => console.log('resolved:', result))
  .catch(error => console.log('error:', error))

promise
  // .then(x => {
  //   throw new Error('fail early')
  // })
  .then(x => x * 10)
  .then(x => new Promise<number>(resolve => resolve(x + 2)))
  .then(x => {
    console.log('x:', x)
    return x + 5
  })
  .then(x => {
    throw new Error("don't like " + x)
  })
  .catch(error => {
    console.log('error:', error)
    console.log('resume with 1')
    return 1
  })
  .then(result => console.log('chain result:', result))

let promise2 = promise.then(x => x * 10)
let promise3 = promise2.then(x => x + 2)
let promise4 = promise3.then(x => x + 5)
promise4.then(result => console.log('stepped result:', result))

let array = [1]
let array2 = array
  .map(x => x * 10)
  .map(x => x + 2)
  .map(x => x + 5)
  .map(x => {
    try {
      throw new Error("don't like " + x)
    } catch (error) {
      console.log('array.map error:', error)
      console.log('array.map resume with 1')
      return 1
    }
  })
  .map(x => 1)
array2.map(x => console.log('array result:', x))
setTimeout(() => {
  let array3 = array2.map(x => x + 4)
  console.log('array 3:', array3)
}, 2000)
