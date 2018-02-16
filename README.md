
# Welcome to the MarkArt API

![Bob Ross](https://www.biography.com/.image/t_share/MTI1NDg4NTg2MDAxODA1Mjgy/bob-ross-promojpg.jpg)

###### Bob Ipsum

> Once you learn the technique, ohhh! Turn you loose on the world; you become a tiger. You can get away with a lot. Everything is happy if you choose to make it that way.

## Getting Started!

1. Create a database

 * Using roo.land to add a database type `roo db add {dbname}`
 * If successful you will receive a secret and key,
  you need to save these to put in your `.env` file that you will create after cloning the repo.

2. Clone the repo

 * Copy the clone URL that is located on the right side of the page under the `commits, branch, releases, and contributor` tabs. It is a green button that when clicked will show you a URL that is used to clone the repo
 * To clone the repo go to your terminal and type in the command `git clone {url that you copied}`
 * This will make a new directory named `art-api-exam-nolist` inside whatever directory you are currently in
3. Install dependencies
 * Once you have cloned the repo move into the directory by typing `cd art-api-exam-nolist` in the terminal. This will move you into the cloned repo directory 
 * In the terminal type `npm install`. This will install all of the dependencies that are required inside a node_modules folder
4. Establish environment variables such as key and secrets to create a database url
 * Create a new file in the `art-api-exam-nolist` directory named .env 
 * Using the key and secret that you saved earlier when creating your roo db, create a URL to link to your database.
 * To create your URL you need to assign the key/secret/url to a label like this inside your `.env` file:
 ```
 COUCHDB_URL=https://{KEY}:{SECRET}:{URL TO DB}
 ```
 * You then require in the environment variables and use the label `COUCHDB_URL` when assigning a new PouchDB
5. Load your data 
 * There is a script that will load your database with already existing docs inside the `load-data` file.
 * To load the data type in the terminal `npm run load`
6. Start the API 
 * To start run the command `npm start` in the terminal
 * If successful there will be a message in the terminal saying `MarkArt is running on port:  4000`
7. Make your first GET call
  * In the browser type `http://localhost:4000/`
  * This will bring you to the home route of the API





