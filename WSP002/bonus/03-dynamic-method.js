class User {
  constructor(language, name) {
    this.name = name
    switchLanguage(this, language)
    // this.greet = this.greet.bind(this)
  }
  reportName = () => {
    this.greet()
  }
  setName = name => {
    this.name = name
  }
}

function switchLanguage(user, language) {
  switch (language) {
    case 'En':
      user.greet = function () {
        console.log('this:', this)
        console.log('Hi, I am', this.name)
      }
      break
    case 'Ha':
      user.greet = () => {
        console.log('this:', this)
        console.log('Halo, I am', this.name)
      }
  }
}

// let user1 = new User('En', 'Alice')
// let user2 = new User('Ha', 'Bob')

// user1.greet()
// user2.greet()

let user = new User('En', 'Alice')
setInterval(user.reportName, 1000)
setTimeout(() => {
  user.name = 'Alex'
}, 2000)
