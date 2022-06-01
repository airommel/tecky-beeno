function greet() {
  console.log('I am', this.name)
}

let peter = {
  name: 'Peter',
  greet,
}
let mary = {
  name: 'Peter',
  greet,
}

greet()

peter.greet()
mary.greet()

