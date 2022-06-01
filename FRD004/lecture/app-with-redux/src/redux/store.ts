import { createStore } from 'redux'
import { RootState } from './state'

export const reducer = (): RootState => {
  return {
    list: [
      {
        id: 1,
        title: 'buy apple',
        desc: 'one day one apple, doctor away from me',
        count: 1,
      },
      {
        id: 2,
        title: 'buy banana',
        desc: 'banana is good for coding monkey',
        count: 5,
      },
    ],
    selectedItemId: 2,
  }
}

export const store = createStore(reducer)

// store.getState
// store.subscribe
