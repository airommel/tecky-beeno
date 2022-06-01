import { readdir, stat, Stats } from 'fs'
import { join } from 'path'

function readdirAsync(path: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    readdir(path, (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}

function statAsync(path: string): Promise<Stats> {
  return new Promise((resolve, reject) => {
    stat(path, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats)
      }
    })
  })
}

async function findAllFile(
  path: string,
  desiredFilename: string,
): Promise<string[]> {
  let pathList: string[] = []

  let files: string[]
  try {
    files = await readdirAsync(path)
  } catch (error) {
    throw new Error(`Failed to readdir '${path}', error: ${error}`)
  }

  for (let filename of files) {
    let fullPath = join(path, filename)
    let fileStat: Stats
    try {
      fileStat = await statAsync(fullPath)
    } catch (error) {
      throw new Error(`Failed to stat '${fullPath}', error: ${error}`)
    }

    if (fileStat.isFile()) {
      if (filename == desiredFilename) {
        pathList.push(fullPath)
      }
      continue
    }
    if (fileStat.isDirectory()) {
      let pathListFromChild = await findAllFile(fullPath, desiredFilename)
      pathListFromChild.forEach(path => pathList.push(path))
      continue
    }
    console.debug('unknown file type, filename:', filename, 'stat:', fileStat)
  }

  return pathList
}

async function countPackageJson(directory: string) {
  console.log('start countPackageJson()')

  let packagePathList = await findAllFile(directory, 'package.json')
  let numberOfPackage = packagePathList.length
  console.log('number of package:', numberOfPackage)

  return numberOfPackage
}

async function countTsConfig(directory: string) {
  console.log('start countTsConfig()')

  let typescriptPackageList = await findAllFile(directory, 'tsconfig.json')
  let numberOfTypescriptPackage = typescriptPackageList.length
  console.log('number of typescript package:', numberOfTypescriptPackage)

  return numberOfTypescriptPackage
}

async function test() {
  let directory =
    '/home/beenotung/workspace/gitlab.com/tecky.io/hk-map-18-nov-21/tecky-exercises-solutions-tw/WSP003/review'

  let [numberOfPackage, numberOfTypescriptPackage] = await Promise.all([
    countPackageJson(directory),
    countTsConfig(directory),
  ])

  console.log(
    'ratio of typescript packages:',
    ((numberOfTypescriptPackage / numberOfPackage) * 100).toFixed(2) + '%',
  )
}

console.log('Start test()')
test()
  .then(() => {
    console.log('Finished test()')
  })
  .catch(error => {
    console.error('Failed test(), error:', error)
  })
