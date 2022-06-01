import { SharedState } from '../shared/state'
import Data from 'react-any-data'

export function TodoDetail(props: {
  item: SharedState.TodoDetail
  tickItem: () => void
}) {
  const { item, tickItem } = props
  return (
    <div>
      <h2>Todo Detail</h2>
      <Data readOnly={true} state={{ item }} name="item" />
      <button onClick={tickItem}>tick</button>
    </div>
  )
}
