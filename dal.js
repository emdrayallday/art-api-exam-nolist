require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))
const db = new PouchDB(process.env.COUCHDB_URL)
const slug = require('slugify')
const { pluck, prop } = require('ramda')

const idCleaner = require('./lib/id-cleaner.js')

const addPainting = painting => {
  painting._id = `painting_${slug(idCleaner(painting.name), { lower: true })}`
  painting.type = 'painting'
  return db.put(painting)
}
const getPainting = id => db.get(id)
const updatePainting = painting => db.put(painting)
const deletePainting = id => db.get(id).then(painting => db.remove(painting))
const addArtist = artist => {
  artist._id = `artist_${slug(artist.name, { lower: true })}`
  artist.type = 'artist'
  return db.put(artist)
}
const getArtist = id => db.get(id)
const updateArtist = artist => db.put(artist)
const deleteArtist = id => db.get(id).then(artist => db.remove(artist))
module.exports = {
  addPainting,
  getPainting,
  updatePainting,
  deletePainting,
  addArtist,
  getArtist,
  updateArtist,
  deleteArtist
}
