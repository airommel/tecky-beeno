import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import ExploreContainer from '../components/ExploreContainer'
import './Tab1.css'

const Box = () => {
  useEffect(() => {
    console.log('box appear')
    return () => {
      console.log('box disappear')
    }
  }, [])
  return <div>Box</div>
}

const Tab1: React.FC = () => {
  const [a, setA] = useState(1)
  const [b, setB] = useState(2)
  const [c, setC] = useState(3)

  const [shouldShowC, setShouldC] = useState(true)

  useEffect(() => {
    console.log('A is updated:', a)
  }, [a])

  useEffect(() => {
    console.log('B is updated:', b)
  }, [b])

  useEffect(() => {
    console.log('effect with [] deps starts')
  }, [])

  useEffect(() => {
    console.log('something is updated:', { a, b, c })
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton onClick={() => setA(a + 1)}>A: {a}</IonButton>
        <IonButton
          onClick={() => {
            setB(b + 1)
            setShouldC(false)
          }}
        >
          B: {b}
        </IonButton>

        <IonButton hidden={!shouldShowC} onClick={() => setC(c + 1)}>
          C: {c}
        </IonButton>

        {a > b ? <Box /> : null}
      </IonContent>
    </IonPage>
  )
}

export default Tab1
