import { useEffect } from 'react'
import React from 'react'

export function useMount(fn: React.EffectCallback) {
  useEffect(fn, [])
}
