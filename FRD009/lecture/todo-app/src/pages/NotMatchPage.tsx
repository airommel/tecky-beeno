import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useRouteMatch } from 'react-router'
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
          <IonButton routerLink={routes.tab.home}>Back to Home Page</IonButton>
        </div>
        <p>
          You may report this eror page to the admin at{' '}
          <a href={'mailto:' + email} target="_blank" rel="noreferrer">
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
