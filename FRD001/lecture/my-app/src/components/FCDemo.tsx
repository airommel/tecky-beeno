import { ChangeEvent, useState } from 'react'

export function FCDemo1(props: { style?: object }) {
  const [state, setState] = useState({ count: 0, name: '' })
  const inc = () => {
    setState({
      ...state,
      count: state.count + 1,
    })
  }
}

export function FCDemo(props: { style?: object }) {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [range, setRange] = useState(0)
  // let state = { count: 0, name: '', range: 0 }
  function inc() {
    // state.count++
    setCount(count + 1)
  }
  // function setName(event: ChangeEvent<HTMLInputElement>) {}
  // function setRange(event: ChangeEvent<HTMLInputElement>) {}
  return (
    <div className="counter" style={props.style}>
      <h1>Functional Component Demo</h1>
      value: {count}
      <button onClick={inc}>+1</button>
      <div>
        onInput:
        <input
          type="text"
          onInput={e => setName(e.currentTarget.value)}
          value={name}
        />
        onChange:
        <input
          type="text"
          onChange={e => setName(e.currentTarget.value)}
          value={name}
        />
        onchange Real?:
        <input
          type="text"
          ref={input => {
            input?.addEventListener('change', event => {
              console.log('onchange:', input, input.value)
              setName(input.value)
            })
          }}
          // value={name}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={range}
          onChange={e => setRange(e.currentTarget.valueAsNumber)}
        />
      </div>
      <p>
        Hi, {name} ({range})
      </p>
      <p>Welcome back, {name}</p>
    </div>
  )
}
