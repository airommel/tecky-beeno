import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/state'
import {
  addItemAction,
  NewItemDTO,
  selectItemAction,
} from '../redux/todo-list/action'
import { Button } from './Button'
import { useForm } from 'react-hook-form'

export function TodoList() {
  const items = useSelector((state: RootState) => state.todoList.items)
  const dispatch = useDispatch()
  const { register, handleSubmit, reset } = useForm<NewItemDTO>({
    defaultValues: {
      title: '',
      desc: '',
    },
  })
  const selectItem = (id: number) => {
    dispatch(selectItemAction(id))
  }
  const submit = (data: NewItemDTO) => {
    dispatch(addItemAction(data))
    reset()
  }
  return (
    <div className="TodoList">
      <h2>Todo List</h2>
      <form onSubmit={handleSubmit(submit)}>
        <h3>New Item</h3>
        <div>
          <label htmlFor="new-todo--title">Title:</label>
          <input {...register('title')} id="new-todo--title"></input>
        </div>
        <div>
          <label htmlFor="new-todo--desc">Desc:</label>
          <input {...register('desc')} id="new-todo--desc"></input>
        </div>
        <input type="submit" value="Add Item"></input>
      </form>
      <h3>Scheduled Items</h3>
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
