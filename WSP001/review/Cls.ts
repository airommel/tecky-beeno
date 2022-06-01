import windowSize from 'window-size'

function Cls() {
  let size = windowSize.get()
  return ' '.repeat(size.width * size.height)
}

export default Cls
