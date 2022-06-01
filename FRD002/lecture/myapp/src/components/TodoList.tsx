import { FormEvent, useState } from 'react'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'
import { TodoItem } from './TodoItem'

export function TodoList() {
  const [todoList, setTodoList] = useState<TodoItem[]>([
    { id: 1, text: 'Buy milk' },
    { id: 2, text: 'Buy banana' },
    { id: 3, text: 'Buy apple' },
  ])
  const [newText, setNewText] = useState('')
  const addItem = () => {
    if (!newText) {
      return
    }
    const maxId = Math.max(0, ...todoList.map(todoItem => todoItem.id))
    const newItem = {
      id: maxId + 1,
      text: newText,
    }
    setTodoList([newItem, ...todoList])
    setNewText('')
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    addItem()
  }
  const editItem = (item: TodoItem, text: string) => {
    const index = todoList.indexOf(item)
    const newList = todoList.slice()
    // const newList = [...todoList]
    const newItem: TodoItem = { ...item, text }
    newList[index] = newItem
    setTodoList(newList)
  }
  const deleteItem = (id: number) => {
    setTodoList(todoList.filter(item => item.id !== id))
  }
  return (
    <>
      <h1>Todo List ({todoList.length})</h1>
      <form onSubmit={submit}>
        <input
          value={newText}
          onChange={e => setNewText(e.currentTarget.value)}
          placeholder="Input new item here ..."
        />
        <button className="btn btn-primary" onClick={addItem}>
          Add Item
        </button>
      </form>
      <ListGroup>
        {todoList.map(todoItem => (
          <ListGroupItem key={todoItem.id}>
            <TodoItem
              todoItem={todoItem}
              onEdit={text => editItem(todoItem, text)}
              onDelete={() => deleteItem(todoItem.id)}
            />
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  )
}
