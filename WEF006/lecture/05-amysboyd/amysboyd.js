let text = 'Amy Boyd is a writer.'
let textIndex = 0
let textCursor

function tickText() {
  if (textIndex >= text.length) {
    textCursor = document.createElement('div')
    textCursor.classList.add('cursor')
    textCursor.textContent = '|'
    textOutput.appendChild(textCursor)
    setTimeout(tickCursor, 60)
    return
  }
  let span = document.createElement('span')
  span.textContent = text[textIndex]
  textIndex++
  textOutput.appendChild(span)
  setTimeout(tickText, 60)
}
setTimeout(tickText, 1000)

function tickCursor() {
  textCursor.classList.toggle('active')
  setTimeout(tickCursor, 600)
}

let keywordList = [
  { text: 'Mendi', color: 'yellow', url: 'mendi' },
  { text: 'Nike By You', color: 'pink', url: 'nike-by-you' },
]

for (let keyword of keywordList) {
  let a = document.createElement('a')
  a.textContent = keyword.text
  a.classList.add(keyword.color)
  a.href = '/work/' + keyword.url
  keywords.appendChild(a)

  let span = document.createElement('span')
  span.innerHTML = '&nbsp;'
  keywords.appendChild(span)
}
