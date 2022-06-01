import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/state'
import {
  addItemAction,
  NewItemDTO,
  reorderItemAction,
  selectItemAction,
} from '../redux/todo-list/action'
import { Button } from '../components/Button'
import { useForm } from 'react-hook-form'
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonReorder,
  IonReorderGroup,
  IonTitle,
  IonToolbar,
  ItemReorderCustomEvent,
  ItemReorderEventDetail,
} from '@ionic/react'
import { TopBar } from '../components/TopBar'
import { useHistory } from 'react-router'

export function TodoList() {
  const history = useHistory();
  const items = useSelector((state: RootState) =>
    state.todoList.items.slice().sort((a, b) => a.order - b.order),
  )
  const dispatch = useDispatch()
  const { register, handleSubmit, reset } = useForm<NewItemDTO>({
    defaultValues: {
      title: '',
      desc: '',
    },
  })
  const selectItem = (id: number) => {
    dispatch(selectItemAction(id))
    history.push(`/todo-details/${id}`)

  }
  const submit = (data: NewItemDTO) => {
    dispatch(addItemAction(data))
    reset()
  }
  const moveItem = (e: CustomEvent<ItemReorderEventDetail>) => {
    let item = items[e.detail.from]
    let itemBefore = items[e.detail.to - 1]
    let itemAfter = items[e.detail.to]
    let order = itemBefore
      ? (itemBefore.order + itemAfter.order) / 2
      : itemAfter.order - 1
    console.log({ title: item.title, order })
    // FIXME handle case when moving item to the last position
    dispatch(reorderItemAction(item.id, order))
    e.detail.complete()
  }
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>TodoList</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TopBar></TopBar>
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
                <th>order</th>
                <th>title</th>
                <th>links</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>#{item.id}</td>
                  <td>({item.order})</td>
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
          <h3>Reorder with IonReorderGroup</h3>
          <IonList>
            <IonReorderGroup disabled={false} onIonItemReorder={moveItem}>
              {items.map(item => (
                <IonItem key={item.id}>
                  <IonLabel>{item.title}</IonLabel>
                  <IonReorder slot="end" />
                </IonItem>
              ))}
            </IonReorderGroup>
          </IonList>
        </div>
      </IonContent>
    </>
  )
}
