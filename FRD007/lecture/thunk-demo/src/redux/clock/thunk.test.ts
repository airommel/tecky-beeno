import { startClockThunk } from './thunk'

describe('Clock Thunk TestSuit', () => {
  it('should dispatch the clock every half second', () => {
    jest.useFakeTimers()

    let dispatch = jest.fn()
    startClockThunk()(dispatch)
    expect(dispatch).toBeCalled()
    let timerCall = dispatch.mock.calls[0]
    expect(timerCall[0].type).toEqual('@@Clock/setClockTimer')
    let timer = timerCall[0].timer
    expect(timer).toBeDefined()

    // fake time pass, then check number of dispatch
    jest.advanceTimersByTime(500)
    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch.mock.calls[1][0].type).toEqual('@@Clock/setClockTime')
    expect(dispatch.mock.calls[1][0].now / 1000).toBeCloseTo(Date.now() / 1000)

    jest.advanceTimersByTime(500)
    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(dispatch.mock.calls[2][0].type).toEqual('@@Clock/setClockTime')
    expect(dispatch.mock.calls[2][0].now / 1000).toBeCloseTo(Date.now() / 1000)

    clearInterval(timer)

    jest.advanceTimersByTime(500)
    expect(dispatch).toHaveBeenCalledTimes(3)
  })
})
