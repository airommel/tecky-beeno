import React from 'react'
import { connect, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from '../redux/state'
import { nextThemeAction } from '../redux/theme/action'
import { ThemeType } from '../redux/theme/state'
import { Button } from './Button'

export class TopBar extends React.Component<{
  stats:
    | 'loading'
    | {
        n: number
        c: number
      }
  theme: ThemeType
  nextTheme: () => void
}> {
  render() {
    const { stats, theme, nextTheme } = this.props
    return (
      <div>
        <b>Top Bar CC (from props)</b>
        {stats === 'loading' ? (
          <p>Loading Todo List Stats</p>
        ) : (
          <>
            <div>{stats.n} items in list</div>
            <div>{stats.c} counts in total</div>
          </>
        )}
        <Button onClick={nextTheme}>theme: {theme}</Button>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const items = state.todoList.list
  const stats =
    items === 'loading' || !items
      ? 'loading' as const
      : {
          n: items.length,
          c: items.reduce((sum, item) => sum + item.count, 0),
        }
  const theme = state.theme.theme
  return { stats, theme }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { nextTheme: () => dispatch(nextThemeAction()) }
}

export const ConnectedTopBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBar)

export default ConnectedTopBar
