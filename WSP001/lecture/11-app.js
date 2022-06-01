let lib = require('./10-lib')

console.log('lib:', lib)
console.log(lib.formatDate('2012/01/02'))
console.log(lib.formatNumber(3.14159265358979 - Math.PI))
console.log(lib.formatUser({ title: 'Mr', firstName: 'Alice' }))
