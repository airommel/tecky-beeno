import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../redux/auth/action'
import { RootState } from '../redux/state'
import { routes } from '../routes'

const MoreTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">TODO</IonContent>
    </IonPage>
  )
}

export default MoreTab
