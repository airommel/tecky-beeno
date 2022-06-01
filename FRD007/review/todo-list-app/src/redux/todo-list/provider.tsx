import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state'
import { getAllTodoItemsThunk } from './thunk'

export function TodoListProvider(props: { children: any }) {
  const dispatch = useDispatch()
  const list = useSelector((state: RootState) => state.todoList.list)
  useEffect(() => {
    if (list === 'loading') {
      dispatch(getAllTodoItemsThunk())
    }
  }, [dispatch, list])
  return <>{props.children}</>
}
