const peter = {
  name: 'Peter',
  age: 50,
  students: [
    { name: 'Andy', age: 20, title: 'Mr' },
    { name: 'Bob', age: 23, title: 'She' },
    {
      name: 'Charlie',
      age: 25,
      title: 'Ms',
    },
  ],
}

for (let student of peter.students) {
  let reference = student.title + ' ' + student.name
  let reference2 = `${student.title} ${student.name}`
  console.log(
    `Student ${student.name}. ${reference} is ${student.age} years old`,
  )
}
