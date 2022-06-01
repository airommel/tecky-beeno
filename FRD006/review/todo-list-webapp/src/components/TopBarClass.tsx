import React from 'react'
import { connect, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from '../redux/state'
import { nextThemeAction } from '../redux/theme/action'
import { ThemeType } from '../redux/theme/state'
import { Button } from './Button'

export class TopBar extends React.Component<{
  n: number
  c: number
  theme: ThemeType
  nextTheme: () => void
}> {
  render() {
    const { n, c, theme, nextTheme } = this.props
    return (
      <div>
        <b>Top Bar CC (from props)</b>
        <div>{n} items in list</div>
        <div>{c} counts in total</div>
        <Button onClick={nextTheme}>theme: {theme}</Button>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const n = state.todoList.items.length
  const c = state.todoList.items.reduce((sum, item) => sum + item.count, 0)
  const theme = state.theme.theme
  return { n, c, theme }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { nextTheme: () => dispatch(nextThemeAction()) }
}

export const ConnectedTopBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBar)

export default ConnectedTopBar
