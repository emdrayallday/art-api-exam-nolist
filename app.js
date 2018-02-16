require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error')
const port = process.env.PORT || 4000
const { not, isEmpty } = require('ramda')
const { addPainting } = require('./dal.js')
const checkFields = require('./lib/required-fields.js')
const cleanObj = require('./lib/removing-extra-fields.js')
const cleaner = cleanObj([
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

app.use(bodyParser.json())

app.get('/', function(req, res, next) {
  res.send('Welcome to the Art API. Manage all the paintings for much win.')
})

app.post('/paintings', (req, res, next) => {
  /*
{
  "name": "The Persistence of Memory",
  "movement": "surrealism",
  "artist": "Salvador Dali",
  "yearCreated": 1931,
  "museum": {name: "Musuem of Modern Art", location: "New York"}
}
  */
  if (not(isEmpty(requiredFields(req.body)))) {
    next(
      new HTTPError(
        400,
        `You are missing the required fields: ${requiredFields(req.body)}`
      )
    )
  } else {
    addPainting(cleaner(req.body))
      .then(newPainting => res.send(newPainting))
      .catch(err => next(new HTTPError(err.status, err.message)))
  }
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status).send(err.message)
})

app.listen(port, () => console.log('MarkArt is running on port: ', port))
