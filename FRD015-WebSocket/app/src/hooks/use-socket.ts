import { useEffect, useMemo, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { env } from '../env'

export function useSocket(initFn: (socket: Socket) => void) {
  const socket = useMemo(() => io(env.API_ORIGIN), [])
  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected')
      initFn(socket)
    })
    return () => {
      socket.disconnect()
    }
  }, [socket])
  return { socket }
}
