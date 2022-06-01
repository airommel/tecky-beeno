type Store<State, Action> = {
  getState: () => State
  dispatch: (action: Action) => void
  subscribe: (listener: (state: State) => void) => Unsubscribe
}
type Unsubscribe = () => void

let store: Store<any, any>

export function createStore<State, Action>(
  reducer: (state: State | undefined, action: Action) => State,
): Store<State, Action> {
  let state = reducer(undefined, { type: '@@INIT' } as any)
  let listeners: Array<(state: State) => void> = []

  function getState() {
    return state
  }
  function dispatch(action: Action) {
    let newState = reducer(state, action)
    if (newState !== state) {
      state = newState
      listeners.forEach(listener => listener(newState))
    }
  }
  function subscribe(listener: (state: State) => void) {
    listeners.push(listener)
    const unsubscribe = () => {
      let index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
    return unsubscribe
  }
  return (store = {
    getState,
    subscribe,
    dispatch,
  })
}

export function useSelector<State, R>(selector: (state: State) => R) {
  const [state, setState] = useState(selector(store.getState()))
  useEffect(() => {
    const unsubscribe = store.subscribe(state => setState(selector(state)))
    return unsubscribe
  }, [store])
  return state
}
