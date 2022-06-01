import { promisify } from 'util'

let setTimeoutAsync = promisify(setTimeout)

async function test() {
  console.log('before setTimeout', Date.now())
  await setTimeoutAsync(1000)
  console.log('after setTimeout', Date.now())
}

console.log('Start test()')
test()
  .then(() => {
    console.log('Finished test()')
  })
  .catch(error => {
    console.error('Failed test(), error:', error)
  })
