import React, { useState, useMemo } from 'react'

function fib(n: number): number {
  if (n == 0) {
    return 0
  }
  if (n == 1) {
    return 1
  }
  let output = fib(n - 1) + fib(n - 2)
  return output
}

function render(
  name: string,
  state: { theme: string; n: number },
  methods: {
    setN: (n: number) => void
    setTheme: (theme: string) => void
  },
  derived: { output: number; fibUsed: number; renderUsed: number },
) {
  const { theme, n } = state
  const { setN, setTheme } = methods
  const { output, fibUsed, renderUsed } = derived

  return (
    <div className={'App ' + theme}>
      <p>name = {name}</p>
      <input
        type="range"
        min="0"
        max="40"
        value={n}
        onChange={e => setN(e.currentTarget.valueAsNumber)}
      ></input>
      <p>n = {n}</p>
      <p>output = {output}</p>
      <p>fib used = {fibUsed}</p>
      <p>render used = {renderUsed}</p>
      <button onClick={() => setTheme('dark')}>dark</button>
      <button onClick={() => setTheme('light')}>light</button>
    </div>
  )
}

class AppC extends React.Component {
  state = {
    n: 0,
    theme: 'light',
  }
  output = fib(this.state.n)
  fibUsed = 0
  renderUsed = 0
  setN = (n: number) => {
    let start = Date.now()
    this.output = fib(n)
    let end = Date.now()
    this.fibUsed = end - start
    this.setState({ n })
  }
  setTheme = (theme: string) => {
    this.setState({ theme })
  }
  render() {
    let start = Date.now()
    let end = Date.now()
    this.renderUsed = end - start
    return render('Class Component', this.state, this, this)
  }
}

function AppFC() {
  let start = Date.now()
  const [n, setN] = useState(0)
  const [theme, setTheme] = useState('light')
  const { output, fibUsed } = useMemo(() => {
    let start = Date.now()
    let output = fib(n)
    let end = Date.now()
    let fibUsed = end - start
    return { output, fibUsed }
  }, [n])
  let end = Date.now()
  let renderUsed = end - start
  return render(
    'FC',
    { n, theme },
    { setN, setTheme },
    { output, fibUsed, renderUsed },
  )
}

export default AppFC
