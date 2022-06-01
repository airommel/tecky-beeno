import fs from 'fs'
import semver from 'semver'

console.log('reading file ...')
fs.readFile('package.json', (error, data) => {
  console.log('finished file reading.')

  if (error) {
    console.log('failed to read file, error:', error)
    return
  }

  console.log('length of data:', data.length)
  console.log('first 5 chars of the data:', data.slice(0, 5).toString())

  let pkg = JSON.parse(data.toString())
  console.log('typeof pkg:', typeof pkg)

  let oldVersion = pkg.version
  console.log('old version:', oldVersion)

  let newVersion = semver.inc(oldVersion, 'patch')
  console.log('new version:', newVersion)

  pkg.version = newVersion
  let newContent = JSON.stringify(pkg, null, 2)

  console.log('saving new content to file...')
  fs.writeFile('package.json', newContent, error => {
    console.log('finished file saving.')

    if (error) {
      console.log('failed to save file, error:', error)
      return
    }

    console.log('all done.')
  })
  console.log('end of file.')
})
console.log('doing other things ...')
