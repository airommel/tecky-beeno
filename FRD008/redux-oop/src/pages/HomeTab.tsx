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
import { reduxObjects } from '../redux/reducer'
import { RootState } from '../redux/state'
import { routes } from '../routes'
import './HomeTab.css'

const Counter = (props: { title: string; color?: string }) => {
  const initialCount = 123
  const [count, setCount] = useState(initialCount)
  const [titleFontSize, setTitleFontSize] = useState('2rem')
  const [buttonFontSize, setButtonFontSize] = useState('1rem')

  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleFontSize('1rem')
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  useEffect(() => {
    if (count === initialCount) {
      return
    }
    setButtonFontSize('2rem')
    const timer = setTimeout(() => {
      setButtonFontSize('1rem')
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [count])

  const inc = () => {
    setCount(count + 1)
  }

  return (
    <div
      style={{
        fontSize: titleFontSize,
        transition: 'font-size 1s',
      }}
    >
      {props.title}:{' '}
      <IonButton
        expand="block"
        onClick={inc}
        color={props.color}
        style={{
          fontSize: buttonFontSize,
          transition: 'font-size 0.5s',
        }}
      >
        {count}
      </IonButton>
    </div>
  )
}

const Guest = '(guest)'
const colors = ['primary', 'secondary', 'tertiary']

const HomeTab: React.FC = () => {
  // const auth = useSelector(
  //   (state: RootState) => state.authObject.getDispatch(),
  // )
  // const username = useSelector(
  //   (state: RootState) => state.authObject.user?.username || Guest,
  // )
  let auth = reduxObjects.auth.mount()
  const username = auth.user?.username || Guest

  const [count, setCount] = useState(3)
  // const dispatch = useDispatch()

  const inc = () => {
    setCount(count + 1)
  }
  const dec = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }
  const logout = () => {
    // dispatch(logoutAction())
    auth.logout()
  }

  const counters: any[] = []
  for (let i = 0; i < count; i++) {
    let color = colors[i % colors.length]
    // example: "Primary Counter"
    let title = color[0].toUpperCase() + color.slice(1) + ' Counter'
    counters.push(<Counter key={i} title={title} color={color}></Counter>)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonText slot="end" className="ion-padding" color="primary">
            {username}
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton onClick={inc}>+</IonButton>
        {count}
        <IonButton disabled={count <= 0} onClick={dec}>
          -
        </IonButton>
        {counters}

        <div className="ion-margin-top">
          {username === Guest ? (
            <IonButton routerLink={routes.login} expand="block">
              Login
            </IonButton>
          ) : (
            <IonButton onClick={logout} color="dark" expand="block">
              Logout
            </IonButton>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}

export default HomeTab
