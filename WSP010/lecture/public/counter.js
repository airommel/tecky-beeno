let roomTemplate = document.querySelector('#room-template')
let roomContainer = document.querySelector('.room-container')

let roomDivList = []

async function loadRoomList() {
  let res = await fetch('/room')
  let json = await res.json()
  console.log(json)
  for (let room of json.roomList) {
    let roomDiv = roomTemplate.content.firstElementChild.cloneNode(true)
    let counterButton = roomDiv.querySelector('.counter')
    let joinButton = roomDiv.querySelector('.join')
    let quitButton = roomDiv.querySelector('.quit')
    let roomTitle = roomDiv.querySelector('.room-title')

    roomDiv.classList.add('guest')

    roomTitle.textContent = `#${room.id} ${room.name}`

    counterButton.textContent = room.counter
    counterButton.addEventListener('click', async function incCounter() {
      let res = await fetch(`/room/${room.id}/counter/inc`, { method: 'POST' })
    })

    joinButton.addEventListener('click', function joinRoom() {
      roomDiv.classList.remove('guest')
      roomDiv.classList.add('joint')
      socket.emit('/room/join', { id: room.id })
    })

    quitButton.addEventListener('click', function quitRoom() {
      roomDiv.classList.remove('joint')
      roomDiv.classList.add('guest')
      socket.emit('/room/quit', { id: room.id })
    })

    roomDivList[room.id] = roomDiv
    roomContainer.appendChild(roomDiv)
  }
}
loadRoomList()

let socket = io.connect()

socket.on('connect', () => {
  console.log('connected to server')
})

socket.on('/room/update', data => {
  let roomDiv = roomDivList[data.id]
  roomDiv.querySelector('.counter').textContent = data.counter
})
