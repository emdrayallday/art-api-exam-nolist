require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error')
const port = process.env.PORT || 4000
const { addPainting } = require('./dal.js')
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
  addPainting(req.body)
    .then(newPainting => res.send(newPainting))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.listen(port, () => console.log('MarkArt is running on port: ', port))
