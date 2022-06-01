export function sleep(ms: number): Promise<number> {
  return new Promise((resolve, reject) => {
    let startTime = Date.now()
    setTimeout(() => {
      let endTime = Date.now()
      let duration = endTime - startTime
      resolve(duration)
    }, ms)
  })
}

// ;[1]
//   .map(x => x * 2)
//   .map(x => x + 10)
//   .map(x => x + 10)
//   .map(x => x + 10)
//   .map(x => x + 10)
//   .map(x => x + 10)
//   .map(x => x + 10)

function main(): Promise<void> {
  console.log('Step 1')
  return sleep(1000)
    .then(passed => {
      console.log('After', passed, 'ms, now Step 2')
      return sleep(1000)
    })
    .then(passed => {
      console.log('After', passed, 'ms, now Step 3')
      return sleep(1000)
    })
    .then(passed => {
      console.log('After', passed, 'ms, now Step 4')
      return sleep(1000)
    })
    .then(passed => {
      console.log('After', passed, 'ms, now Step 5')
    })
}

console.log('Start')
main().then(() => {
  console.log('Finished')
})
