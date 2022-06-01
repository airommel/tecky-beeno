import React, { useState } from "react"

const ChildFC = (props: { theme: string }) => {
  let now = new Date().toLocaleString()
  return (
    <fieldset>
      <legend>FC child</legend>
      <p>render time: {now}</p>
      <p>theme {props.theme}</p>
    </fieldset>
  )
}
// export default ChildFC
// export default React.memo(ChildFC)
const MemoChildFC = React.memo(ChildFC)

class ChildCC extends React.PureComponent<{ theme: string }> {
  render() {
    let now = new Date().toLocaleString()
    return (
      <fieldset>
        <legend>CC child</legend>
        <p>render time: {now}</p>
        <p>theme {this.props.theme}</p>
      </fieldset>
    )
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState('normal')
  const inc = () => {
    setCount(count + 1)
  }
  let now = new Date().toLocaleString()
  return (
    <div className="App">
      <fieldset>
        <legend>parent</legend>
        <button onClick={inc}>inc</button>
        <p>count = {count}</p>
        <p>render time: {now}</p>
      </fieldset>
      <MemoChildFC theme={theme} />
      <ChildCC theme={theme} />
      <fieldset>
        <legend>theme</legend>
        <button onClick={() => setTheme('normal')}>normal</button>
        <button onClick={() => setTheme('bold')}>bold</button>
      </fieldset>
    </div>
  )
}

export default App
