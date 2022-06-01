import { createStore } from './lib'

type State = {
  count: number
}

type Action =
  | {
      type: 'add'
      amount: number
    }
  | {
      type: 'reset'
    }

let initialState: State = { count: 0 }

let reducer = (state: State | undefined = initialState, action: Action) => {
  switch (action.type) {
    case 'add':
      return { count: state.count + action.amount }
    case 'reset':
      return initialState
    default:
      return state
  }
}

let store = createStore(reducer)

console.log('initial state:', store.getState())

console.log('dispatch add one')
store.dispatch({ type: 'add', amount: 1 })

console.log('state after add one:', store.getState())

console.log('dispatch add ten')
store.dispatch({ type: 'add', amount: 10 })

console.log('state after add ten:', store.getState())


console.log('dispatch reset')
store.dispatch({ type: 'reset',  })

console.log('state after reset:', store.getState())