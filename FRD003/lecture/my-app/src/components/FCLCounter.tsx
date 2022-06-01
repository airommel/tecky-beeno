import React, { useEffect, useState } from 'react'
import { useMount } from '../hooks/useMount'
import { useUnmount } from '../hooks/useUnMount'
import { useUpdate } from '../hooks/useUpdate'

export function FCLCounter(props: { name: string }) {
  const { name } = props
  const [count, setCount] = useState(1)
  let timer: any
  console.log('render:', { name, count, timer })
  useMount(() => {
    console.log('effect init:', { name, count, timer })
    timer = setInterval(() => {
      setCount(count => {
        console.log('add one:', {
          name: props.name,
          count: count,
        })
        return count + 1
      })
    }, 1000)
    console.log('effect finish:', { name, count, timer })
  })
  useUnmount(() => {
    console.log('stop timer:', { name, count, timer })
    clearInterval(timer)
  })
  useUpdate(() => {
    console.log('updated:', { name, count, timer })
  })
  console.log('return vdom')
  return (
    <div>
      {props.name}: {count}
    </div>
  )
}
