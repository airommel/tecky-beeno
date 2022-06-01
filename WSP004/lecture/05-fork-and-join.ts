import { sleep } from './04-multiple-await'

async function downloadFile(url: string, ms: number) {
  console.log('Start download', url, '0/5')
  for (let i = 1; i <= 5; i++) {
    await sleep(ms)
    console.log(`Downloading ${url} (${i}/5)`)
  }
  console.log('Finished download', url)
  return 'content of ' + url
}

export async function main1() {
  console.log('start download files')
  let promise1 = downloadFile('1.txt', 600)
  let promise2 = downloadFile('2.txt', 500)
  let jointPromise = Promise.all([promise1, promise2])
  let jointResult = await jointPromise
  console.log('joint result:', jointResult)
  console.log('finish download files')
}

export async function main2() {
  console.log('start download files')
  let jointPromise = Promise.all([
    downloadFile('1.txt', 600),
    downloadFile('2.txt', 500),
  ])
  let jointResult = await jointPromise
  let file1 = jointResult[0]
  let file2 = jointResult[1]
  console.log({ file1, file2 })
  console.log('finish download files')
}

export async function main3() {
  console.log('start download files')
  let jointResult = await Promise.all([
    downloadFile('1.txt', 600),
    downloadFile('2.txt', 500),
  ])
  let file1 = jointResult[0]
  let file2 = jointResult[1]
  console.log({ file1, file2 })
  console.log('finish download files')
}

export async function main4() {
  console.log('start download files')
  let [file1, file2] = await Promise.all([
    downloadFile('1.txt', 600),
    downloadFile('2.txt', 500),
  ])
  console.log({ file1, file2 })
  console.log('finish download files')
}

console.log('Start main()')
main4().then(() => {
  console.log('Finished main()')
})
console.log('Doing other things')
