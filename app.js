require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error')
const port = process.env.PORT || 4000
const { not, isEmpty } = require('ramda')
const {
  addPainting,
  addArtist,
  getDoc,
  updateDoc,
  deleteDoc
} = require('./dal.js')
const checkFields = require('./lib/required-fields.js')
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
const requiredFields = checkFields([
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum'
])
const requiredFieldsArtist = checkFields(['born', 'name', 'movement'])
const requiredFieldsArtistUpdate = checkFields([
  '_id',
  '_rev',
  'born',
  'name',
  'movement',
  'type'
])
const requiredFieldsUpdate = checkFields([
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

app.post('/paintings', (req, res, next) => {
  if (not(isEmpty(requiredFields(req.body)))) {
    next(
      new HTTPError(
        400,
        `You are missing the required fields: ${requiredFields(req.body)}`
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
  if (not(isEmpty(requiredFieldsUpdate(req.body)))) {
    next(
      new HTTPError(
        400,
        `You are missing the required fields: ${requiredFieldsUpdate(req.body)}`
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

app.post('/artists', (req, res, next) => {
  if (not(isEmpty(requiredFieldsArtist(req.body)))) {
    next(
      new HTTPError(
        400,
        `You are missing the required fields: ${requiredFieldsArtist(req.body)}`
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
  if (not(isEmpty(requiredFieldsArtistUpdate(req.body)))) {
    next(
      new HTTPError(
        400,
        `You are missing the required fields: ${requiredFieldsArtistUpdate(
          req.body
        )}`
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
