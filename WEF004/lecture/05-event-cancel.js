for (let card of document.querySelectorAll('.card')) {
  card.addEventListener('click', () => {
    let content = card.querySelector('.content')
    content.classList.toggle('show')
  })
}

for (let button of document.querySelectorAll('.card .share-button')) {
  button.addEventListener('click', event => {
    let card = button
    while (!card.classList.contains('card')) {
      card = card.parentElement
      if (!card) {
				console.error('Failed to find card from share button')
        return
      }
    }
    console.log('share this card:', card)
    // event.preventDefault()
    event.stopPropagation()
  })
}
