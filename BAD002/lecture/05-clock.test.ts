import { sleep } from './05-clock'

describe('clock', () => {
  jest.useFakeTimers()
  test('should resolve after 1 second', async () => {
    let promise = sleep(1000)
    jest.advanceTimersByTime(1000)
    expect(await promise).toBe(1000)
  })

  test.skip('demo expect.resolve', done => {
    let p1 = sleep(1000)
    expect(p1).resolves.toBe(1000)
    jest.advanceTimersByTime(1000)

    let p2 = sleep(3000)
    expect(p2).resolves.toBe(3001)
    jest.advanceTimersByTime(3000)

    let p3 = sleep(2000)
    expect(p3).resolves.toBe(2001)
    jest.advanceTimersByTime(2000)

    Promise.all([p1, p2, p3])
      .then(() => done())
      .catch(error => done.fail(error))
    // done.fail('demo fail')
  })

  test('demo expect await', async () => {
    let p1 = sleep(1000)
    jest.advanceTimersByTime(1000)
    expect(await p1).toBe(1000)

    let p2 = sleep(3000)
    jest.advanceTimersByTime(3000)
    expect(await p2).not.toBe(3001)
    expect(await p2).toBe(3000)

    let p3 = sleep(2000)
    jest.advanceTimersByTime(2000)
    expect(await p3).not.toBe(2001)
    expect(await p3).toBe(2000)
  }, 7000)
})

describe('jest.timer', () => {
  jest.useFakeTimers()
  test('jest time traveller', () => {
    let start = Date.now()
    setTimeout(() => {
      let end = Date.now()
      expect(end - start).toBe(1000)
    }, 1000)
    jest.advanceTimersByTime(1000)
  })
})
