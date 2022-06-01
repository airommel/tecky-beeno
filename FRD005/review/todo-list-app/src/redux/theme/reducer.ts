import { ThemeActionType } from './action'
import { ThemeState, ThemeTypes, ThemeStyles } from './state'

const initialState: ThemeState = {
  theme: 'light',
  styles: ThemeStyles.light,
}

export const themeReducer = (
  state: ThemeState = initialState,
  action: ThemeActionType,
): ThemeState => {
  // console.log('themeReducer, action', action)
  switch (action.type) {
    case '@@Theme/setTheme':
      return {
        theme: action.themeType,
        styles: ThemeStyles[action.themeType],
      }
    case '@@Theme/nextTheme': {
      let index = ThemeTypes.indexOf(state.theme)
      let newIndex = (index + 1) % ThemeTypes.length
      let newTheme = ThemeTypes[newIndex]
      let newStyles = ThemeStyles[newTheme]
      return {
        theme: newTheme,
        styles: newStyles,
      }
    }
    default:
      return state
  }
}
