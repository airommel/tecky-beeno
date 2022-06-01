import { Page } from 'playwright'
import { TopicCollector } from './topic.collector'
import { TopicFeed } from './topic.service'

export class LihkgTopicCollector extends TopicCollector {
  async collect(page: Page): Promise<TopicFeed[]> {
    let source_url = 'https://lihkg.com/category/1'
    await page.goto(source_url)

    console.log('wait for main body')
    await page.waitForSelector('#app nav')

    console.log('check for captcha detector')
    let hasChallenge = await page.evaluate(() => {
      return !!document.querySelector('#lihkg-challenge')
    })
    if (hasChallenge) {
      console.log('got lihkg-challenge, wait for manual involve')
      await page.evaluate(() => {
        return new Promise<void>(resolve => {
          let observer = new MutationObserver(() => {
            if (!document.querySelector('#lihkg-challenge')) {
              resolve()
            }
          })
          observer.observe(document.body, {
            subtree: true,
            childList: true,
            characterData: true,
          })
        })
      })
      console.log('resolved lihkg-challenge')
    } else {
      console.log('no lihkg-challenge')
    }

    console.log('collect topic list')
    let topic_list = await page.evaluate((source_url: string) => {
      let topic_list: {
        title: string
        thread_id: string
        like_count: number
        author: string
        source_url: string
      }[] = []
      document.querySelectorAll('#leftPanel a').forEach(e => {
        let a = e as HTMLAnchorElement
        if (!a.href.includes('/thread/')) return

        let title = a.parentElement?.querySelector('div span')?.textContent
        if (!title) return

        let thread_id = a.href.match(/\/thread\/(\d+)/)?.[1]
        if (!thread_id) return

        let author =
          a.parentElement?.parentElement?.querySelector('div span')?.textContent

        if (!author) return

        let like_count =
          +a.parentElement?.parentElement?.querySelector('.i-thumb-up')
            ?.parentElement?.textContent! || 0

        topic_list.push({ title, thread_id, like_count, author, source_url })
      })
      return topic_list
    }, source_url)
    return topic_list
  }
}
