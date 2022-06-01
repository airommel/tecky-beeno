let cart = [
  {
    name: 'Apple',
    price: 3,
    quantity: 2,
  },
  {
    name: 'Banana',
    price: 5,
    quantity: 3,
  },
  {
    name: 'Cherry',
    price: 9,
    quantity: 4,
  },
]

function sum(a, b) {
  return a + b
}

// let totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
let totalPrice = cart.map(item => item.price * item.quantity).reduce(sum)

console.log('totalPrice:', totalPrice)
