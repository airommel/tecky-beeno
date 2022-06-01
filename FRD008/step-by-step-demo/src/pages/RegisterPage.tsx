import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from '@ionic/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { APIResult } from '../components/APIResult'
import { registerAction } from '../redux/auth/action'
import { RootState } from '../redux/state'
import { routes } from '../routes'
import './RegisterPage.css'

type FormState = {
  username: string
  password: string
  confirm_password: string
}

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch()
  const [presentAlert] = useIonAlert()
  const result = useSelector((state: RootState) => state.auth.registerResult)
  const [formState, setFormState] = useState<FormState>({
    username: '',
    password: '',
    confirm_password: '',
  })
  const messages = {
    username:
      formState.username.length < 3
        ? 'username should be at least 3 letters'
        : '',
    password:
      formState.password.length < 8
        ? 'password should be at least 8 letters'
        : '',
    confirm_password:
      formState.confirm_password !== formState.password
        ? 'password not matched'
        : '',
  }
  function getHintField() {
    for (let [key, value] of Object.entries(formState)) {
      const field = key as keyof FormState
      const validateMessage = messages[field]
      if (!value || validateMessage) {
        return field
      }
    }
  }
  const hintField = getHintField()

  const submit = () => {
    console.log('submit formState:', formState)
    const invalidMessage = Object.values(messages).find(
      message => message.length > 0,
    )
    if (invalidMessage) {
      presentAlert(invalidMessage, [{ text: 'Dismiss', role: 'cancel' }])
      return
    }
    dispatch(registerAction(formState))
  }

  const renderField = (props: {
    field: keyof FormState
    inputType: 'text' | 'password'
  }) => {
    const { field, inputType } = props
    const validateMessage = messages[field]
    const value = formState[field]
    const title = field
      .split('_')
      .map(word => word[0].toLocaleUpperCase() + word.slice(1))
      .join(' ')
    return (
      <>
        <IonItem>
          <IonLabel
            color={
              !value
                ? hintField === field
                  ? 'primary'
                  : undefined
                : validateMessage
                ? 'danger'
                : undefined
            }
            position="floating"
          >
            {title}
          </IonLabel>
          <IonInput
            type={inputType}
            value={value}
            onIonChange={e =>
              setFormState({ ...formState, [field]: e.detail.value || '' })
            }
          ></IonInput>
        </IonItem>
        <IonText color={!value ? 'medium' : 'danger'}>
          {validateMessage}
        </IonText>
      </>
    )
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Register</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {renderField({ field: 'username', inputType: 'text' })}
          {renderField({ field: 'password', inputType: 'password' })}
          {renderField({ field: 'confirm_password', inputType: 'password' })}
        </IonList>
        <IonButton expand="block" onClick={submit}>
          Submit
        </IonButton>
        <APIResult result={result} />

        <p>
          Already registered? <Link to={routes.login}>Go to Login Page</Link>
        </p>
      </IonContent>
    </IonPage>
  )
}

export default RegisterPage
