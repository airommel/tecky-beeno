let incButton = document.querySelector('button.inc')
let clock = document.querySelector('#clock')
let signupForm = document.querySelector('#signup-form')
let userCount = document.querySelector('#user-count')

async function loadUserCount() {
  try {
    let res = await fetch('/user/count')
    let json = await res.json()
    userCount.textContent = json.count
  } catch (error) {
    let msg = 'Failed to load user count'
    console.error(msg, error)
    userCount.textContent = msg
  }
}
loadUserCount()

incButton.addEventListener('click', async () => {
  console.log('try to increase')
  try {
    let res = await fetch('/count/inc', {
      method: 'POST',
    })
    let body = await res.json()
    incButton.textContent = body.count
  } catch (error) {
    incButton.textContent =
      'Network Failure, please check your wifi connection or contact the admin if this problem persist'
  }
})

// incButton.addEventListener('click', async () => {
//   console.log('try to increase')
//   let count = +incButton.textContent
//   count++

//   try {
//     let res = await fetch('/count', {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ count }),
//     })
//     console.log('inc count res:', res)
//     let body = await res.json()
//     console.log('inc count body:', body)
//     if (body.message == 'ok') {
//       incButton.textContent = count
//     } else {
//       incButton.textContent = 'Failed to update: ' + body.message
//     }
//   } catch (error) {
//     console.error('Failed to inc count:', error)
//     incButton.textContent =
//       'Network Failure, please check your wifi connection or contact the admin if this problem persist'
//   }
// })

async function loadCount() {
  let res = await fetch('/count')
  console.log('load count res:', res)
  let body = await res.json()
  console.log('load count res.body:', body)
  incButton.textContent = body.count
}
loadCount()

let startTime = Date.now()
setInterval(() => {
  let currentTime = Date.now()
  let upTime = ((currentTime - startTime) / 1000).toFixed(0)
  clock.textContent = 'Up Time: ' + upTime + ' second(s)'
}, 1000)

signupForm.addEventListener('submit', async event => {
  event.preventDefault()
  console.log('sending sign up request...')

  // let body = new FormData()
  // body.append('username', signupForm.username.value)
  // body.append('password', signupForm.password.value)

  let form = signupForm

  let body = new FormData(form)
  // body.append('timestamp', Date.now())

  // fetch('/user', { method: 'POST', body })
  let outputMessage = form.querySelector('.output-message')
  try {
    let res = await fetch(form.action, { method: form.method, body })
    let json = await res.json()
    outputMessage.textContent = json.message
    if (json.message == 'created account') {
      form.reset()
      loadUserCount()
    }
  } catch (error) {
    outputMessage.textContent = 'Failed to signup: ' + error
  }
})
