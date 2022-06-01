export type event = {
  id: number
  title: string
  created_by: user
}

export type event_participant = {
  event_id: number
  user_id: number
}

export type date_option = {
  event_id: number
  id: number
  date: Date
}

export type user_date_vote = {
  user_id: number
  date_option_id: number
}

export type venue_option = {
  event_id: number
  id: number
  venue_id: number
}

export type user_venue_vote = {
  user_id: number
  venue_option_id: number
}

export type user = {
  id: number
  name: string
}

export type venue = {
  id: number
  name: string
}
