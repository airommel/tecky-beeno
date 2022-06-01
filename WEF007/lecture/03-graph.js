let alice = {
  name: 'alice',
  following: [],
}

let bob = {
  name: 'bob',
  following: [],
}

let charlie = {
  name: 'charlie',
  following: [],
}

alice.following.push(bob)

alice.following.push(charlie)
bob.following.push(charlie)

let dave = {
  name: 'dave',
  like: alice,
}

let eve = {
  name: 'eve',
  like: dave,
}

let frank = {
  name: 'frank',
  hate: alice,
  like: dave,
}
