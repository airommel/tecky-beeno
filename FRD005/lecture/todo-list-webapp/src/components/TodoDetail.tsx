import Data from 'react-any-data'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/state'
import { tickItemAction } from '../redux/todo-list/action'
import { Button } from './Button'

export function TodoDetail() {
  const item = useSelector((state: RootState) =>
    state.todoList.selectedItemId
      ? state.todoList.items.find(
          item => item.id === state.todoList.selectedItemId,
        )
      : null,
  )
  const dispatch = useDispatch()
  const tickItem = (id: number) => {
    dispatch(tickItemAction(id))
  }
  return item ? (
    <div>
      <h2>Todo Detail</h2>
      <Data readOnly={true} state={{ item }} name="item" />
      <Button onClick={() => tickItem(item.id)}>tick</Button>
    </div>
  ) : null
}
