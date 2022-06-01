import { RootState } from './state'

export let rootReducer = (): RootState => {
  return {
    list: [
      { id: 1, title: 'Buy apple', date: '2022/02/13', is_done: true },
      {
        id: 3,
        title: 'Buy bright sunglass',
        date: '2022/02/13',
        is_done: true,
      },
      { id: 3, title: 'Buy chocolate', date: '2022/02/12', is_done: false },
      { id: 4, title: 'Buy daring food', date: '2022/02/14', is_done: false },
      { id: 4, title: 'Buy elegant ring', date: '2022/02/10', is_done: true },
      { id: 2, title: 'Buy flower', date: '2022/02/13', is_done: true },
    ],
  }
}
