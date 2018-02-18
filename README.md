# Welcome to the MarkArt API

![Bob Ross](https://www.biography.com/.image/t_share/MTI1NDg4NTg2MDAxODA1Mjgy/bob-ross-promojpg.jpg)

###### Bob Ipsum

> Once you learn the technique, ohhh! Turn you loose on the world; you become a tiger. You can get away with a lot. Everything is happy if you choose to make it that way.

## Getting Started!

1. Clone the repo and Install Dependencies

```
$ git clone https://github.com/emdrayallday/art-api-exam-nolist.git
$ cd art-api-exam-nolist
$ npm install
```

2. Create a `.env` file

Add a file in your project directory named `.env` and put a port variable with a value of 4000 inside of it like this:

```
$ echo "PORT=4000" > .env
```

Then open the file and put a COUCHDB_URL variable under the port which we will assign a value after creating the database. Your `.env` file should look like this:

```
PORT=4000
COUCHDB_URL=
```

3. Create a database

Using roo.land to add a database type `roo db add <dbname>` in your terminal:

```
$ roo db add <dbname>
```

If successful you will receive a secret, key, and url which you will put in your `.env` file in the COUCHDB_URL variable like so:

```
COUCHDB_URL=https://<key>:<secret>@<url>
```

EXAMPLE:

```
COUCHDB_URL=https://as3g-jaj4-6h1:360-98ad-f243@<account>.roo.land/<dbname>
```

Your `.env` file should now look like this:

```
PORT=4000
COUCHDB_URL=https://as3g-jaj4-6h1:360-98ad-f243@<account>.roo.land/<dbname> <-- Use the key/secret that was generated and your database URL
```

5. Load the data

```
$ npm run load
```

6. Start the API

```
$ npm start
```

If successful there will be a message in the terminal saying:

`MarkArt is running on port: 4000`

7. Make your first GET call

In the browser type `http://localhost:4000/paintings`
This will retrieve all of the paintings

## Basics

## Base URL

`http://localhost:4000/`: This is the home route that welcomes you to the api

| API             |     ROUTE      |                   USE                    |
| --------------- | :------------: | :--------------------------------------: |
| Paintings       |   /paintings   | Retrieve all paintings or add a painting |
| Single Painting | /paintings/:id |      Retrieve or delete a painting       |
| Artists         |    /artists    |      Retrieve all or add an artist       |
| Single Artists  |  /artists/:id  |       Retrieve or remove an artist       |

## Scheme

MarkArt communicates over HTTP

## HTTP Verbs

| Verb   |          Description          |                                  Example                                   |
| ------ | :---------------------------: | :------------------------------------------------------------------------: |
| POST   |    Used to create new docs    |                     /paintings will add a new painting                     |
| GET    |     Used to retrieve docs     | /paintings to retrieve all or /paintings/:id to retrieve a single painting |
| PUT    | Used to update a specific doc |                /paintings/:id to update a specific painting                |
| DELETE | Used to remove a specific doc |                /paintings/:id to remove a specific painting                |

## Content type

MarkArt exclusively sends and receives data in the `JSON` format except on the home route which is `HTML` text.

## Status Codes

| Status Code               | Description                                                                                                                                                                                                                                     |
| ------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200 OK                    | The request was successful.                                                                                                                                                                                                                     |
| 201 Created               | The request was successful when either adding a new artist or painting.                                                                                                                                                                         |
| 400 Bad Request           | The request failed due to user error, usually when creating something you didn't provide all of the required fields.                                                                                                                            |
| 404 Not Found             | The request resource could not be found. Most likely due to an invalid URL.                                                                                                                                                                     |
| 409 Conflict              | The request failed due to a conflict. This happens when trying to update a resource and not providing the most recent \_rev and \_id. You cannot change the \_id in an update. This may also happen when adding a resource that already exists. |
| 500 Internal Server Error | This means something on the API side messed up and should not happen.                                                                                                                                                                           |