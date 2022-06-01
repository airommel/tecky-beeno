export type Person = {
  name: string
  age: number
}

export function guardBar(
  persons: Person[],
  filterFn: (person: Person) => boolean,
): Person[] {
  // return persons.filter(person => person.age >= 18)
  return persons.filter(filterFn)
	// return persons
}
