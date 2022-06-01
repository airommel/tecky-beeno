window.addEventListener('load', () => {
  let counter = document.querySelector('#counter')
  counter.addEventListener('click', () => {
    counter.textContent++
  })

  let password = document.querySelector('#password')
  let password2 = document.querySelector('#password2')
  let message = document.querySelector('#message')

  function checkPassword() {
    if (password.value != password2.value) {
      message.textContent = 'Password not matched'
    } else {
      message.textContent = 'Password matched'
    }
  }

  password.addEventListener('input', checkPassword)
  password2.addEventListener('input', checkPassword)
})
