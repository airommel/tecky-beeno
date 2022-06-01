import { IonRouterLink } from '@ionic/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/state'
import { TodoListProvider } from '../redux/todo-list/provider'
import { LoadingMessage } from './LoadingMessage'

export function TopBar() {
  return (
    <TodoListProvider>
      <IdealTopBar />
    </TodoListProvider>
  )
}
function IdealTopBar() {
  const stats = useSelector((state: RootState) => {
    if (state.todoList.failMessage) {
      return state.todoList.failMessage
    }
    const items = state.todoList.list
    const stats =
      items === 'loading' || !items
        ? ('loading' as const)
        : {
            n: items.length,
            c: items.reduce((sum, item) => sum + item.count, 0),
          }
    return stats
  })
  console.log('topBar, stats:', stats)
  return (
    <div>
      <b>Top Bar</b>
      {stats === 'loading' ? (
        <LoadingMessage name="Stats" />
      ) : 'error' in stats ? (
        stats.error
      ) : (
        <>
          <div>{stats.n} items in list</div>
          <div>{stats.c} counts in total</div>
        </>
      )}

      <ul>
        <IonRouterLink routerLink="/">Main</IonRouterLink>
        <IonRouterLink routerLink="/todos">Todo List</IonRouterLink>
      </ul>
    </div>
  )
}
