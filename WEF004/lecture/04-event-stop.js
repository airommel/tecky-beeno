for (let img of document.querySelectorAll('.thumbnail')) {
  img.addEventListener('click', event => {
    console.log('the first listener')
  })
  img.addEventListener('click', event => {
    // event.target
    img.classList.toggle('enlarge')
    event.preventDefault()
    // event.stopPropagation()
    event.stopImmediatePropagation()
  })
  img.addEventListener('click', event => {
    console.log('the third listener')
  })
}

for (let a of document.querySelectorAll('a')) {
  a.addEventListener('click', event => {
    console.log(a.href, 'is clicked')
  })
}
