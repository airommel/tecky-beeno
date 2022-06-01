import debug from 'debug'

let log = debug('10-extra-callback.ts')
log.enabled = true

let overallLog = debug('overall')
overallLog.enabled = true

// try to rewrite this file into async-await approach

function makeBread(callback: (bread: string) => void) {
  log('make bread')
  setTimeout(() => {
    callback('honey wheat bread')
  }, 500)
}

function decorateBread(bread: string, callback: (bread: string) => void) {
  log('decorate bread')
  setTimeout(() => {
    callback(bread + ' with sesame')
  }, 500)
}

function cutTomato(callback: (tomato: string) => void) {
  log('cut tomato')
  setTimeout(() => {
    callback('fresh tomato')
  }, 500)
}

function fireEgg(callback: (egg: string) => void) {
  log('fire egg')
  setTimeout(() => {
    callback('fired egg')
  }, 500)
}

function cutHam(callback: (ham: string) => void) {
  log('cut ham')
  setTimeout(() => {
    callback('prepared ham')
  }, 500)
}

function makeContent(bread: string, callback: (bread: string) => void) {
  log('make content')
  setTimeout(() => {
    cutTomato(tomato => {
      fireEgg(egg => {
        cutHam(ham => {
          callback(bread + ' with ' + tomato + ', ' + egg + ', and ' + ham)
        })
      })
    })
  }, 500)
}

function makeHamburger(callback: (hamburger: string) => void) {
  log('make hamburger')
  makeBread(bread => {
    decorateBread(bread, decoratedBread => {
      makeContent(decoratedBread, callback)
    })
  })
}

overallLog('start makeHamburger()')
makeHamburger(hamburger => {
  log('finished production:', hamburger)
  overallLog('finished makeHamburger()')
})
