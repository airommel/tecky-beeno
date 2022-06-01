import readline from 'readline'

export function askQuestion(question: string) {
  return new Promise<string>((resolve, reject) => {
    let questionInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    questionInterface.question(question, answer => {
      questionInterface.close()
      resolve(answer)
    })
  })
}

export async function askNumber(question: string) {
  for (;;) {
    let answer = await askQuestion(question)
    let number = parseFloat(answer)
    if (number) {
      return number
    }
    console.log('Invalid input, expect a number.')
  }
}
