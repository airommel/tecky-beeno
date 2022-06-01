import { Calculator } from './09-calculator'

// setup(() => {})
// teardown(() => {})

describe('Calculator', () => {
  let calculator: Calculator
  beforeAll(() => {
    calculator = new Calculator()
  })
  beforeEach(() => {
    // calculator = new Calculator()
    calculator.powerOn()
  })
  afterEach(() => {
    calculator.powerOff()
  })
  it('should create an instance', () => {
    expect(calculator).toBeDefined()
  })
  it('should start with zero', () => {
    expect(calculator.getValue()).toBe(0)
  })
  it('should add number to current value', () => {
    calculator.plus(3)
    expect(calculator.getValue()).toBe(3)

    calculator.plus(2)
    expect(calculator.getValue()).toBe(5)
  })
  it('should subtract number to current value', () => {
    calculator.minus(3)
    expect(calculator.getValue()).toBe(-3)
  })
})

beforeEach(() => {
  console.log('global before each')
})

describe('demo scope', () => {
  beforeEach(() => {
    console.log('inside demo score before each')
  })
  test('1+1', () => {})
  test('2+1', () => {})
  test('1+2', () => {})
})
