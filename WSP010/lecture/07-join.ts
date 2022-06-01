import { config } from 'dotenv'
import { Client } from 'pg'

export type Teacher = {
  id: number
  name: string
  subjectList: Subject[]
}

export type Subject = {
  id: number
  name: string
}

config()

let fields = ['DB_USER', 'DB_PASSWORD', 'DB_NAME']
for (let field of fields) {
  if (!process.env[field]) {
    throw new Error(`missing '${field}' in env`)
  }
}

let client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

client.connect()

async function main() {
  await loadTeacherList()
  await client.end()
}

if (process.argv[1] == __filename) {
  main()
}

export async function loadTeacherList() {
  type Row = {
    teacher_id: number
    teacher_name: string
    subject_id: number
    subject_name: string
  }

  let result = await client.query<Row>(/* sql */ `
	select
	  teacher.id as teacher_id
	, teacher.name as teacher_name
	, subject.id as subject_id
	, subject.name as subject_name
	from teacher
	left join teaching on teaching.teacher_id = teacher.id
	left join subject on subject.id = teaching.subject_id
	`)
  // console.log(result.rows)

  let teacherList: Teacher[] = []
  let subjectList: Subject[] = []

  for (let row of result.rows) {
    let teacher = teacherList[row.teacher_id]
    let subject = subjectList[row.subject_id]
    if (!teacher) {
      teacher = {
        id: row.teacher_id,
        name: row.teacher_name,
        subjectList: [],
      }
      teacherList[row.teacher_id] = teacher
    }
    if (row.subject_id) {
      if (!subject) {
        subject = {
          id: row.subject_id,
          name: row.subject_name,
        }
        subjectList[row.subject_id] = subject
      }
      teacher.subjectList.push(subject)
    }
    // console.log({ teacher, subject })
  }
  // console.log({ teacherList, subjectList })

  console.log('before filter:', teacherList)
  teacherList = teacherList.filter(teacher => teacher)
  console.log('after filter:', teacherList)

  console.log('each teacher >>>')
  teacherList.forEach(teacher => {
    console.log('teacher name:', teacher.name)
  })
  // for (let teacher of teacherList) {
  //   console.log('teacher name:', teacher.name)
  // }
  console.log('each teacher <<<')

  let nameList = teacherList.map(teacher => teacher.name)
  let json = JSON.stringify(nameList)
  nameList = JSON.parse(json)
  console.log('teacher name list:', nameList)
  console.log('each name >>>')
  nameList.forEach(name => {
    console.log('teacher name:', name)
  })
  console.log('each name <<<')

  return teacherList
}
