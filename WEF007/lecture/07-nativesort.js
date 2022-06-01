let numbers = [10, 20, 40, 120, 60, 80, 40, 20, 10, 50, 70, 123, 40, 120]

let users = numbers.map((score, i) => ({ id: i + 1, score }))

console.log('users:', users)

users.sort((a, b) => a.score - b.score)

console.log('users:', users)
