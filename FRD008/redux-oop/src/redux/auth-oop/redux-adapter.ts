import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state'

const _useDispatch = useDispatch
const _useSelector = useSelector

export interface IAction<T> {
  type: T
  arguments: IArguments
}

export abstract class ReduxAdapter<
  State extends object,
  Action extends IAction<keyof State> = any,
> {
  constructor() {
    this.reducer = this.reducer.bind(this)
  }

  abstract getInstance(state: RootState): typeof this

  mount() {
    const dispatch = _useDispatch()
    return new Proxy(this, {
      get: (target, name) => {
        console.log('get', { target, method: name })
        let property = target[name as keyof this]
        if (typeof property === 'function') {
          return function () {
            let action: IAction<keyof State> = {
              type: name as keyof State,
              arguments,
            }
            dispatch(action)
          }
        }
        return _useSelector(
          (state: RootState) => target.getInstance(state)[name as keyof this],
        )
      },
    })
  }

  // getDispatch() {
  //   const dispatch = _useDispatch()
  //   return new Proxy(this, {
  //     get: (target, method) => {
  //       return function () {
  //         let action: IAction<keyof State> = {
  //           type: method as keyof State,
  //           arguments,
  //         }
  //         dispatch(action)
  //       }
  //     },
  //   })
  // }

  reducer(state: this | undefined = this, action: Action): typeof this {
    let method = this[action.type as keyof this]
    if (typeof method === 'function') {
      Object.assign(this, state)
      method.apply(this, action.arguments)
      return this.clone()
    }
    return this
  }

  clone(): typeof this {
    let Constructor = this.constructor as any
    let newInstance = new Constructor()
    Object.assign(newInstance, this)
    return newInstance
  }
}
