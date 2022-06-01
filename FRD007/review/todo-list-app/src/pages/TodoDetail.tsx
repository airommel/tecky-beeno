import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/state'
import {
  renameItemAction,
  tickItemAction,
  updateItemDescAction,
} from '../redux/todo-list/action'
import { Button } from '../components/Button'
import { TodoState } from '../redux/todo-list/state'
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react'
import { TopBar } from '../components/TopBar'
import { useRouteMatch } from 'react-router'
import { LoadingMessage } from '../components/LoadingMessage'
import { useEffect } from 'react'
import { getTodoItemByIdThunk } from '../redux/todo-list/thunk'

export function TodoDetail() {
  // const router = useIonRouter()
  const routeMatch = useRouteMatch<{ item_id: string }>()
  console.log('routeMatch:', routeMatch)
  const selectedItemId = +routeMatch.params.item_id
  const maybeItem = useSelector((state: RootState) => {
    return state.todoList.record[selectedItemId]
  })
  const dispatch = useDispatch()
  useEffect(() => {
    if (maybeItem && maybeItem !== 'loading') return
    dispatch(getTodoItemByIdThunk(selectedItemId))
  }, [dispatch, maybeItem, selectedItemId])
  const tickItem = (id: number) => {
    dispatch(tickItemAction(id))
  }
  function renderBody() {
    if (!maybeItem) {
      return <div>No item selected</div>
    }
    if (maybeItem === 'loading') {
      return <LoadingMessage name={'Item ' + selectedItemId} />
    }
    const item = maybeItem
    function Field(field: keyof TodoState, onChange?: (value: string) => void) {
      let id = 'todo-detail--' + field
      return (
        <IonItem>
          <IonLabel position='floating'>{field}</IonLabel>
          <IonInput
            readonly={!onChange}
            onIonChange={e => onChange?.(e.detail.value || '')}
            type="text"
            id={id}
            value={item[field]}
          />
        </IonItem>
      )
    }
    return (
      <>
        item json: {JSON.stringify(item)}
        <IonList>
          {Field('id')}
          {Field('order')}
          {Field('title', title => dispatch(renameItemAction(item.id, title)))}
          {Field('desc', desc => dispatch(updateItemDescAction(item.id, desc)))}
          {Field('count')}
        </IonList>
        <IonButton onClick={() => tickItem(item.id)}>tick</IonButton>
      </>
    )
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>TodoList</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <TopBar></TopBar>
        <div>
          <h2>Todo Detail</h2>
          {renderBody()}
        </div>
      </IonContent>
    </>
  )
}
