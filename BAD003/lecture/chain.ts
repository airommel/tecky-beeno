export class NumberChain {
  constructor(private value: number) {}
  add(amount: number) {
    return new NumberChain(this.value + amount)
  }
  minus(amount: number) {
    return new NumberChain(this.value - amount)
  }
}

let chain1 = new NumberChain(0)
let chain2A = chain1.add(10)
let chain3 = chain2A.add(5)

let chain2B = chain1.minus(7)

console.log({
  chain1,
  chain2A,
  chain2B,
  chain3,
})
