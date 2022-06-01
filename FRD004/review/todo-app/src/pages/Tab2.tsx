import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useSelector } from 'react-redux'
import ExploreContainer from '../components/ExploreContainer'
import { TodoList } from '../components/TodoList'
import { RootState } from '../redux/state'
import './Tab2.css'

const Tab2: React.FC = () => {
  let today = new Date().toDateString()
  const list = useSelector((state: RootState) =>
    state.list.filter(item => new Date(item.date).toDateString() === today),
  )
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notices</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <TodoList title={"Today's schedule"} list={list}></TodoList>
      </IonContent>
    </IonPage>
  )
}

export default Tab2
