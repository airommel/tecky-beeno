let users = new Map()

users.set('apple', { id: 1, name: 'apple', price: 3 })
users.set('banana', { id: 2, name: 'banana', price: 4 })

console.log('keys:', users.keys())

for (let key of users.keys()) {
  console.log(key, '=>', users.get(key))
}

console.log('values:', users.values())

for (let entry of users.entries()) {
  console.log(entry[0], '->', entry[1])
}

console.log(Array.from(users.keys()).map)
