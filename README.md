# Record Collection

Your uncle heard you were a computer genius -- and he wants you to build him an app to catalog his awesome record collection. He'd really like to be able to check his stacks while he's at the record store and add any new purchases to his virtual library from his phone.

Here's what he wants the app to be able to do:
* Display all the artists whose records he has
* Display all the records he owns for each artist
* Add new records for existing artists
* Add new artists

You told him that this will literally take you an entire day, but he's very insistent. Let's build him a full-stack app using Express and MongoDB for the back end and JavaScript/jQuery for the front end!

Fork and clone this repository, then let's get started with the back end by creating a new directory within the repo called `records-api` and then moving into it. We'll also go ahead and initialize `npm`:

```bash
mkdir records-api
cd records-api
npm init -y
```

Don't forget to `touch .gitignore` and add these lines to that file:
```
/node_modules
.env
```

## Setting up the database with Mongoose

First, let's get our database set up. Your uncle wants to be able to display the number of Billboard Hot 100 hits for each artist, along with the records by that artist in his collection. As a JavaScript object, each artist would look something like this:

```javascript
let exampleArtist = {
  name: "Whitney Houston",
  billboardHot100Hits: 23,
  recordsInCollection: []
}
```

That's pretty straightforward! Let's get started by setting up Mongoose and building an `Artist` model.


First we'll install Mongoose and set up some directories and files to handle our models and seed data:
```bash
npm i mongoose
mkdir db models seed
touch db/index.js models/artist.js seed/artists.js
```

Let's get connected to our `recordCollection` database in MongoDB and export a `db` object that we can use elsewhere. Inside our `db/index.js`, we'll require Mongoose, set up our MongoDB address for multiple environments, and connect to our database:

```javascript
const mongoose = require('mongoose')

let MONGODB_URI = process.env.PROD_MONGODB || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/recordCollection'

mongoose
    .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Successfully connected to MongoDB.')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
```

Great! Now, based on what your uncle wants, let's create a Mongoose schema for our simple `Artist` model. Inside `models/artist.js`, add this:

```javascript
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Artist = new Schema(
    {
        name: { type: String, required: true },
        hot100Hits: { type: Number, required: true },
        records: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Record'
          }
        ]
    },
    { timestamps: true },
)

module.exports = mongoose.model('artists', Artist)
```

Ok, cool. Now for each individual record, your uncle wants to be able to see the following:
* Title
* Artist
* Release year
* Number of Tracks
* Total length

Touch `models/record.js`, then get in there and define your `Record` model!
> HINT: The `artist` in your model will refer to a MongoDB document ID, right?




... 
more Mongoose here
...



## Connecting Express

Now we'll set up a server using Express's `Router` object and connect it to our database. First we'll need to make a few files and directories inside our `server` directory:

```bash
{ bash commands here }
```

Inside your new `server.js` file, let's get things started by requiring Express, setting up a root route, and listening on port 3000!

```javascript
const express = require('express');
const routes = require('./routes');
const app = express();

app.get('/', (req,res) => {
    res.send('This is the Record Collection.')
});

app.listen(3000, () => {
    console.log('Listening on PORT 3000.')
});
```

Test it by running `node server.js` and navigating to `localhost:3000` in your browser. Great!

In a moment we'll start customizing our server. First, we'll set up `nodemon` to watch for any changes we make (you can skip this step if you have `nodemon` installed globally):
```bash
npm i nodemon --save-dev
```

And add two scripts -- `start` and `dev` -- to your `package.json` file:
```json
...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
...
```

Now start your development server by typing `npm run dev`.

## Set up routing
We'll use Express router to handle routing, so let's make a directory for that and create our router file:
```bash
mkdir routes
touch routes/index.js
```

Let's pull in Express's `Router` object and move our root route to our new file. Inside `routes/index.js`, add the following:
```javascript
const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.send('This is the Record Collection.')
})

module.exports = router;
```

Now we can use tell our server file to direct all requests to the router. Inside `server.js`, replace the current `app.get(...)` line with this:
```javascript
app.use('/', routes);
```

