
# Welcome to the MarkArt API

![Bob Ross](https://www.biography.com/.image/t_share/MTI1NDg4NTg2MDAxODA1Mjgy/bob-ross-promojpg.jpg)

###### Bob Ipsum

> Once you learn the technique, ohhh! Turn you loose on the world; you become a tiger. You can get away with a lot. Everything is happy if you choose to make it that way.

## Getting Started!
1. Clone the repo
 * To clone the repo go to your terminal and type in the command: `git clone https://github.com/emdrayallday/art-api-exam-nolist.git`
 * This will make a new directory named `art-api-exam-nolist` inside whatever directory you are currently in
 * If you wish to name the folder something different, simply type that name after the url like this: `git clone https://github.com/emdrayallday/art-api-exam-nolist.git <example_folder_name>`
2. Install dependencies
 * Once you have cloned the repo move into the directory by typing `cd art-api-exam-nolist` or `cd <name_you_decided> in the terminal. This will move you into the cloned repo directory 
 * In the terminal type `npm install`. This will install all of the projects dependencies that are required inside a node_modules folder
3. Create a `.env` file
 * In your project directory create a new file named `.env`.
 * This is where you will place your environment variables such as your database URL and which PORT the API will run on.
 * Inside the `.env` file, go ahead and type `PORT=4000`. This will assigned the API to run on that port locally when started.
 * Also create another variable in the `.env` where you will store your database URL when you create one. Type `COUCHDB_URL=` on a new line under the port variable you created.
4. Create a database

 * Using roo.land to add a database type `roo db add <dbname>` in your terminal
 * If successful you will receive a secret and key which you will put in your `.env` file in the COUCHDB_URL variable.
 * You also need the URL to your database. The variable should look like this:
 ```
 COUCHDB_URL=https://{KEY}:{SECRET}@{URL TO DB}
 
 COUCHDB_URL=https://as3gjaj46h1:36098adf243@account
 ```
Your `.env` file should now look like this:
```
PORT=4000
COUCHDB_URL=https://as3gjaj46h1:36098adf243@account <--Use the key/secret that was generated and your database URL
```
5. Load your data 
 * There is a script that will load your database with already existing docs inside the `load-data` file.
 * To load the data type in the terminal `npm run load` while you are in the project directory
6. Start the API 
 * To start run the command `npm start` in the terminal while in the project directory
 * If successful there will be a message in the terminal saying `MarkArt is running on port:  4000`
7. Make your first GET call
  * In the browser type `http://localhost:4000/`
  * This will bring you to the home route of the API





