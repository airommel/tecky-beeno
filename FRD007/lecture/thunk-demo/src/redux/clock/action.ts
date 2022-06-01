export function setClockTimeAction(now: number) {
  return {
    type: '@@Clock/setClockTime' as const,
    now,
  }
}

export function setClockTimerAction(timer: any) {
  return {
    type: '@@Clock/setClockTimer' as const,
    timer,
  }
}

export type ClockActionType =
  | ReturnType<typeof setClockTimeAction>
  | ReturnType<typeof setClockTimerAction>
