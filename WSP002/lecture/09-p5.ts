export abstract class P5 {
  frameRate: number
  isLooping = false

  constructor(frameRate?: number) {
    if (typeof frameRate == 'number') {
      this.frameRate = frameRate
    } else {
      this.frameRate = 30
    }
    this.setup()
    this.loop()
  }

  start() {
    this.tick()
  }

  tick() {
    if (!this.isLooping) {
      return
    }
    this.draw()
    let interval = 1000 / this.frameRate
    setTimeout(() => this.tick(), interval)
  }

  loop() {
    this.isLooping = true
    this.start()
  }

  noLoop() {
    this.isLooping = false
  }

  setFrameRate(value: number) {
    this.frameRate = value
  }

  abstract setup(): void
  abstract draw(): void
}
