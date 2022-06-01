window.addEventListener('load', () => {
  let bannerContainer = document.querySelector('.banner-container')

  let imageUrls = [
    '/eslite_resource/leap_do/slider_pic/1612344326414/首頁banner_誠品信義店新24小時書店_復刻敦南(1920X1073).JPG',
    '/eslite_resource/leap_do/slider_pic/1612344548268/首頁Banner_嘉義美術館-2.JPG',
    '/eslite_resource/leap_do/slider_pic/1572422076043/首頁banner_誠品生活日本橋_四季迴廊_書區(1920X1073)_2.jpg',
    '/eslite_resource/leap_do/slider_pic/1612344359605/首頁Banner_香港_誠品書店奧運店.jpg',
    '/eslite_resource/leap_do/slider_pic/1579161737839/企業官網_首頁banner_2020蘇州大步梯-2.jpg',
  ]

  let imageDivList = []
  for (let imageUrl of imageUrls) {
    let div = document.createElement('div')
    imageDivList.push(div)
    div.classList.add('banner-img')
    div.style.backgroundImage =
      'url("https://www.eslitecorp.com/' + imageUrl + '")'
    bannerContainer.appendChild(div)
  }

  let i = 0
  let eachInterval = 5000
  function tick() {
    imageDivList[i].classList.add('active')
    let lastIndex = i - 1
    if (lastIndex == -1) {
      lastIndex = imageDivList.length - 1
    }
    let secondLastIndex = lastIndex - 1
    if (secondLastIndex == -1) {
      secondLastIndex = imageDivList.length - 1
    }
    imageDivList[lastIndex].classList.remove('active')
    imageDivList[lastIndex].classList.add('fade')
    imageDivList[secondLastIndex].classList.remove('fade')
    i++
    if (i == imageDivList.length) {
      i = 0
    }
    setTimeout(tick, eachInterval)
  }
  tick()
})

let nav = document.querySelector('nav')
nav.style.display = 'none'
let hideNavTimer

function showNav() {
  nav.style.display = ''
  showNavButton.style.opacity = 0
  nav.classList.add('show')
  clearTimeout(hideNavTimer)
}
function hideNav() {
  showNavButton.style.opacity = 1
  nav.classList.remove('show')
  clearTimeout(hideNavTimer)
  hideNavTimer = setTimeout(() => {
    nav.style.display = 'none'
  }, 1000)
}
