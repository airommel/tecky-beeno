import React from 'react'

export class ClassDemo extends React.Component<{ style?: object }> {
  state = {
    count: 0,
    name: '',
    range: 0,
  }

  // props = {
  //   style: {},
  // }

  // constructor(props) {
  //   super(props)
  //   this.props.props
  // }

  inc = () => {
    // this.state.count++
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <div className="counter" style={this.props.style}>
        <h1>Class Component Demo</h1>
        value: {this.state.count}
        <button onClick={this.inc}>+1</button>
        <div>
          onInput:
          <input
            type="text"
            onInput={e => this.setState({ name: e.currentTarget.value })}
            value={this.state.name}
          />
          onChange:
          <input
            type="text"
            onChange={e => this.setState({ name: e.currentTarget.value })}
            value={this.state.name}
          />
          onchange Real?:
          <input
            type="text"
            ref={input => {
              input?.addEventListener('change', event => {
                console.log('onchange:', input, input.value)
                this.setState({ name: input.value })
              })
            }}
            // value={name}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={this.state.range}
            onChange={e =>
              this.setState({ range: e.currentTarget.valueAsNumber })
            }
          />
        </div>
        <p>
          Hi, {this.state.name} ({this.state.range})
        </p>
        <p>Welcome back, {this.state.name}</p>
      </div>
    )
  }
}
