import { Knex } from 'knex'
import { SiteService } from './site.service'
import { UserService } from './user.service'

export type TopicFeed = {
  thread_id: string
  source_url: string
  like_count: number
  title: string
  author: string
}

export class TopicService {
  constructor(
    private knex: Knex,
    private userService: UserService,
    private siteService: SiteService,
  ) {}

  async upsert(feed: TopicFeed) {
    let site_id = await this.siteService.seedSite(feed.source_url)

    let existingRow = await this.knex
      .select('id')
      .from('topic')
      .where({ site_id, thread_id: feed.thread_id })
      .first()

    let user_id = await this.userService.seedUserByName(feed.author)

    if (existingRow) {
      await this.knex
        .from('topic')
        .update({
          like_count: feed.like_count,
          title: feed.title,
          user_id,
        })
        .where({ id: existingRow.id })
    } else {
      await this.knex
        .insert({
          thread_id: feed.thread_id,
          site_id,
          like_count: feed.like_count,
          title: feed.title,
          user_id,
        })
        .into('topic')
    }
  }

  async report() {
    let row = await this.knex.count('* as total').from('topic').first()
    console.log('total number of topics in DB:', row!.total)
  }
}
