import { IonText } from '@ionic/react'
import { APIResultType } from '../redux/auth/state'

export function APIResult(props: { result: APIResultType }) {
  const { result } = props
  return (
    <>
      {result.type !== 'fail' ? null : (
        <p>
          <IonText color={result.type === 'fail' ? 'danger' : 'primary'}>
            {result.message}
          </IonText>
        </p>
      )}
    </>
  )
}
