const { split, join, drop, head, toUpper } = require('ramda')
const slug = require('slugify')

const idCleaner = string => {
  const array = split(' ', string)

  if (toUpper(head(array)) === 'A' || toUpper(head(array)) === 'THE') {
    return join(' ', drop(1, array))
  } else {
    return join(' ', array)
  }
}

module.exports = name => slug(idCleaner(name), { lower: true })
