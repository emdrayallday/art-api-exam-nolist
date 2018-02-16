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
module.exports = { addPainting, getPainting }
