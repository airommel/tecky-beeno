class User {
  constructor(name) {
    this.name = name
  }
  greet() {
    console.log('I am', this.name)
  }
}

let peter = new User('Peter')
let mary = new User('Mary')
let charlie = new User('Charlie')

peter.greet()
mary.greet()

let greet = charlie.greet.bind(charlie)
greet()
mary.greet = greet.bind(mary)
mary.greet()
// setTimeout(charlie.greet.bind(charlie), 1000)
