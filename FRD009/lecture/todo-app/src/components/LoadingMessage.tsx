import { IonProgressBar } from '@ionic/react'

export function LoadingMessage(props: { message?: string }) {
  return (
    <div hidden={!props.message}>
      <IonProgressBar type="indeterminate"> </IonProgressBar>
      {props.message}
    </div>
  )
}
