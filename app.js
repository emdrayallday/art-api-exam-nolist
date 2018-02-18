require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error')
const port = process.env.PORT || 4000
const { not, isEmpty, pathOr } = require('ramda')
const {
  addPainting,
  addArtist,
  getDoc,
  updateDoc,
  deleteDoc,
  allDocs
} = require('./dal.js')
const {
  addPaintingCheck,
  updatePaintingCheck,
  addArtistCheck,
  updateArtistCheck
} = require('./lib/required-fields.js')
const cleanObj = require('./lib/removing-extra-fields.js')
const cleaner = cleanObj([
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum'
])
const artCleaner = cleanObj(['name', 'movement', 'born'])
const artCleanerUpdate = cleanObj([
  '_id',
  '_rev',
  'name',
  'movement',
  'born',
  'type'
])
const cleanerUpdate = cleanObj([
  '_id',
  '_rev',
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum',
  'type'
])

app.use(bodyParser.json())

app.get('/', function(req, res, next) {
  res.send(`<h1>Welcome to the MarkArt API</h1><br><br><p>Go explore!</p>`)
})
////////////////////////////
///////// Paintings
////////////////////////////
app.get('/paintings', (req, res, next) => {
  if (pathOr(null, ['query', 'limit'], req)) {
    return allDocs({
      include_docs: true,
      startkey: 'painting',
      endkey: 'painting\ufff0',
      limit: req.query.limit
    })
      .then(paintings => res.send(paintings))
      .catch(err => next(new HTTPError(err.status, err.message)))
  } else {
    return allDocs({
      include_docs: true,
      startkey: 'painting',
      endkey: 'painting\ufff0',
      limit: 5
    })
      .then(paintings => res.send(paintings))
      .catch(err => next(new HTTPError(err.status, err.message)))
  }
})

app.post('/paintings', (req, res, next) => {
  if (not(isEmpty(addPaintingCheck(req.body)))) {
    next(
      new HTTPError(
        400,
        `You are missing the required fields: ${addPaintingCheck(req.body)}`
      )
    )
    return
  } else {
    addPainting(cleaner(req.body))
      .then(newPainting => res.send(newPainting))
      .catch(err => next(new HTTPError(err.status, err.message)))
  }
})

app.get('/paintings/:id', (req, res, next) => {
  getDoc(req.params.id)
    .then(painting => res.send(painting))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.put('/paintings/:id', (req, res, next) => {
  if (not(isEmpty(updatePaintingCheck(req.body)))) {
    next(
      new HTTPError(
        400,
        `You are missing the required fields: ${updatePaintingCheck(req.body)}`
      )
    )
    return
  } else {
    return updateDoc(cleanerUpdate(req.body))
      .then(newPainting => res.send(newPainting))
      .catch(err => next(new HTTPError(err.status, err.message)))
  }
})

app.delete('/paintings/:id', (req, res, next) => {
  deleteDoc(req.params.id)
    .then(delResult => res.send(delResult))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

/////////////////////////////////
///// Artists
/////////////////////////////////

app.get('/artists', (req, res, next) => {
  if (pathOr(null, ['query', 'limit'], req)) {
    console.log(req.query.limit)
    return allDocs({
      include_docs: true,
      startkey: 'artist',
      endkey: 'artist\ufff0',
      limit: req.query.limit
    })
      .then(artists => res.send(artists))
      .catch(err => next(new HTTPError(err.status, err.message)))
  } else {
    return allDocs({
      include_docs: true,
      startkey: 'artist',
      endkey: 'artist\ufff0',
      limit: 5
    })
      .then(artists => res.send(artists))
      .catch(err => next(new HTTPError(err.status, err.message)))
  }
})

app.post('/artists', (req, res, next) => {
  if (not(isEmpty(addArtistCheck(req.body)))) {
    next(
      new HTTPError(
        400,
        `You are missing the required fields: ${addArtistCheck(req.body)}`
      )
    )
    return
  } else {
    return addArtist(artCleaner(req.body))
      .then(result => res.send(result))
      .catch(err => next(new HTTPError(err.status, err.message)))
  }
})
app.get('/artists/:id', (req, res, next) => {
  getDoc(req.params.id)
    .then(artist => res.send(artist))
    .catch(err => next(new HTTPError(err.status, err.message)))
})
app.put('/artists/:id', (req, res, next) => {
  if (not(isEmpty(updateArtistCheck(req.body)))) {
    next(
      new HTTPError(
        400,
        `You are missing the required fields: ${updateArtistCheck(req.body)}`
      )
    )
    return
  } else {
    return updateDoc(artCleanerUpdate(req.body))
      .then(updatedResult => res.send(updatedResult))
      .catch(err => next(new HTTPError(err.status, err.message)))
  }
})
app.delete('/artists/:id', (req, res, next) => {
  deleteDoc(req.params.id)
    .then(delResult => res.send(delResult))
    .catch(err => next(new HTTPError(err.status, err.message)))
})
app.use((err, req, res, next) => {
  res.status(err.status).send(err.message)
})

app.listen(port, () => console.log('MarkArt is running on port: ', port))
