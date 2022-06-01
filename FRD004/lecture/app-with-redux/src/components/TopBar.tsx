import { useSelector } from 'react-redux'
import { RootState } from '../redux/state'

export function TopBar() {
  const n = useSelector((state: RootState) => state.list.length)
  const c = useSelector((state: RootState) =>
    state.list.reduce((sum, item) => sum + item.count, 0),
  )
  return (
    <div>
      <b>Top Bar</b>
      <div>{n} items in list</div>
      <div>{c} counts in total</div>
    </div>
  )
}
