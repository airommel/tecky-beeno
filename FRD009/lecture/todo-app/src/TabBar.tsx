import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { home, mail, ellipsisHorizontal } from 'ionicons/icons'
import { routes } from './routes'

const TabBar = () => {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="homeTab" href={routes.tab.home}>
        <IonIcon icon={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="loginTab" href={routes.tab.inbox}>
        <IonIcon icon={mail} />
        <IonLabel>Inbox</IonLabel>
      </IonTabButton>
      <IonTabButton tab="registerTab" href={routes.tab.more}>
        <IonIcon ios={ellipsisHorizontal} md={ellipsisHorizontal} />
        <IonLabel>More</IonLabel>
      </IonTabButton>
    </IonTabBar>
  )
}
export default TabBar
