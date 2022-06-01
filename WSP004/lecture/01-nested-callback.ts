export function sleep(ms: number, callback: (duration: number) => void) {
  let startTime = Date.now()
  setTimeout(() => {
    let endTime = Date.now()
    let duration = endTime - startTime
    callback(duration)
  }, ms)
}

function main(callback: () => void) {
  console.log('Step 1')
  sleep(1000, passed => {
    console.log('After', passed, 'ms, now Step 2')
    sleep(1000, passed => {
      console.log('After', passed, 'ms, now Step 3')
      callback()
    })
  })
}

console.log('Start')
main(() => {
  console.log('Finished')
})
