export type ThemeState = {
  theme: ThemeType
  styles: ThemeStyles
}

export type ThemeStyles = {
  textColor: string
  backgroundColor: string
}

export type ThemeType = 'dark' | 'light' | 'retro'

export const ThemeTypes: ThemeType[] = ['dark', 'light', 'retro']

export const ThemeStyles: Record<ThemeType, ThemeStyles> = {
  dark: {
    backgroundColor: 'black',
    textColor: 'white',
  },
  light: {
    backgroundColor: 'white',
    textColor: 'black',
  },
  retro: {
    backgroundColor: 'black',
    textColor: 'lightgreen',
  },
}
