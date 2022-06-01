import { chromium, Browser, Page, ElementHandle } from 'playwright'
import { Server, startServer } from './server'

function sleep(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

describe('e2e demo', () => {
  let browser: Browser
  let page: Page
  let server: Server
  let port = 8100
  beforeAll(async () => {
    server = await startServer(port)

    browser = await chromium.launch({
      // headless: false,
    })

    page = await browser.newPage()
  })
  afterAll(async () => {
    await page.close()
    await browser.close()
    await server.close()
  })
  beforeAll(async () => {
    await page.goto('http://localhost:' + port)
  })
  it('should contains the branch in document title', async () => {
    let title = await page.evaluate(() => {
      return document.title
    })
    expect(title).toBe('School System')
  })
  it('should display a greeting message on the screen', async () => {
    let text = await page.evaluate(() => {
      return document.querySelector('h1')?.textContent
    })
    expect(text).toMatch(/hello world/i)
  })
  describe('Data Loading Test', () => {
    let startBtn: ElementHandle
    it('should have a start button with selector #startBtn', async () => {
      startBtn = await page.waitForSelector('#startBtn')
      expect(startBtn).toBeDefined()
    })
    it('should start to load after click', async () => {
      await startBtn.click()
      let text = await startBtn.textContent()
      expect(text).toMatch(/loading/i)
    })
    it.skip(
      'should show result within 10 seconds (busy loop from server)',
      async () => {
        for (;;) {
          let text = await startBtn.textContent()
          if (text && text.match(/ready/i)) {
            break
          }
          await sleep(1000)
        }
      },
      10 * 1000,
    )
    it.skip(
      'should show result within 10 seconds (busy loop from browser)',
      async () => {
        await page.evaluate(() => {
          return new Promise<void>((resolve, reject) => {
            function loop() {
              if (
                document
                  .querySelector('#startBtn')
                  ?.textContent?.match(/ready/i)
              ) {
                resolve()
              } else {
                setTimeout(() => loop(), 1000)
              }
            }
            loop()
          })
        })
      },
      10 * 1000,
    )
    it(
      'should show result within 10 seconds (observe dom mutation)',
      async () => {
        await page.evaluate(() => {
          console.log('start eval')
          return new Promise<void>((resolve, reject) => {
            console.log('start promise')
            let observer = new MutationObserver(mutations => {
              console.log(mutations)
              if (startBtn?.textContent?.match(/ready/i)) {
                resolve()
                observer.disconnect()
              }
            })
            const startBtn =
              document.querySelector<HTMLButtonElement>('#startBtn')
            console.log('button:', startBtn)
            if (!startBtn) {
              reject('start button not found')
              return
            }
            observer.observe(startBtn, {
              attributes: true,
              childList: true,
              characterData: true,
              subtree: true,
            })
            startBtn.click()
            console.log('after click')
          })
        })
      },
      10 * 1000,
    )
  })
})
