import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'
import './Tab3.css'
import CircleButton from '../components/CircleButton'
import { useEffect, useState } from 'react'

function d2(number: number): string {
  if (number < 10) {
    return '0' + number
  }
  return number.toString()
}

function formatTime(time: number): string {
  let ms = time % 1000
  let cs = Math.floor(ms / 10)
  let s = ((time - ms) / 1000) % 60
  let m = (time - ms - s * 1000) / 1000 / 60
  return `${d2(m)}:${d2(s)},${d2(cs)}`
}

const FPS = 60
const FrameInterval = 1000 / FPS

const StopWatchTab: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [startTime, setStartTime] = useState(Date.now())
  const [passedTimeBeforePause, setPassedTimeBeforePause] = useState(0)
  const [lapList, setLapList] = useState<number[]>([])

  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    if (!isRunning) return
    let timer = setInterval(() => setNow(Date.now()), FrameInterval)
    return () => clearInterval(timer)
  }, [isRunning])

  const passedTime = isRunning ? now - startTime : 0
  const totalPassedTime = isStarted ? passedTime + passedTimeBeforePause : 0

  const start = () => {
    let now = Date.now()
    setPassedTimeBeforePause(0)
    setStartTime(now)
    setNow(now)
    setIsStarted(true)
    setIsRunning(true)
  }

  const pause = () => {
    setIsRunning(false)
    setPassedTimeBeforePause(totalPassedTime)
  }

  const resume = () => {
    let now = Date.now()
    setStartTime(now)
    setNow(now)
    setIsRunning(true)
  }

  const lap = () => {
    setLapList([...lapList, totalPassedTime])
  }

  const reset = () => {
    setIsStarted(false)
    setIsRunning(false)
    setLapList([])
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Stop Watch</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div
          className="ion-text-center ion-margin"
          style={{ fontSize: '3.25em' }}
        >
          <div hidden>00:00,00</div>
          {formatTime(totalPassedTime)}
        </div>
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-center">
              {isRunning ? (
                <CircleButton theme="secondary" onClick={lap}>
                  Lap
                </CircleButton>
              ) : (
                <CircleButton theme="danger" onClick={reset}>
                  Reset
                </CircleButton>
              )}
            </IonCol>
            <IonCol className="ion-text-center">
              {isRunning ? (
                <CircleButton theme="danger" onClick={pause}>
                  Pause
                </CircleButton>
              ) : isStarted ? (
                <CircleButton theme="success" onClick={resume}>
                  Resume
                </CircleButton>
              ) : (
                <CircleButton theme="success" onClick={start}>
                  Start
                </CircleButton>
              )}
            </IonCol>
          </IonRow>
          <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            {lapList.map((lapTime, i) => (
              <IonRow key={i}>
                <IonCol className="ion-text-start">Lap {i + 1}</IonCol>
                <IonCol className="ion-text-end">{formatTime(lapTime)}</IonCol>
              </IonRow>
            ))}
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default StopWatchTab
