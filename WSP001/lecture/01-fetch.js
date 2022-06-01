console.log('loading node-fetch...')

let fetch = require('node-fetch')
let fs = require('fs')

console.log('fetch:', fetch)

console.log('downloading index.html')
fetch('https://github.com/')
  .then(res => res.text())
  .then(body => {
    console.log('body length:', body.length)
    console.log('saving to index.html on disk')
    fs.writeFile('index.html', body, () => {
      console.log('saved to disk')
    })
  })
console.log('doing other things')
