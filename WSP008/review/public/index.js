let memoContainer = document.querySelector('.memo-container')
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
      loadMemo()
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

function showMemo(memo) {
  let div = document.createElement('div')
  div.style.backgroundColor = memo.color
  if (isDimColor(memo.color)) {
    div.style.color = 'white'
  }
  div.className = 'memo'
  div.innerHTML = /* html */ `
  <div class="content">
    <div class="text">${memo.content}</div>
    ${memo.photo ? `<img src="${memo.photo}">` : ''}
  </div>
  <button class="icon delete admin-only">
    <i class="fas fa-trash-alt"></i>
  </button>
  <button class="icon edit admin-only">
    <i class="fas fa-edit"></i>
  </button>
	`
  if (memo.photo) {
    let img = div.querySelector('img')
    img.addEventListener('click', () => {
      let dialog = document.createElement('dialog')
      dialog.setAttribute('open', '')
      dialog.innerHTML = `<img src="${memo.photo}">`
      dialog.addEventListener('click', event => {
        if (event.target == dialog) {
          dialog.remove()
        }
      })
      document.body.appendChild(dialog)
    })
  }
  let deleteButton = div.querySelector('button.delete')
  deleteButton.addEventListener('click', async () => {
    try {
      let res = await fetch('/memo', {
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
  memoContainer.appendChild(div)
}

async function loadMemo() {
  let res = await fetch('/memo')
  let json = await res.json()
  memoContainer.innerHTML = ''
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
