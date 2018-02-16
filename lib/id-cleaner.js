const { split, join, drop, head } = require('ramda')

module.exports = string => {
  const array = split(' ', string)

  if (head(array) === 'A' || head(array) === 'The') {
    return join(' ', drop(1, array))
  } else {
    return join(' ', array)
  }
}
