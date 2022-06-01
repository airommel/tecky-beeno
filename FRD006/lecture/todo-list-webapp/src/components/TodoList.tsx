import { push } from '@lagunovsky/redux-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../redux/state'
import { selectItemAction } from '../redux/todo-list/action'
import { Button } from './Button'

export function TodoList() {
  const items = useSelector((state: RootState) => state.todoList.items)
  const dispatch = useDispatch()
  // const navigate = useNavigate();
  const selectItem = (id: number) => {
    dispatch(selectItemAction(id))
    // navigate('/todo-detail');
    // dispatch(push(`/todo-detail/${id}`));
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
                <Link to={`/todo-detail/${item.id}`}>
                  <Button onClick={() => selectItem(item.id)}>
                    show details
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
