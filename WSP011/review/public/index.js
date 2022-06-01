let memoContainer = document.querySelector('.memo-container')
let memoTemplate = memoContainer
  .querySelector('#memo-template')
  .content.querySelector('.memo')
let createMemoForm = document.querySelector('form.create-memo')
let loginForm = document.querySelector('form.login')
let logoutForm = document.querySelector('form.logout')

// function showFormResult(options) {
//   const { form, message, isSuccess } = options
// }
function showFormResult({ form, message, isSuccess }) {
  let msgBox = form.querySelector('.msg-box')
  if (isSuccess) {
    msgBox.classList.add('success')
    msgBox.classList.remove('error')
    form.reset()
  } else {
    msgBox.classList.remove('success')
    msgBox.classList.add('error')
  }
  msgBox.textContent = message
}

logoutForm.addEventListener('submit', async event => {
  event.preventDefault()
  let form = logoutForm
  try {
    let res = await fetch(form.action, {
      method: form.method,
    })
    let json = await res.json()
    if (200 <= res.status && res.status < 300) {
      showFormResult({ form, message: json.message, isSuccess: true })
      loadUser()
      reconnectSocket()
    } else {
      showFormResult({ form, message: json.message, isSuccess: false })
    }
  } catch (error) {
    showFormResult({ form, message: error.toString(), isSuccess: false })
  }
})

loginForm.addEventListener('submit', async event => {
  event.preventDefault()
  let form = loginForm
  let body = {
    username: form.username.value,
    password: form.password.value,
  }
  try {
    let res = await fetch(form.action, {
      method: form.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    let json = await res.json()
    if (200 <= res.status && res.status < 300) {
      showFormResult({ form, message: json.message, isSuccess: true })
      loadUser()
      reconnectSocket()
    } else {
      showFormResult({ form, message: json.message, isSuccess: false })
    }
  } catch (error) {
    showFormResult({ form, message: error.toString(), isSuccess: false })
  }
})

createMemoForm.addEventListener('submit', async event => {
  event.preventDefault()
  let form = createMemoForm
  let body = new FormData(form)
  try {
    let res = await fetch(form.action, {
      method: form.method,
      body,
    })
    console.log('create memo res:', res)
    let json = await res.json()
    console.log('create memo json:', json)
    if (200 <= res.status && res.status < 300) {
      showFormResult({ form, message: json.message, isSuccess: true })
    } else {
      showFormResult({ form, message: json.message, isSuccess: false })
    }
  } catch (error) {
    showFormResult({ form, message: error.toString(), isSuccess: false })
  }
})

function isDimColor(color) {
  if (!color) {
    return false
  }
  let r = color.slice(1, 3)
  let g = color.slice(3, 5)
  let b = color.slice(5, 7)
  let avg = (r + g + b) / 3
  return avg < 127
}

function showMemo(memo, direction) {
  let memoDiv = memoTemplate.cloneNode(true)
  memoDiv.style.backgroundColor = memo.color
  if (isDimColor(memo.color)) {
    memoDiv.style.color = 'white'
  }
  memoDiv.querySelector('.text').textContent = memo.content

  let img = memoDiv.querySelector('img')
  if (!memo.image) {
    img.remove()
  } else {
    img.src = memo.image
    img.addEventListener('click', () => {
      let dialog = document.createElement('dialog')
      dialog.setAttribute('open', '')
      dialog.innerHTML = `<img src="${memo.image}">`
      dialog.addEventListener('click', event => {
        if (event.target == dialog) {
          dialog.remove()
        }
      })
      document.body.appendChild(dialog)
    })
  }

  let deleteButton = memoDiv.querySelector('button.delete')
  deleteButton.addEventListener('click', async () => {
    try {
      let res = await fetch('/memo/' + memo.id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: memo.content }),
      })
      let json = await res.json()

      if (200 <= res.status && res.status < 300) {
        Swal.fire({
          title: 'Deleted memo',
          text: json.message,
          icon: 'success',
        })
      } else {
        Swal.fire({
          title: 'Failed to delete memo',
          text: json.message,
          icon: 'error',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Failed to delete memo',
        text: json.message,
        icon: 'error',
      })
    }
  })

  if (direction == 'prepend') {
    memoContainer.prepend(memoDiv)
  } else {
    memoContainer.appendChild(memoDiv)
  }
}

async function loadMemo() {
  let res = await fetch('/memo')
  let json = await res.json()
  // memoContainer.innerHTML = ''
  memoContainer.querySelectorAll('.memo').forEach(div => {
    div.remove()
  })
  json.memoList.reverse()
  for (let memo of json.memoList) {
    showMemo(memo)
  }
}
loadMemo()

// showMemo('網上連儂牆')
// showMemo('香港加油')
// showMemo('more post')
// showMemo('more memo')

async function loadUser() {
  let res = await fetch('/user')
  let json = await res.json()
  loginForm.querySelector('.msg-box').textContent = ''
  logoutForm.querySelector('.msg-box').textContent = ''
  if (json.user) {
    loginForm.setAttribute('hidden', '')
    logoutForm.removeAttribute('hidden')
    logoutForm.querySelector('.username').textContent = json.user.username
    let avatar = logoutForm.querySelector('.avatar')
    if (json.user.avatar) {
      avatar.src = json.user.avatar
      avatar.hidden = false
    } else {
      avatar.src = ''
      avatar.hidden = true
    }
  } else {
    logoutForm.setAttribute('hidden', '')
    loginForm.removeAttribute('hidden')
  }
  if (json.user && json.user.is_admin) {
    document.body.classList.remove('guest')
  } else {
    document.body.classList.add('guest')
  }
}
loadUser()

let socket

function reconnectSocket() {
  if (socket) {
    socket.disconnect()
  }

  socket = io.connect()

  socket.on('connect', () => {
    console.log('connected to server')
  })

  socket.on('/admin/clock', data => {
    console.log('/admin/clock', data)
  })

  socket.on('/memo/create', data => {
    showMemo(data.memo, 'prepend')
  })
  socket.on('/memo/update', data => {})
  socket.on('/memo/delete', data => {})
}

reconnectSocket()
