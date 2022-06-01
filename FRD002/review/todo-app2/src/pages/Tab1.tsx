import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { addOutline, createOutline, saveOutline } from 'ionicons/icons'
import { useState } from 'react'
import './Tab1.css'

export type TodoItem = {
  id: number
  text: string
  is_done?: boolean
  count?: number
}

const TodoListTab: React.FC = () => {
  const [saveCount, setSaveCount] = useState(0)
  const [list, setList] = useState<TodoItem[]>([
    { id: 1, text: 'buy milk' },
    { id: 2, text: 'buy banana' },
    { id: 3, text: 'buy apple pie' },
    { id: 4, text: 'buy apple iPhone' },
    { id: 5, text: 'buy Google Android Phone' },
    { id: 6, text: 'buy a Linux Laptop with large screen' },
    {
      id: 7,
      text: 'buy a Linux Laptop with large screen for web UI development',
    },
  ])
  const updateItem = (idx: number, item: TodoItem) => {
    const newList = [...list]
    newList[idx] = item
    setList(newList)
  }
  const saveAll = () => {
    setSaveCount(saveCount + 1)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Todo App</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={saveAll}>
              <IonIcon icon={saveOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonNote hidden>{JSON.stringify(list)}</IonNote>
        <IonList>
          <IonListHeader>
            Total: {list.length}; Done:{' '}
            {list.filter(item => item.is_done).length}
          </IonListHeader>

          {list.map((item, idx) => (
            <TodoItem
              key={item.id}
              saveCount={saveCount}
              todoItem={item}
              updateItem={item => updateItem(idx, item)}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

const TodoItem = (props: {
  saveCount: number
  todoItem: TodoItem
  updateItem: (item: TodoItem) => void
}) => {
  const { todoItem, updateItem, saveCount } = props
  const { text, is_done } = props.todoItem
  const [isEdit, setIsEdit] = useState(false)
  const [lastSaveCount, setLastSaveCount] = useState(saveCount)
  const [ionItemSliding, setIonItemSliding] =
    useState<HTMLIonItemSlidingElement | null>(null)

  const maxLength = 50
  const textPart =
    text.length > maxLength ? text.slice(0, maxLength) + ' ...' : text

  if (saveCount > lastSaveCount) {
    setIsEdit(false)
    setLastSaveCount(saveCount)
  }

  const startEdit = () => {
    setIsEdit(true)
    ionItemSliding?.close()
  }

  return (
    <IonItemSliding ref={setIonItemSliding}>
      <IonItem>
        <IonCheckbox
          slot="start"
          checked={is_done}
          onIonChange={e =>
            updateItem({ ...todoItem, is_done: e.detail.checked })
          }
        ></IonCheckbox>
        {isEdit ? (
          // <IonInput
          //   value={text}
          //   onIonChange={e =>
          //     updateItem({ ...todoItem, text: e.detail.value || '' })
          //   }
          // />
          <IonTextarea
            value={text}
            autoGrow
            autocapitalize=""
            onIonChange={e =>
              updateItem({ ...todoItem, text: e.detail.value || '' })
            }
          />
        ) : (
          <IonLabel
            className="ion-text-wrap"
            style={{ fontSize: calcTodoTextFontSize(textPart) + 'rem' }}
          >
            {is_done ? <s>{textPart}</s> : textPart}{' '}
            {todoItem.count ? 'x' + todoItem.count : null}
          </IonLabel>
        )}
        <IonButtons slot="end">
          {isEdit ? (
            <IonButton
              color="success"
              size="small"
              onClick={() => setIsEdit(false)}
            >
              <IonIcon icon={saveOutline}></IonIcon>
            </IonButton>
          ) : (
            <>
              <IonButton
                size="small"
                onClick={() =>
                  updateItem({ ...todoItem, count: (todoItem.count || 0) + 1 })
                }
              >
                <IonIcon icon={addOutline}></IonIcon>
              </IonButton>
            </>
          )}
        </IonButtons>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption>
          <IonButtons>
            <IonButton color="light" size="small" onClick={startEdit}>
              <IonIcon slot="icon-only" icon={createOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  )
}

function calcTodoTextFontSize(text: string): number {
  let n = text.length
  let size = 1.5
  while (n > 5) {
    size *= 0.97
    n -= 5
  }
  return size
}

export default TodoListTab
