// rewrite 10-extra-callback.ts into async-await approach

import { promisify } from 'util'
import debug from 'debug'

let log = debug('11-extra-await.ts')
log.enabled = true
// console.log = log // this will mess up when you've multiple files importing each others

let overallLog = debug('overall')
overallLog.enabled = true

let wait = promisify(setTimeout)

async function makeBread() {
  log('make bread')
  await wait(500)
  return 'honey wheat bread'
}

async function decorateBread(bread: string) {
  log('decorate bread')
  await wait(500)
  return bread + ' with sesame'
}

async function cutTomato() {
  log('cut tomato')
  await wait(500)
  return 'fresh tomato'
}

async function fireEgg() {
  log('fire egg')
  await wait(500)
  return 'fired egg'
}

async function cutHam() {
  log('cut ham')
  await wait(500)
  return 'prepared ham'
}

type Content = {
  tomato: string
  egg: string
  ham: string
}

async function makeContent() {
  log('make content')
  const [tomato, egg, ham] = await Promise.all([
    cutTomato(),
    fireEgg(),
    cutHam(),
  ])
  return { tomato, egg, ham }
}

async function mixAndPutContent(bread: string, content: Content) {
  log('mix content and put into bread')
  await wait(500)
  const { tomato, egg, ham } = content
  return bread + ' with ' + tomato + ', ' + egg + ', and ' + ham
}

async function makeHamburger() {
  log('make hamburger')

  let [bread, content] = await Promise.all([
    makeBread().then(decorateBread),
    makeContent(),
  ])

  let hamburger = await mixAndPutContent(bread, content)
  return hamburger
}

overallLog('start makeHamburger()')
makeHamburger().then(hamburger => {
  log('finished production:', hamburger)
  overallLog('finished makeHamburger()')
})
