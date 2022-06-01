export function sleep(ms: number) {
  let start = Date.now()
  console.log('start to sleep:', start, 'target:', ms)
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      let end = Date.now()
      console.log('finished sleep:', end, 'target:', ms)
      let duration = end - start
      resolve(duration)
    }, ms)
  })
}
