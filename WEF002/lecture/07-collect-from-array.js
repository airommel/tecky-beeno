const peter = {
  name: 'Peter',
  age: 50,
  students: [
    {
      name: 'Andy',
      age: 20,
      exercises: [
        {
          name: 'English',
          score: 60,
          date: new Date('2018-10-01'),
        },
      ],
    },
    {
      name: 'Bob',
      age: 23,
      exercises: [
        { name: 'English', score: 76, date: new Date('2019-01-05') },
        { name: 'Chinese', score: 55, date: new Date('2018-11-05') },
      ],
    },
    {
      name: 'Charlie',
      age: 25,
      exercises: [{ name: 'English', score: 60, date: new Date('2019-01-05') }],
    },
  ],
}

const allExercises = []
for (let student of peter.students) {
  for (let exercise of student.exercises) {
    allExercises.push({
      student: student.name,
      subject: exercise.name,
      score: exercise.score,
    })
  }
}

console.log('all exercises:', allExercises)
