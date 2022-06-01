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

function findStudentByName(name) {
  for (let student of peter.students) {
    if (student.name == name) {
      return student
    }
  }
}

let student = findStudentByName('Bob')
console.log('found student:', student)

console.log("Andy's age:", findStudentByName('Andy').age)
