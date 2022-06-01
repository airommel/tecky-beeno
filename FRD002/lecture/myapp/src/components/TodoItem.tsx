import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Modal from 'react-bootstrap/Modal'

export type TodoItem = {
  id: number
  text: string
}

export function TodoItem(props: {
  todoItem: TodoItem
  onEdit: (text: string) => void
  onDelete: () => void
}) {
  const { text } = props.todoItem
  const [isDone, setIsDone] = useState(false)
  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const [draftText, setDraftText] = useState('')
  const [shouldShowModal, setShouldShowModal] = useState(false)
  const startEdit = () => {
    setMode('edit')
    setDraftText(text)
  }
  const saveEdit = () => {
    setMode('view')
    props.onEdit(draftText)
  }
  const deleteItem = () => {
    setShouldShowModal(true)
  }
  const hideModal = () => {
    setShouldShowModal(false)
  }
  return (
    <>
      <Modal show={shouldShowModal} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Delete Item Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>This action cannot be reversed.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={props.onDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <InputGroup className="">
        <ButtonGroup>
          <Button variant="danger" onClick={deleteItem}>
            Delete
          </Button>
          {mode == 'view' ? (
            <button className="btn btn-primary" onClick={startEdit}>
              Edit
            </button>
          ) : mode == 'edit' ? (
            <Button variant="success" onClick={saveEdit}>
              Save
            </Button>
          ) : null}
        </ButtonGroup>

        <Form.Check
          className="d-flex justify-content-center flex-column p-2"
          checked={isDone}
          onChange={e => setIsDone(e.currentTarget.checked)}
        ></Form.Check>
        {mode === 'view' ? (
          <div className="d-flex justify-content-center flex-column p-2">
            {!isDone ? text : <s>{text}</s>}
          </div>
        ) : mode === 'edit' ? (
          <FormControl
            type="text"
            value={draftText}
            onChange={e => setDraftText(e.currentTarget.value)}
          ></FormControl>
        ) : (
          <span>Unknown mode: {mode}</span>
        )}
      </InputGroup>
    </>
  )
}
