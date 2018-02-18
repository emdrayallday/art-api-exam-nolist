const { difference, keys } = require('ramda')

const postPainting = ['name', 'movement', 'artist', 'yearCreated', 'museum']
const postArtist = ['born', 'name', 'movement']
const putArtist = ['_id', '_rev', 'born', 'name', 'movement', 'type']
const putPainting = [
  '_id',
  '_rev',
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum',
  'type'
]

const checkFields = (verb, reqKeysPost, reqKeysPut) => data => {
  if (verb === 'post') {
    return difference(reqKeysPost, keys(data))
  } else if (verb === 'put') {
    return difference(reqKeysPut, keys(data))
  }
  return console.log(
    'ERROR, make verb lowercase put or post..you put in:',
    verb
  )
}

const addPaintingCheck = checkFields('post', postPainting, putPainting)
const updatePaintingCheck = checkFields('put', postPainting, putPainting)
const addArtistCheck = checkFields('post', postArtist, putArtist)
const updateArtistCheck = checkFields('put', postArtist, putArtist)

module.exports = {
  addPaintingCheck,
  updatePaintingCheck,
  addArtistCheck,
  updateArtistCheck
}
