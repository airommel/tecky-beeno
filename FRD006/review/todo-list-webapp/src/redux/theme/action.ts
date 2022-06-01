import { ThemeType } from './state'

export function setThemeAction(type: ThemeType) {
  return {
    type: '@@Theme/setTheme' as const,
    themeType: type,
  }
}

export function nextThemeAction() {
  return { type: '@@Theme/nextTheme' as const }
}

export type ThemeActionType =
  | ReturnType<typeof setThemeAction>
  | ReturnType<typeof nextThemeAction>
