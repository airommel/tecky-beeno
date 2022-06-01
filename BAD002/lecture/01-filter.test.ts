import { guardBar, Person } from './01-filter'

test('filter with jest.fn()', () => {
  let filterFn = (person: Person): boolean => {
    return person.age >= 1.8
  }
	let mockFilterFn = jest.fn(filterFn)
  expect(
    guardBar(
      [
        { name: 'Alice', age: 17 },
        { name: 'Bob', age: 18 },
        { name: 'Charlie', age: 19 },
      ],
      mockFilterFn,
    ),
  ).toEqual([
    { name: 'Alice', age: 17 },
    { name: 'Bob', age: 18 },
    { name: 'Charlie', age: 19 },
  ])
	expect(mockFilterFn).toBeCalledTimes(3)
})
