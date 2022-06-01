import { IonRouterLink } from '@ionic/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/state'

export function TopBar() {
  const n = useSelector((state: RootState) => state.todoList.items.length)
  const c = useSelector((state: RootState) =>
    state.todoList.items.reduce((sum, item) => sum + item.count, 0),
  )
  return (
    <div>
      <b>Top Bar</b>
      <div>{n} items in list</div>
      <div>{c} counts in total</div>

      <ul>
        <IonRouterLink routerLink="/">Main</IonRouterLink>
        <IonRouterLink routerLink="/todos">Todo List</IonRouterLink>
      </ul>
    </div>
  )
}
