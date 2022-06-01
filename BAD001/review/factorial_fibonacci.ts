export function factorial(num: number): number {
  if (num < 0 && !Number.isInteger(num)) {
    throw new Error('n should be NON-NEGATIVE INTEGER')
  }
  if (num < 0) {
    throw new Error('n should be NON-NEGATIVE integer')
  }
  if (!Number.isInteger(num)) {
    throw new Error('n should be non-negative INTEGER')
  }
  if (num == 0 || num == 1) {
    return 1
  }
  return factorial(num - 1) * num
}

export function fibonacci_slow(num: number): number {
  if (num == 0) {
    return 0
  }
  if (num == 1 || num == 2) {
    return 1
  }
  return fibonacci_slow(num - 1) + fibonacci_slow(num - 2)
}

// num -> value
let cache: number[] = []
export function fibonacci_with_cache(num: number): number {
  if (num == 0) {
    return 0
  }
  if (num == 1 || num == 2) {
    return 1
  }
  if (num in cache) {
    return cache[num]
  }
  let value = fibonacci_with_cache(num - 1) + fibonacci_with_cache(num - 2)
  cache[num] = value
  return value
}

export function fibonacci_with_loop(num: number): number {
  if (num == 0) {
    return 0
  }
  if (num == 1 || num == 2) {
    return 1
  }
  let a = 1
  let b = 1
  for (let i = 3; ; i++) {
    let c = a + b
    if (i == num) {
      return c
    }
    a = b
    b = c
  }
}

// export const fibonacci = fibonacci_slow
export const fibonacci = fibonacci_with_cache
// export const fibonacci = fibonacci_with_loop

// F(20) = F(19) + F(18)
// F(20) = F(18) + F(17) + F(18)
// F(20) = F(18) + F(17) + F(17) + F(16)
// F(20) = F(17) + F(16) + F(17) + F(17) + F(16)
