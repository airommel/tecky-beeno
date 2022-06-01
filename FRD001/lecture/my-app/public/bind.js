class Component {
  state = {
    count: 0,
  }
  constructor() {
    // this.inc = this.inc.bind(this)
  }

  // inc() {
  //   console.log('this:', this)
  //   this.state.count++
  //   console.log('new count:', this.state.count)
  // }

  inc = () => {
    console.log('this:', this)
    this.state.count++
    console.log('new count:', this.state.count)
  }
  render() {
    return { tagName: 'div', attrs: { onClick: this.inc } }
    // return { tagName: 'div', attrs: { onClick: this.inc.bind(this) } }
    // return { tagName: 'div', attrs: { onClick: () => this.inc() } }
  }
}

let component = new Component()
let vdom = component.render()
console.log(vdom)
vdom.attrs.onClick()
