export type Event = {
  title: string
  created_by: User
  going_list: User[]
  vote_list: EventVote[]
  cancel_time?: Date
}

export type EventVote = {
  date: Date
  date_vote_list: User[]
  venue: Venue
  venue_vote_list: User[]
}

export type User = {
  name: string
}

export type Venue = {
  name: string
}
