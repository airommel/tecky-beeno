let patternText = document.querySelector('#patternText')

let patternFile = document.querySelector('#patternFile')

function savePattern() {
  console.log('testing')
  let a = document.createElement('a')
  // let text = JSON.stringify(pattern)
  let text = patternText.value
  let object = new Blob([text])
  let url = URL.createObjectURL(object)
  a.href = url
  a.download = 'pattern.txt'
  a.click()
}

function loadPattern() {
  console.log(patternFile)
  let file = patternFile.files[0]
  let reader = new FileReader()
  reader.onload = () => {
    let text = reader.result
    console.log(text)
    patternText.value = text
    let pattern = JSON.parse(text)
    console.log('pattern:', pattern)
  }
  reader.readAsText(file)
}
