import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'
import './Home.css'
import styles from '../App.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/state'
import { TodoDetail } from '../components/TodoDetail'
import { TodoList } from '../components/TodoList'
import { TopBar } from '../components/TopBar'

const Home: React.FC = () => {
  const themeStyles = useSelector((state: RootState) => state.theme.styles)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div
          className={styles.App}
          style={{
            color: themeStyles.textColor,
            backgroundColor: themeStyles.backgroundColor,
          }}
        >
          <TopBar></TopBar>
          <TodoList></TodoList>
          <TodoDetail></TodoDetail>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Home
