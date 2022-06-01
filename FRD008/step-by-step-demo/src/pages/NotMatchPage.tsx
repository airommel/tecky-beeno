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
import { useRouteMatch } from 'react-router'
import { logoutAction } from '../redux/auth/action'
import { RootState } from '../redux/state'
import { routes } from '../routes'

const email = 'admin@example.com'

const NotMatchPage: React.FC = () => {
  const route = useRouteMatch()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Page Not Found</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="ion-text-center">
          {/* <IonButton href={routes.tab.home + '/' + Math.random()}>
            Back to Home Page (h)
          </IonButton> */}
          {/* <IonButton routerLink={routes.tab.home + '/' + Math.random()}>
            Back to Home Page (r)
          </IonButton> */}
          <IonButton routerLink={routes.tab.home}>Back to Home Page</IonButton>
        </div>
        <p>
          You may report this eror page to the admin at{' '}
          <a href={'mailto:' + email} target="_blank">
            {email}
          </a>
        </p>
        <p>
          <IonText color="danger">current url: {route.url}</IonText>
        </p>
      </IonContent>
    </IonPage>
  )
}

export default NotMatchPage
