# Record Collection: Step One

Now we'll take the first step toward setting up [your uncle's record collection app](README.md).

Once you've forked and cloned this repository, let's get started with the back end by creating a new directory within the repo called `records-api` and then moving into it. We'll also go ahead and initialize `npm`:

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

The next part is up to *you*. Touch `models/record.js`, then get in there and define your `Record` model!
> HINT: The `artist` in your model will refer to a MongoDB document ID.
