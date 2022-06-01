import { IonText } from '@ionic/react'

export function ErrorMessage(props: { message?: string }) {
  return (
    <p hidden={!props.message}>
      <IonText color="danger">{props.message}</IonText>
    </p>
  )
}
