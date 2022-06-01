import { Page } from 'playwright'
import { TopicFeed, TopicService } from './topic.service'

export abstract class TopicCollector {
  abstract collect(page: Page): Promise<TopicFeed[]>

  constructor(protected topicService: TopicService) {}

  async collectAndStore(page: Page) {
    let topic_list = await this.collect(page)
    console.log('collected', topic_list.length, 'topics')
    for (let topic of topic_list) {
      await this.topicService.upsert(topic)
    }
    await this.topicService.report()
  }
}
