import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import {
  cog,
  newspaper,
  newspaperOutline,
  newspaperSharp,
  people,
  peopleSharp,
  settings,
} from 'ionicons/icons'
import { useRole } from '../hooks/useRole'
import { routes } from '../routes'

const MoreTab: React.FC = () => {
  const role = useRole()
  const pages = [
    { href: routes.settings, title: 'Settings', md: settings, ios: cog },
    { href: routes.about, title: 'About Us', md: settings, ios: cog },
    { href: routes.terms, title: 'Terms of Usage', md: settings, ios: cog },
    {
      href: routes.privacy,
      title: 'Privacy Policy',
      md: newspaperSharp,
      ios: newspaperOutline,
    },
  ]
  if (role !== 'guest') {
    pages.unshift({
      href: routes.profile,
      title: 'Profile',
      md: peopleSharp,
      ios: people,
    })
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>More</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {pages.map(page => (
            <IonItem key={page.href} routerLink={page.href}>
              <IonIcon slot="start" md={page.md} ios={page.ios}></IonIcon>
              <IonLabel>{page.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default MoreTab
