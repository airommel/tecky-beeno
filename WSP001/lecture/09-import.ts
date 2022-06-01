import axios from 'axios'
import fs from 'fs'
import express from 'express'

// console.log(axios)

axios.get('http://github.com').then(response => {
  console.log({
    status: response.status,
    statusText: response.statusText,
    dataLength: response.data.length,
  })
  console.log('saving to index.html...')
  fs.writeFile('index.html', response.data, () => {
    console.log('saved to index.html')
  })
})

let app = express()
app.get('/', (req, res) => {
  axios.get('http://github.com').then(response => {
    res.end(response.data)
  })
})
app.listen(3000, () => {
  console.log('listening on http://localhost:3000')
})
