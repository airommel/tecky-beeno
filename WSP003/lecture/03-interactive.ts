import readline from 'readline'
import fetch from 'node-fetch'
import fs from 'fs'

function getUserInput(question: string, callback: (answer: string) => void) {
  let readLineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  readLineInterface.question(question, answer => {
    readLineInterface.close()
    callback(answer)
  })
}

function downloadFile(
  url: string,
  callback: (error: any | null, data: string) => void,
) {
  fetch(url)
    .then(res => res.text())
    .then(data => callback(null, data))
    .catch(error => callback(error, ''))
}

function getUserName(callback: (name: string) => void) {
  fs.readFile('name.txt', (err, data) => {
    if (err) {
      getUserInput('Your name: ', name => {
        fs.writeFile('name.txt', name, error => {
          if (error) {
            console.error('Failed to save username, error:', error)
          }
          callback(name)
        })
      })
      return
    }
    callback(data.toString())
  })
}

function main() {
  getUserName(name => {
    console.log('Hello', name)
    getUserInput('File to download: ', url => {
      downloadFile(url, (error, content) => {
        if (error) {
          console.error('failed to download file, error:', error)
          return
        }
        console.log('file size:', content.length.toLocaleString())
        getUserInput('Filename to save: ', filename => {
          fs.writeFile(filename, content, { flag: 'wx' }, error => {
            if (error) {
              console.error('Failed to save file, error:', error)
              return
            }
            console.log('done.')
          })
        })
      })
    })
  })
}

main()

// readLineInterface.question('Your name: ', name => {
//   process.stdout.write('loading...\r\n')
//   let progress = 0
//   let timer = setInterval(() => {
//     progress++
//     process.stdout.write(`\r  ${progress}/100`)
//     if (progress >= 100) {
//       clearInterval(timer)
//       readLineInterface.close()
//       console.log()
//       console.log('done.')
//     }
//   }, 33)
// })
