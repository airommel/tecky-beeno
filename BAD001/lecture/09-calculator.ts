export class Calculator {
  private _value = 0
  private isPowerOn = false

  constructor() {
    // console.log('create new Calculator')
  }

  private checkPowerOn(): void {
    if (!this.isPowerOn) {
      throw new Error('calculator is powered off')
    }
  }

  getValue() {
    this.checkPowerOn()
    return this._value
  }

  private setValue(value: number) {
    this.checkPowerOn()
    this._value = value
  }

  plus(x: number) {
    this.setValue(this.getValue() + x)
  }

  minus(x: number) {
    this.plus(-x)
  }

  powerOn() {
    // console.log('power on calculator')
    this.isPowerOn = true
    this.setValue(0)
  }

  powerOff() {
    // console.log('power off calculator')
    this.isPowerOn = false
  }
}
