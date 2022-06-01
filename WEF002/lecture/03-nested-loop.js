const peter = {
  name: 'Peter',
  age: 50,
  students: [
    { name: 'Andy', age: 20 },
    { name: 'Bob', age: 23 },
    {
      name: 'Charlie',
      age: 25,
      exercises: [
        { score: 60, date: new Date('2019-01-05'), name: 'English' },
        { score: 62, date: new Date('2019-01-05'), name: 'Chinese' },
      ],
    },
  ],
}

for (let student of peter.students) {
  if (student.exercises) {
    for (let exercise of student.exercises) {
      console.log(
        `Student ${student.name} has ${exercise.score} score on ${exercise.name}`,
      )
      // console.log(`Student \${student.name}`)
      // console.log('Beeno\'s file')
    }
  } else {
    console.log(`Student ${student.name} has no exercises`)
  }
}
