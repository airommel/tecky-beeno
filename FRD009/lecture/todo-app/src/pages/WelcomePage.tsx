import {
  IonButton,
  IonContent,
  IonPage,
} from '@ionic/react'
import { appName } from '../config'
import { routes } from '../routes'

const WelcomePage: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <img src="/assets/icon/icon.png" alt="App Logo" />

        <p className='ion-text-center'>Welcome to {appName}</p>

        <IonButton expand="block" color="primary" routerLink={routes.login}>
          Login
        </IonButton>
        <IonButton
          expand="block"
          color="secondary"
          routerLink={routes.register}
        >
          Register
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default WelcomePage
