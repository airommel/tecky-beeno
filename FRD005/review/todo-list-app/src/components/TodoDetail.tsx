import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/state'
import {
  renameItemAction,
  tickItemAction,
  updateItemDescAction,
} from '../redux/todo-list/action'
import { Button } from './Button'
import { TodoState } from '../redux/todo-list/state'

export function TodoDetail() {
  const maybeItem = useSelector((state: RootState) =>
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
  if (!maybeItem) {
    return <div>No item selected</div>
  }
  const item = maybeItem
  function Field(field: keyof TodoState, onChange?: (value: string) => void) {
    let id = 'todo-detail--' + field
    return (
      <tr>
        <td>
          <label htmlFor={id}>{field}</label>
        </td>
        <td>
          <input
            readOnly={!onChange}
            onChange={e => onChange?.(e.currentTarget.value)}
            type="text"
            id={id}
            value={item[field]}
          />
        </td>
      </tr>
    )
  }
  return (
    <div>
      <h2>Todo Detail</h2>
      <table>
        <tbody>
          {Field('id')}
          {Field('order')}
          {Field('title', title => dispatch(renameItemAction(item.id, title)))}
          {Field('desc', desc => dispatch(updateItemDescAction(item.id, desc)))}
          {Field('count')}
        </tbody>
      </table>

      <Button onClick={() => tickItem(item.id)}>tick</Button>
    </div>
  )
}
