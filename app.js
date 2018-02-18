require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error')
const port = process.env.PORT || 4000
const { not, isEmpty } = require('ramda')
const {
  addPainting,
  getPainting,
  updatePainting,
  deletePainting
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
const cleanerUpdate = cleanObj([
  '_id',
  '_rev',
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum'
])
const requiredFields = checkFields([
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum'
])
const requiredFieldsUpdate = checkFields([
  '_id',
  '_rev',
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum'
])

app.use(bodyParser.json())

app.get('/', function(req, res, next) {
  res.send(`<h1>Welcome to the MarkArt API</h1><br><br><p>Go explore!</p>`)
})

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
  getPainting(req.params.id)
    .then(painting => res.send(painting))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.put('/paintings/:id', (req, res, next) => {
  if (not(isEmpty(requiredFieldsUpdate(req.body)))) {
    next(
      new HTTPError(
        400,
        `You are missing the required fields: ${requiredFields(req.body)}`
      )
    )
    return
  } else {
    return updatePainting(cleanerUpdate(req.body))
      .then(newPainting => res.send(newPainting))
      .catch(err => next(new HTTPError(err.status, err.message)))
  }
})

app.delete('/paintings/:id', (req, res, next) => {
  deletePainting(req.params.id)
    .then(delResult => res.send(delResult))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.use((err, req, res, next) => {
  res.status(err.status).send(err.message)
})

app.listen(port, () => console.log('MarkArt is running on port: ', port))
