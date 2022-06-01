import { plot } from 'nodeplotlib'
import { Observable } from 'rxjs'

/* 
0 -> 1
1 -> 1
2 -> fib(1) + fib(0) -> 1 + 0 -> 1
3 -> fib(2) + fib(1) -> (fib(1) + fib(0)) + fib(1)
4 -> fib(3) + fib(2) -> (fib(2) + fib(1)) + (fib(1) + fib(0))

recursion: fib(44) used 12 seconds
memorized recursion: fib(14000) used 1 ms

stack: internal variable for each function call

*/
// n -> fib(n)
export function fib(n: number): number {
  if (n < 0) {
    throw new Error('Invalid range, n should be positive integer')
  }
  if (n == 0) {
    return 0
  }
  if (n == 1) {
    return 1
  }
  let secondLastValue = 0
  let lastValue = 1
  for (;;) {
    let currentValue = secondLastValue + lastValue
    if (n == 2) {
      return currentValue
    }
    n--
    secondLastValue = lastValue
    lastValue = currentValue
  }
}

function correctnessTest() {
  let answers = [
    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597,
    2584, 4181, 6765,
  ]
  for (let n = 0; n < answers.length; n++) {
    let answer = answers[n]
    let output = fib(n)
    if (output !== answer) {
      throw new Error(
        `wrong output: n=${n}, answer=${answer}, output=${output}`,
      )
    }
  }
  console.log('all passed')
}
function speedTest() {
  plot(
    new Observable(subscriber => {
      let x: number[] = []
      let y: number[] = []
      let options = [{ name: 'used time', x, y }]
      let isEnd = false
      let n = 0
      function tick() {
        if (isEnd) return
        let start = Date.now()
        let output = fib(n)
        let end = Date.now()
        let used = end - start
        x.push(n)
        y.push(used)
        console.log(`n:`, n, 'used:', used)
        subscriber.next(options)
        n = (n + 1) * 2
        setTimeout(tick, 1)
      }
      tick()
      return () => {
        isEnd = true
      }
    }),
  )
}
correctnessTest()
speedTest()
