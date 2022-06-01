function set(optlist, key, value) {
  optlist.push([key, value])
}

function get(optlist, key) {
  for (let opt of optlist) {
    if (opt[0] == key) {
      return opt[1]
    }
  }
}

let user = []

set(user, 'name', 'alice')
set(user, 'age', 23)

console.log('user:', user)

console.log('user.name:', get(user, 'name'))

set(user, 'name', 'alice wong')
console.log('user.name:', get(user, 'name'))

function put(optlist, key) {
  set(optlist, key, 1)
}
function has(optlist, key) {
  return get(optlist, key) == 1
}

// console.log('has name?', has(user, 'name'))

// put(user, 'winner')
// console.log('has won?', has(user, 'winner'))

// console.log('has lose?', has(user, 'loser'))

let emailSet = []
put(emailSet, 'alice@gmail.com')

console.log('is alice@gmail.com used?', has(emailSet, 'alice@gmail.com'))
console.log('is bob@gmail.com used?', has(emailSet, 'bob@gmail.com'))
