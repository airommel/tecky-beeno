import { Redirect, Route } from 'react-router-dom'
import HomeTab from './pages/HomeTab'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotMatchPage from './pages/NotMatchPage'
import InboxTab from './pages/InboxTab'
import MoreTab from './pages/MoreTab'
import DefaultPage from './pages/DefaultPage'
import TabBar from './TabBar'
import { IonRouterOutlet, IonTabs } from '@ionic/react'
import WelcomePage from './pages/WelcomePage'
import { useSelector } from 'react-redux'
import { RootState } from './redux/state'
import { useRole } from './hooks/useRole'

export let routes = {
  tab: {
    home: '/tab/home',
    timeSheet: '/tab/time-sheet',
    inbox: '/tab/inbox',
    more: '/tab/more',
  },
  welcome: '/welcome',
  login: '/login',
  register: '/register',
  profile: '/profile',
  settings: '/settings',
  about: '/about',
  terms: '/terms',
  privacy: '/privacy',
}

const GuestRoute = (props: {
  exact?: boolean
  path: string
  component: React.FC
}) => {
  const role = useRole()
  const Component = props.component
  return (
    <Route exact={props.exact} path={props.path}>
      {role === 'guest' ? <Component /> : <Redirect to={routes.tab.home} />}
    </Route>
  )
}

const UserRoute = (props: {
  exact?: boolean
  path: string
  component: React.FC
}) => {
  const role = useRole()
  const Component = props.component
  return (
    <Route exact={props.exact} path={props.path}>
      {role === 'user' ? <Component /> : <LoginPage />}
    </Route>
  )
}

export const Routes = () => {
  return (
    <>
      <IonRouterOutlet>
        <Route exact path="/">
          {/* <Redirect to={routes.tab.home} /> */}
          <DefaultPage />
        </Route>
        <GuestRoute exact path={routes.welcome} component={WelcomePage} />
        <GuestRoute exact path={routes.login} component={LoginPage} />
        <GuestRoute exact path={routes.register} component={RegisterPage} />
        <Route path="/tab">
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path={routes.tab.home} component={HomeTab} />
              <UserRoute path={routes.tab.inbox} component={InboxTab} />
              <Route path={routes.tab.more} component={MoreTab} />
            </IonRouterOutlet>
            {TabBar()}
          </IonTabs>
        </Route>
        <Route component={NotMatchPage} />
      </IonRouterOutlet>
    </>
  )
}
