let fs = require('fs')

let code = ''

code += 'export type Hour = 0'
for (let hour = 1; hour <= 23; hour++) {
  code += ' | ' + hour
}

code += '\nexport type Minute = 0'
for (let minute = 1; minute <= 59; minute++) {
  code += ' | ' + minute
}

fs.writeFile('types.ts', code, () => {
  console.log('saved to types.ts')
})
