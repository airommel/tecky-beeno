import React from 'react'
import { connect, useSelector } from 'react-redux'
import { RootState } from '../redux/state'

export class TopBarCC extends React.Component<{
  n: number
  c: number
}> {
  render() {
    const { n, c } = this.props
    return (
      <div>
        <b>Top Bar CC (from props)</b>
        <div>{n} items in list</div>
        <div>{c} counts in total</div>
      </div>
    )
  }
}

export const FakeTopBar = () => {
  const n = useSelector((state: RootState) => state.list.length)
  const c = useSelector((state: RootState) =>
    state.list.reduce((sum, item) => sum + item.count, 0),
  )
  return <TopBarCC n={n} c={c} />
}

const mapStateToProps = (state: RootState) => {
  const n = state.list.length
  const c = state.list.reduce((sum, item) => sum + item.count, 0)
  return { n, c }
}

export const TopBar = connect(mapStateToProps)(TopBarCC)

export function TopBarFC() {
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
