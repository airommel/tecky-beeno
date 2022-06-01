import { useState } from 'react'

export function useArray<T>() {
  const [state, setState] = useState<T[]>([])
  function push(item: T) {
    setState(list => [...list, item])
  }
  function map<R>(fn: (item: T, index: number) => R) {
    return state.map(fn)
  }
  function remove(item: T) {
    setState(list => list.filter(x => x !== item))
  }
  function reset() {
    setState([])
  }
  return {
    value: state,
    push,
    map,
    remove,
    reset,
    replace: setState,
    length: state.length,
    // fun: function () {},
    // fun2: () => {},
    isEmpty() {
      return state.length === 0
    },
    reduce: state.reduce.bind(state),
    forEach: state.forEach.bind(state),
  }
}
