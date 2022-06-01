import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { FormEvent } from 'react'
import ReactFacebookLogin, {
  ReactFacebookLoginInfo,
} from 'react-facebook-login'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { APIResult } from '../components/APIResult'
import { appName } from '../config'
import { env } from '../env'
import {
  loginWithFacebookThunk,
  loginWithPasswordThunk,
} from '../redux/auth/thunk'
import { RootState } from '../redux/state'
import { routes } from '../routes'
import './LoginPage.css'

const LoginPage: React.FC = () => {
  const result = useSelector((state: RootState) => state.auth.loginResult)
  const dispatch = useDispatch()

  const login = async (event: FormEvent) => {
    event.preventDefault()
    let form = event.currentTarget as any
    let user = {
      role: form.role.value,
      username: form.username.value,
      password: form.password.value,
    }
    dispatch(loginWithPasswordThunk(user))
  }

  const fBOnCLick = () => {
    console.log('user click on facebook login button')
    return null
  }

  const fBCallback = (
    userInfo: ReactFacebookLoginInfo & { accessToken: string },
  ) => {
    if (userInfo.accessToken) {
      dispatch(loginWithFacebookThunk(userInfo.accessToken))
    }
    return null
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form onSubmit={login}>
          <div>
            <label htmlFor="role">role:</label>
            <select id="role" name="role">
              <option>customer</option>
              <option>shop</option>
              <option>admin</option>
            </select>
          </div>
          <div>
            <label>
              username:
              <input name="username" type="text"></input>
            </label>
          </div>
          <div>
            <label>
              password:
              <input name="password" type="password"></input>
            </label>
          </div>
          <div>
            <input type="submit" value="login"></input>
          </div>
          <div>
            <ReactFacebookLogin
              appId={env.FACEBOOK_APP_ID || ''}
              autoLoad={false}
              fields="email"
              onClick={fBOnCLick}
              callback={fBCallback}
            />
          </div>
          <APIResult result={result} />
        </form>

        <p>
          New to {appName}?{' '}
          <Link to={routes.register}>Register an account</Link>
        </p>
      </IonContent>
    </IonPage>
  )
}

export default LoginPage
