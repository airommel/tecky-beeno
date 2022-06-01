import Data from 'react-any-data'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/state'

export function TodoDetail() {
  const item = useSelector((state: RootState) =>
    state.selectedItemId
      ? state.list.find(item => item.id === state.selectedItemId)
      : null,
  )
  const tickItem = () => {
    console.log('TODO: tickItem')
  }
  return item ? (
    <div>
      <h2>Todo Detail</h2>
      <Data readOnly={true} state={{ item }} name="item" />
      <button onClick={tickItem}>tick</button>
    </div>
  ) : null
}
