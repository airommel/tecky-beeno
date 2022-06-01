import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/state'
import { selectItemAction } from '../redux/todo-list/action'
import { Button } from './Button'

export function TodoList() {
  const items = useSelector((state: RootState) => state.todoList.items)
  const dispatch = useDispatch()
  const selectItem = (id: number) => {
    dispatch(selectItemAction(id))
  }
  return (
    <div>
      <h2>Todo List</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>links</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>#{item.id}</td>
              <td>{item.title}</td>
              <td>
                <Button onClick={() => selectItem(item.id)}>
                  show details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
