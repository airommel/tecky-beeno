let memoContainer = document.querySelector('.memo-container')

function showMemo(content) {
  let div = document.createElement('div')
  div.className = 'memo'
  div.innerHTML = /* html */ `
  <div class="content">${content}</div>
  <button class="icon delete">
    <i class="fas fa-trash-alt"></i>
  </button>
  <button class="icon edit">
    <i class="fas fa-edit"></i>
  </button>
	`
	memoContainer.appendChild(div)
}

showMemo('網上連儂牆')
showMemo('香港加油')
showMemo('more post')
showMemo('more memo')