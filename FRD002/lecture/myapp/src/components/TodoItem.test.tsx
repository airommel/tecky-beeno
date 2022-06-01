import { render, screen } from '@testing-library/react'
import { TodoItem } from './TodoItem'

describe('TodoItem TestSuit', () => {
  let onDelete: jest.Mock
  let onEdit: jest.Mock
  let todoItem: TodoItem

  beforeEach(() => {
    onDelete = jest.fn()
    onEdit = jest.fn()
    todoItem = {
      id: 1,
      text: 'buy milk',
    }
    render(<TodoItem todoItem={todoItem} onDelete={onDelete} onEdit={onEdit} />)
  })

  it('should display delete button', () => {
    let button = screen.getByText('Delete')
    expect(button).toBeInTheDocument()
  })

  it('should not fire deleteItem event without confirmation', () => {
    let button = screen.getByText('Delete')
    button.click()
    expect(onDelete).not.toBeCalled()
  })

  it('should show confirmation modal after click delete button', () => {
    let button = screen.getByText('Delete')
    button.click()
    let modal = screen.getByText('Delete Item Confirmation')
    expect(modal).toBeInTheDocument()
  })

  it('should fire deleteItem event after confirmation', () => {
    let deleteButton = screen.getByText('Delete')
    deleteButton.click()
    let confirmButton = screen.getByText('Confirm Delete')
    confirmButton.click()
    expect(onDelete).toBeCalled()
  })
})
