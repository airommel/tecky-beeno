import { findFactors } from "./01-factor"

function testFindFactors(x: number, expectedResult: number[]) {
  let actualResult = findFactors(x)
  if (JSON.stringify(actualResult) == JSON.stringify(expectedResult)) {
    console.log('PASS:', x)
  } else {
    console.log(
      'FAIL:',
      x,
      'expected:',
      expectedResult,
      'actual:',
      actualResult,
    )
  }
}

testFindFactors(1, [1])
testFindFactors(2, [1, 2])
testFindFactors(3, [1, 3])
testFindFactors(4, [1, 2, 4])
testFindFactors(5, [1, 5])
testFindFactors(10, [1, 2, 5, 10])
testFindFactors(0, [0, 1, -1, -2, 2])
testFindFactors(-1, [-1, 1])
