import { readdir, stat } from 'fs'
import { join } from 'path'

function findAllFile(
  path: string,
  desiredFilename: string,
  callback: (pathList: string[]) => void,
) {
  let pathList: string[] = []
  readdir(path, (err, files) => {
    if (err) {
      console.error('Failed to readdir, error:', err)
      return
    }
    let numberOfFinishedFile = 0
    function eachFileCallback() {
      numberOfFinishedFile++
      if (numberOfFinishedFile == files.length) {
        callback(pathList)
      }
    }
    files.forEach(filename => {
      let fullPath = join(path, filename)
      stat(fullPath, (err, fileStat) => {
        if (err) {
          console.error('Failed to read stat of filename:', filename)
          eachFileCallback()
          return
        }
        if (fileStat.isFile()) {
          if (filename == desiredFilename) {
            pathList.push(fullPath)
          }
          eachFileCallback()
          return
        }
        if (fileStat.isDirectory()) {
          findAllFile(fullPath, desiredFilename, pathListFromChild => {
            pathListFromChild.forEach(path => pathList.push(path))
            eachFileCallback()
          })
          return
        }
        console.debug(
          'unknown file type, filename:',
          filename,
          'stat:',
          fileStat,
        )
        eachFileCallback()
      })
    })
  })
}

function test() {
  let directory =
    '/home/beenotung/workspace/gitlab.com/tecky.io/hk-map-18-nov-21/tecky-exercises-solutions-tw/WSP003/review'

  findAllFile(directory, 'package.json', packagePathList => {
    let numberOfPackage = packagePathList.length
    console.debug('number of package:', numberOfPackage)

    findAllFile(directory, 'tsconfig.json', typescriptPackageList => {
      let numberOfTypescriptPackage = typescriptPackageList.length
      console.debug('number of typescript package:', numberOfTypescriptPackage)

      console.log({
        numberOfPackage,
        numberOfTypescriptPackage,
        ratio:
          ((numberOfTypescriptPackage / numberOfPackage) * 100).toFixed(2) +
          '%',
      })
    })
  })
}

test()
