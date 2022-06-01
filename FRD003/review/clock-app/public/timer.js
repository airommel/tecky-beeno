let startTime = Date.now()
let count = 0
let interval = 33
setInterval(() => {
  count += interval
  let now = Date.now()
  let pass = now - startTime
  let diff = pass - count
  console.log({
    count,
    pass,
    diff,
  })
}, interval)
