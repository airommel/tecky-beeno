import { chromium } from 'playwright'
import { knex } from './knex'
import { LihkgTopicCollector } from './lihkg.topic.collector'
import { SiteService } from './site.service'
import { TopicService } from './topic.service'
import { UserService } from './user.service'

async function main() {
  let browser = await chromium.launch({
    headless: false,
  })
  let context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64; rv:95.0) Gecko/20100101 Firefox/95.0',
  })
  let page = await context.newPage()

  let userService = new UserService(knex)
  let siteService = new SiteService(knex)
  let topicService = new TopicService(knex, userService, siteService)
  let collector = new LihkgTopicCollector(topicService)

  await collector.collectAndStore(page)

  await page.close()
  await browser.close()
  await knex.destroy()

  console.log('completed')
}
main()
