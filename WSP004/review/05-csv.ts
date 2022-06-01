import fs from 'fs'
import papa from 'papaparse'

papa.Parser

function readCsvFile(file: string) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(file)
    papa.parse(stream, {
      worker: true, // Don't bog down the main thread if its a big file
      header: true,
      error: reject,
      complete: function (results, file) {
        resolve(results.data)
      },
    })
  })
}

async function test() {
  let rows = await readCsvFile('data1.csv')
  console.log('rows:', rows)
}

console.log('Start test()')
test()
  .then(() => {
    console.log('Finished test()')
  })
  .catch(error => {
    console.error('Failed test(), error:', error)
  })
