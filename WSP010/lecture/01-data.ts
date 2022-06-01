export type Teacher = {
  name: string
  subjectList: Subject[]
}

export type Student = {
  name: string
  subjectList: Subject[]
}

export type Subject = {
  name: string
  teacher: Teacher
  studentList: Student[]
}

let alice: Teacher = {
  name: 'Alice',
  subjectList: [],
}

let bob: Student = {
  name: 'Bob',
  subjectList: [],
}

let coding: Subject = {
  name: 'Coding',
  teacher: alice,
  studentList: [bob],
}
alice.subjectList.push(coding)
bob.subjectList.push(coding)

console.log(alice)

let text = JSON.stringify(alice)
console.log(text)
