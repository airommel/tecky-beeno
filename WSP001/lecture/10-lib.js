function formatDate(date) {
  return new Date(date).toLocaleString()
}

function formatNumber(number) {
  return number.toFixed(2)
	// return number.toLocaleString()
	// return number
}

function formatUser(user) {
  return user.title + ' ' + user.firstName
}

module.exports = {
	formatDate,
	formatNumber,
	formatUser
}

// console.log(format('2021/11/15'))
