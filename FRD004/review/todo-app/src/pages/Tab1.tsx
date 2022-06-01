import {
  IonCheckbox,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ExploreContainer from '../components/ExploreContainer'
import { TodoList } from '../components/TodoList'
import { RootState } from '../redux/state'
import './Tab1.css'

const Tab1: React.FC = () => {
  const [date, setDate] = useState('')

  let time = date ? new Date(date).getTime() : Date.now()

  let dateText =
    new Date(time).toDateString() === new Date().toDateString()
      ? 'Today'
      : new Date(time).toLocaleDateString()

  const list = useSelector((state: RootState) =>
    state.list.filter(item => {
      return (
        new Date(item.date).toDateString() === new Date(time).toDateString()
      )
    }),
  )

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todo List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h2 hidden>Date Filter</h2>
        <IonDatetime
          presentation="date"
          value={date}
          onIonChange={e => {
            console.log('set date', date)
            setDate(e.detail.value || '')
          }}
        ></IonDatetime>
        <TodoList title={dateText + "'s Todo Items"} list={list}></TodoList>
      </IonContent>
    </IonPage>
  )
}

export default Tab1
