export type Teacher = {
  name: string
  age: number
  students: Array<Student>
}

export type Student = {
  name: string
  age: number
  exercises?: Array<Exercise>
}

// export type Student = {
//   name: number
// }

export type Exercise = {
  score: number
  date: Date
}

let peter: Teacher = {
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

for (let student of peter.students) {
  if (student.exercises) {
    console.log(student.name, 'has done', student.exercises.length, 'exercises')
  } else {
    console.log(student.name, 'has no exercises')
  }
}

let a = 1
let b = 2
let c = a + b
