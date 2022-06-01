import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'
import './Tab2.css'
import React, { useEffect, useState } from 'react'

const Tab2: React.FC = () => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const [speedX, setSpeedX] = useState(0)
  const [speedY, setSpeedY] = useState(0)

  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)

  let interval = 30

  useEffect(() => {
    let timer = setTimeout(() => {
      if (speedX == 0) {
        return
      }
      setX(x + speedX)
      if (speedX > 0) {
        setSpeedX(speedX - 1)
      } else {
        setSpeedX(speedX + 1)
      }
    }, interval)
    return () => clearTimeout(timer)
  }, [speedX])

  useEffect(() => {
    let timer = setTimeout(() => {
      if (speedY == 0) {
        return
      }
      setY(y + speedY)
      if (speedY > 0) {
        setSpeedY(speedY - 1)
      } else {
        setSpeedY(speedY + 1)
      }
    }, interval)
    return () => clearTimeout(timer)
  }, [speedY])

  const onTouch = (e: React.MouseEvent) => {
    let newX = e.clientX - offsetX
    let newY = e.clientY - offsetY
    // setX(newX)
    // setY(newY)
    let initialSpeed = -10
    if (newX < x) {
      console.log('left')
      setSpeedX(initialSpeed)
    } else {
      console.log('right')
      setSpeedX(-initialSpeed)
    }
    if (newY < y) {
      setSpeedY(initialSpeed)
    } else {
      setSpeedY(-initialSpeed)
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
          x:{x}, y:{y}
        </div>
        <div
          style={{
            position: 'relative',
            outline: '1px solid green',
            height: '250px',
            margin: '5px',
          }}
          ref={e => {
            if (e) {
              let rect = e.getBoundingClientRect()
              setOffsetX(rect.left)
              setOffsetY(rect.top)
            }
          }}
        >
          <img
            onMouseOver={onTouch}
            // onMouseMove={onTouch}
            style={{
              width: '64px',
              position: 'absolute',
              top: y - 32 + 'px',
              left: x - 32 + 'px',
            }}
            src="/assets/icon/icon-alpha.png"
          ></img>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Tab2
