const peter = {
  name: 'Peter',
  age: 50,
  students: [
    { name: 'Andy', age: 20 },
    { name: 'Bob', age: 23 },
    {
      name: 'Charlie',
      age: 25,
      exercises: [{ score: 60, date: new Date('2019-01-05') }],
    },
  ],
}

console.log('peter:')
console.dir(peter, { depth: 20 })

for (let student of peter.students) {
  console.log()
  // console.log('student:', student)
  console.log('student.name:', student.name)
  let exercises = student.exercises || []
  // console.log('exercises:', exercises)
  console.log('number of exercise:', exercises.length)
}
