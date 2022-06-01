import fs from 'fs'

let now = new Date()

console.log(now.toString())

let line = now.toString() + '\n'

fs.writeFile(
  'check-in.log',
  line,
  {
    flag: 'a',
  },
  error => {
    if (error) {
      console.error('Failed to append file, error:', error)
      return
    }

    console.log('done.')
  },
)
