require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))
const db = new PouchDB(process.env.COUCHDB_URL)
const { pluck, prop } = require('ramda')

const idGen = require('./lib/pk-gen.js')

const addPainting = painting => {
  painting.type = 'painting'
  painting._id = `${painting.type}_${idGen(painting.name)}`
  return db.put(painting)
}
const addArtist = artist => {
  artist.type = 'artist'
  artist._id = `${artist.type}_${idGen(artist.name)}`
  return db.put(artist)
}
const getDoc = id => db.get(id)
const updateDoc = doc => db.put(doc)
const deleteDoc = id => db.get(id).then(doc => db.remove(doc))

module.exports = {
  addPainting,
  addArtist,
  getDoc,
  updateDoc,
  deleteDoc
}
