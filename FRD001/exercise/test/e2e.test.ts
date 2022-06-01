import { launch, Browser, Page } from 'puppeteer';

describe('FRD001 Exercise E2E TestSuit', () => {
  let browser: Browser;
  let page: Page;
  beforeAll(async () => {
    browser = await launch({ headless: false });
    page = await browser.newPage();
  }, 10 * 1000); // increase timeout to cater slow devices
  afterAll(async () => {
    await page.close();
    await browser.close();
  });
  it('should has the react client running on port 3000', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('body');
  });
  it('should has content', async () => {
    await expect(
      page.evaluate(() => {
        let h1 = document.querySelector('header h1');
        return h1 && h1.textContent;
      }),
    ).resolves.toBe('Simple Website');

    await expect(
      page.evaluate(() => {
        let section = document.querySelector('section');
        let text = section && section.firstChild;
        return text instanceof Text && text.textContent;
      }),
    ).resolves.toBe(
      'This is a simple website made without React. Try to convert this into React enabled.',
    );

    await expect(
      page.evaluate(() => {
        let ol = document.querySelector('section ol');
        return ol && ol.innerHTML;
      }),
    ).resolves.toBe(
      `<li>First, you need to use <span class="command">create-react-app</span></li>` +
        `<li>Second, you need to run <span class="command">npm start</span></li>`,
    );
  });

  it('should has css', async () => {
    let matches: any = await page.evaluate(() => {
      let allStyles = Array.from(document.querySelectorAll('style'));
      return allStyles
        .map((style) => {
          let text = style.textContent;
          text = text && text.replace(/\s/g, '');
          let body = text && text.match(/body{(.*?)}/);
          let command = text && text.match(/\.command{(.*?)}/);
          let footer = text && text.match(/footer{(.*?)}/);
          let sourceMap = text && text.match(/sourceMappingURL=.*/);
          return {
            body: body && body[1],
            command: command && command[1],
            footer: footer && footer[1],
            sourceMap: !!sourceMap,
          };
        })
        .find((matches) => {
          return matches.body || matches.command || matches.footer;
        });
    });
    expect(matches).toBeDefined();
    expect(matches.body).toContain('font-size:18px');
    expect(matches.command).toContain('background:#000');
    expect(matches.command).toContain('color:#fff');
    expect(matches.footer).toContain('text-align:center');
  });

  it('should has logo', async () => {
    await expect(
      page.evaluate(() => {
        let img = document.querySelector('footer img') as HTMLImageElement;
        let src = img && img.src;
        if (!src) {
          return false;
        }
        return fetch(src).then((res) => {
          return (
            res.status === 200 &&
            res.headers.get('content-type').includes('image/png')
          );
        });
      }),
    ).resolves.toBe(true);
  });

  it('should has title', async () => {
    let title = await page.title();
    expect(title).toBe('Simple Website');
  });

  it('should mount react app on body', async () => {
    await expect(
      page.evaluate(() => {
        return document.querySelector('#root');
      }),
    ).resolves.toBeNull();
  });
});
