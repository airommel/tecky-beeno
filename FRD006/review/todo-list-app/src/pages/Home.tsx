import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import './Home.css'
import styles from '../App.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/state'
import { TopBar } from '../components/TopBar'

const Home: React.FC = () => {
  const themeStyles = useSelector((state: RootState) => state.theme.styles)
  // ionic sacrifice performance -> for compatibility
  // React native X HTML X CSS -> compiled to native widget
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <TopBar></TopBar>
        <div
          className={styles.App}
          style={{
            color: themeStyles.textColor,
            backgroundColor: themeStyles.backgroundColor,
          }}
        >
          Main Page
        </div>
      </IonContent>
    </>
  )
}

export default Home
