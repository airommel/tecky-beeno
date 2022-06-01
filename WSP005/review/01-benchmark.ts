import { askNumber, askQuestion } from './00-readline'
import fs from 'fs'
import util from 'util'
import semver from 'semver'

let readFile = util.promisify(fs.readFile)
let writeFile = util.promisify(fs.writeFile)

let realLog = console.log

function fakeLog() {}

type BenchmarkOptions = {
  fn: () => Promise<void>
  times: number
}

async function benchmark(options: BenchmarkOptions) {
  let startTime = Date.now()
  console.log = fakeLog
  for (let i = 0; i < options.times; i++) {
    await options.fn()
  }
  console.log = realLog
  let endTime = Date.now()
  let totalTime = endTime - startTime
  let averageTime = totalTime / options.times
  let opsPerSecond = 1000 / averageTime
  console.log({
    'Number of Test': options.times,
    'Total Time': totalTime,
    'Average Time': averageTime,
    'Ops/sec': opsPerSecond,
  })
  return { averageTime, totalTime, opsPerSecond }
}

export type SmartBenchmarkOptions = {
  fn: () => Promise<void>
  variantPercentage: number
}

let learningRate = 50 / 100
let memoryRate = 1 - learningRate

async function smartBenchmark(options: SmartBenchmarkOptions) {
  let { averageTime: oldSpeed } = await benchmark({ fn: options.fn, times: 1 })
  let firstTimeNotTooFast = true
  for (let times = 2; ; ) {
    let { averageTime: newSpeed, totalTime } = await benchmark({
      fn: options.fn,
      times,
    })
    if (totalTime < 1000) {
      console.log('too fast, will do more sampling')
      times *= 2
      continue
    }

    let speedDiff = Math.abs(newSpeed - oldSpeed)
    let diffPercent = (speedDiff / oldSpeed) * 100
    console.log('diff percent:', diffPercent.toFixed(2) + '%')
    if (diffPercent < options.variantPercentage) {
      return newSpeed
    }
    if (firstTimeNotTooFast) {
      oldSpeed = newSpeed
      firstTimeNotTooFast = false
    } else {
      oldSpeed = oldSpeed * memoryRate + newSpeed * learningRate
    }
    if (diffPercent > 150) {
      times *= 1.5
    } else {
      times = Math.ceil(times * (1 + diffPercent / 100))
    }
  }
}

async function subject() {
  let binary = await readFile('package.json')
  let text = binary.toString()
  let pkg = JSON.parse(text)
  pkg.version = semver.inc(pkg.version, 'patch')
  text = JSON.stringify(pkg, null, 2)
  await writeFile('package.json', text)
}

async function main() {
  for (;;) {
    let answer = await askQuestion(
      `
Available actions:
  (1) benchmark
  (2) quit
Please choose an action: `,
    )
    switch (answer) {
      case '1':
        for (;;) {
          let answer = await askQuestion('Number of tests: ')
          if (answer === 'smart') {
            let variant = await askNumber('Max Variant Percentage: ')
            await smartBenchmark({
              fn: subject,
              variantPercentage: variant,
            })
            break
          }
          let times = parseInt(answer)
          if (!times) {
            console.log('Invalid number.')
            continue
          }
          await benchmark({
            fn: subject,
            times,
          })
          break
        }
        break
      case '2':
        return
      default:
        console.log('Invalid action.')
    }
  }
}
main()
