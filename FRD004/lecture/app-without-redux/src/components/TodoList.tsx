import { SharedState } from '../shared/state'

export function TodoList(props: {
  list: SharedState.TodoList
  selectItem: (id: number) => void
}) {
  const { list, selectItem } = props
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
          {list.map(item => (
            <tr key={item.id}>
              <td>#{item.id}</td>
              <td>{item.title}</td>
              <td>
                <button onClick={() => selectItem(item.id)}>
                  show details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
