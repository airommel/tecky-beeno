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

function main(): Promise<void> {
  return new Promise(resolve => {
    console.log('Step 1')
    sleep(1000).then(passed => {
      console.log('After', passed, 'ms, now Step 2')
      sleep(1000).then(passed => {
        console.log('After', passed, 'ms, now Step 3')
        sleep(1000).then(passed => {
          console.log('After', passed, 'ms, now Step 4')
          sleep(1000).then(passed => {
            console.log('After', passed, 'ms, now Step 5')
            resolve()
          })
        })
      })
    })
  })
}

console.log('Start')
main().then(() => {
  console.log('Finished')
})
