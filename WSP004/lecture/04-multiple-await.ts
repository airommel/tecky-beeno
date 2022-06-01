export async function sleep(ms: number): Promise<number> {
  return new Promise((resolve, reject) => {
    let startTime = Date.now()
    setTimeout(() => {
      let endTime = Date.now()
      let duration = endTime - startTime
      resolve(duration)
    }, ms)
  })
}

async function main(): Promise<void> {
  console.log('Step 1')
  let passed = await sleep(1000)
  console.log('After', passed, 'ms, now Step 2')
  passed = await sleep(1000)
  console.log('After', passed, 'ms, now Step 3')
  passed = await sleep(1000)
  console.log('After', passed, 'ms, now Step 4')
  passed = await sleep(1000)
  console.log('After', passed, 'ms, now Step 5')
}

if (__filename == process.argv[1]) {
  console.log('Start')
  main().then(() => {
    console.log('Finished')
  })
  console.log('doing other things')
}
