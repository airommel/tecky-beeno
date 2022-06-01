import React from 'react'

export class ClassCounter extends React.Component<{ name: string }> {
  state = {
    count: 1,
  }

  timer?: any

  componentDidMount() {
    console.log('componentDidMount:', this.state)
    this.timer = setInterval(() => {
      console.log('add one:', {
        name: this.props.name,
        count: this.state.count,
      })
      this.setState({ count: this.state.count + 1 })
    }, 1000)
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate:', this.state)
    return this.state.count % 2 == 0
  }

  componentWillUnmount() {
    console.log('componentWillUnmount:', this.state)
    clearInterval(this.timer)
  }

  componentDidUpdate() {
    console.log('componentDidUpdate:', this.state)
  }

  render() {
    console.log('render:', this.state)
    return (
      <div>
        {this.props.name}: {this.state.count}
      </div>
    )
  }
}
