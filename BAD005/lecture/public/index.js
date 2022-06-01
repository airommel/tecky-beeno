let startButton = document.querySelector('#startBtn')
startButton.addEventListener('click', () => {
  startButton.textContent = 'Loading...'
  setTimeout(() => {
    startButton.textContent = 'Ready'
  }, 2000)
})
