require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))
const db = new PouchDB(process.env.COUCHDB_URL)
const slug = require('slugify')
const { pluck, prop } = require('ramda')

const idGen = require('./lib/pk-gen.js')

const addPainting = painting => {
  painting.type = 'painting'
  painting._id = `${painting.type}_${idGen(painting.name)}`
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
