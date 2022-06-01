export function findFactors(x: number): number[] {
  if (parseInt(x as any) != x) {
    throw new Error('x should be integer')
  }
  if (x < 1) {
    throw new Error('x should be non-zero positive integer')
  }
  let factors: number[] = []
  for (let i = 1; i <= x; i++) {
    if (x % i == 0) {
      factors.push(i)
    }
  }
  return factors
}

// export const findFactors = {
//   findForInteger: (x: number): number[] => {
//     if (x < 1) {
//       throw new Error('x should be non-zero positive integer')
//     }
//     let factors: number[] = []
//     for (let i = 1; i <= x; i++) {
//       if (x % i == 0) {
//         factors.push(i)
//       }
//     }
//     return factors
//   },
// }
