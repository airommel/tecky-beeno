import React, { useEffect, useState } from 'react'

export function FCCounter(props: { name: string }) {
  const [count, setCount] = useState(1)
  console.log('render')
  useEffect(() => {
    console.log('effect')
    let timer = setInterval(() => {
      setCount(count => {
        console.log('add one:', {
          name: props.name,
          count: count,
        })
        return count + 1
      })
    }, 1000)
    function cleanup() {
      console.log('stop timer')
      clearInterval(timer)
    }
    return cleanup
  }, [])
  console.log('return vdom')
  return (
    <div>
      {props.name}: {count}
    </div>
  )
}
