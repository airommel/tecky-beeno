let color: string | number | Array<number> = 'red'
color = 'blue'
color = 255

let rgb: [number, number, number] = [1, 2, 3]

color = rgb

let codes = ['a', 'b', 'c']

// rgb = codes

rgb = [1, 2, 3]

// rgb = [1]

function multiply(a: number, b: number): number {
  return a * b
}

let c = multiply(2, 3)
let d = c + 50

console.log('d:', d)

function combine<T extends number | string | Array<any>>(a: T, b: T): T {
  // return ((a as number) + (b as number)) as T
  if (typeof a == 'number' && typeof b == 'number') {
    let c = a + b
    return c as T
  }
  if (typeof a == 'string' && typeof b == 'string') {
    let c = a + b
    return c as T
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    let c = a.concat(b)
    return c as T
  }
  throw new TypeError(
    'invalid type of a or b, expect number | string | Array, got: ' +
      typeof a +
      ' and ' +
      typeof b,
  )
}

console.log('1 + 2 = ', combine(1, 2))
console.log('a + b = ', combine('a', 'b'))
console.log('[1] + [2] = ', combine([1], [2]))

console.log('1 + a =', combine(1, 'a' as any))
