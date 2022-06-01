import { IonSpinner } from '@ionic/react'

export function LoadingMessage(props: { name: string }) {
  return (
    <p>
      Loading {props.name} ...
      <IonSpinner />
    </p>
  )
}
