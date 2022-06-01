import readline from 'readline'

function askQuestion(question: string) {
  return new Promise<string>((resolve, reject) => {
    const readLineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    readLineInterface.question(question + ' ', (answer: string) => {
      readLineInterface.close()
      resolve(answer)
    })
  })
}

async function test() {
  let answer = await askQuestion('What is your name?')
  console.log(`Your name is ${answer}`)
}

console.log('Start test()')
test()
  .then(() => {
    console.log('Finished test()')
  })
  .catch(error => {
    console.error('Failed test(), error:', error)
  })
