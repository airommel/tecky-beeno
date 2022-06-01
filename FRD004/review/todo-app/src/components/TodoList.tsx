import {
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonInput,
  IonCheckbox,
} from '@ionic/react'
import { TodoState } from '../redux/state'

export function TodoList(props: { title: string; list: TodoState[] }) {
  return (
    <IonList>
      <IonListHeader>{props.title}</IonListHeader>
      {props.list.map(item => (
        <IonItem key={item.id}>
          <IonLabel slot="start">{item.date}</IonLabel>
          <IonInput value={item.title}></IonInput>
          <IonCheckbox slot="end" checked={item.is_done}></IonCheckbox>
        </IonItem>
      ))}
    </IonList>
  )
}
