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

> **STOP!!!**
>
>![HAMMER TIME](https://media2.giphy.com/media/11rIergnpiYpvW/giphy.gif?cid=ecf05e47sc41bd9voemjwzkaa93tud72afulv0u4nytj81f3&rid=giphy.gif)
> 
> **PLANNING TIME:**
>
> Based on what your uncle wants, what do you think your database models should look like? Will there be separate files for `Artist` and `Record`? What datatypes will each include? What type of relationship will one have to the other? Think for a sec, make some notes on paper, then continue!

## Setting up the database with Mongoose

OK, let's get our database set up. Your uncle wants to be able to display the number of Billboard Hot 100 hits for each artist, along with the records by that artist in his collection. As a JavaScript object, each artist would probably look something like this:

```javascript
let exampleArtist = {
  name: "Whitney Houston",
  billboardHot100Hits: 23,
  recordsInCollection: [
    // references to individual records //
  ]
}
```

That's pretty straightforward! Let's get started by setting up Mongoose and building an `Artist` model.

First we'll install Mongoose and set up some directories and files to handle our models and seed data:
```bash
npm i mongoose
mkdir db models seed
touch db/index.js models/artist.js seed/artists.js
```

Let's get connected to our `recordCollection` database in MongoDB and export a `db` object that we can use in other files. Inside our `db/index.js`, we'll require Mongoose, set up our MongoDB address to work in multiple environments, and connect to our database:

```javascript
const mongoose = require('mongoose')

// use environment URI if available
let MONGODB_URI = process.env.PROD_MONGODB || process.env.MONGODB_URI || 'mongodb://localhost:27017/recordCollection'

// connect to database
mongoose
    .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error:', e.message)
    })

const db = mongoose.connection

// connection messaging
db.on("error", (err) => console.log(err.message + "\nIs Mongod not running?"));
db.on("connected", () => console.log("MongoDB connected!"));
db.on("disconnected", () => console.log("MongoDB disconnected."));

module.exports = db
```

Great! Now, based on what your uncle wants, let's create a Mongoose schema for our simple `Artist` model. Inside `models/artist.js`, add this:

```javascript
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artistSchema = new Schema(
    {
        name: { type: String, required: true },
        hot100Hits: { type: Number, required: true },
        records: [
          {
            type: Schema.Types.ObjectId,
            ref: 'records'
          }
        ]
    },
    { timestamps: false } // You'll use timestamps for a lot of things, but they're not needed here.
)

module.exports = mongoose.model('artists', artistSchema)
```

Ok, cool. Now for each individual record, your uncle wants to be able to see the following:

* Title
* Artist
* Release year
* Cover art (optional)

**The next part is up to *you*.** Touch `models/record.js`, then get in there and define your `Record` model!
> HINT: The `artist` in your model will refer to a MongoDB document ID with ref `'artists'`.

## Seeding the database

Now that your models are set up, you can seed the database with your uncle's favorites. We'll start with the artists, so `touch seed/artists.js` and add the following:

```javascript
const db = require('../db')
const Artist = require('../models/artist')

// define artists to seed
const artistSeed = [
  { name: "De La Soul", hot100Hits: 3 },
  { name: "Darryl Hall & John Oates", hot100Hits: 34 },
  { name: "The Bangles", hot100Hits: 11 },
  { name: "A Tribe Called Quest", hot100Hits: 5 },
  { name: "Whitney Houston", hot100Hits: 23 },
  { name: "Cyndi Lauper", hot100Hits: 14 }
]

// insert all artists from array
Artist.insertMany(artistSeed,
  (error, response) => {
      if (error) {
          console.log(error);
      } else {
          console.log(response);
      }
      db.close()
  })
```

What's happening here? First we're bringing in our DB connection, then requiring the Artist model so that we can use it to add artists. Then we use the model's `.insertMany()` method to add our entire array of artists.

Now run `node seed/artists` in your terminal. You should see a list of artists generated... but none of them has any `records` listed. Now we need to seed records, which will be slightly more complicated.

So `touch seed/records.js` and add the code below. **IMPORTANT:** Take a look at the `recordSeed` array. Do the attributes for each record (`title`, `artist`, `releaseYear`, and `coverImage`) match the attribute names in the `Record` model you defined earlier? If not, change one or the other to make them match.

```javascript
const db = require('../db/index.js')
const Record = require('../models/record')
const Artist = require('../models/artist') 

// define records to seed (with references to artists already added)
const recordSeed = [
  {
    title: "3 Feet High and Rising",
    artist: "De La Soul",
    releaseYear: 1989,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/DeLaSoul3FeetHighandRisingalbumcover.jpg/220px-DeLaSoul3FeetHighandRisingalbumcover.jpg'
  },
  { 
    title: "Private Eyes",
    artist: "Darryl Hall & John Oates",
    releaseYear: 1981,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Hall_Oates_Private_Eyes.jpg/220px-Hall_Oates_Private_Eyes.jpg'
  },
  { 
    title: "Ooh Yeah!",
    artist: "Darryl Hall & John Oates",
    releaseYear: 1988,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Hall_Oates_Ooh_Yeah.jpg/220px-Hall_Oates_Ooh_Yeah.jpg'
  },
  {
    title: "In a Different Light",
    artist: "The Bangles",
    releaseYear: 1986,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/The_Bangles_-_Different_Light.jpg/220px-The_Bangles_-_Different_Light.jpg'
  },
  {
    title: "People's Instinctive Travels and the Paths of Rhythm",
    artist: "A Tribe Called Quest",
    releaseYear: 1990,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/ATCQPeople%27sInstinctTravels.jpg/220px-ATCQPeople%27sInstinctTravels.jpg'
  },
  {
    title: "The Low End Theory",
    artist: "A Tribe Called Quest",
    releaseYear: 1991,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/42/ATribeCalledQuestTheLowEndtheory.jpg/220px-ATribeCalledQuestTheLowEndtheory.jpg'
  },
  {
    title: "Whitney",
    artist: "Whitney Houston",
    releaseYear: 1987,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Whitney_Houston_-_Whitney_%28album%29.jpg/220px-Whitney_Houston_-_Whitney_%28album%29.jpg'
  },
  {
    title: "She's So Unusual",
    artist: "Cyndi Lauper",
    releaseYear: 1983,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/ShesSoUnusual1984.PNG/220px-ShesSoUnusual1984.PNG'
  }
]

// add the record seed array with necessary awaits
const addRecords = async () => {
  
  await Promise.all(recordSeed.map(async recordToAdd => {

        // find artist document with matching name
        let artist = await Artist.findOne({name: recordToAdd.artist})

        // update object with artist ID
        recordToAdd.artist = artist._id

        // create record
        const record = await Record.create(recordToAdd)
        console.log(record)

        await artist.records.push(record._id)
        await artist.save()
        console.log(artist)
    }))

  db.close()

}

// invoke the async function
addRecords()
```

For this one, we need to require *both* models, since each artist needs to be updated to include the new record. Now take a look at the `addRecords()` function.

Because we need to get artist IDs for each record from the database, we need to use `async` and `await` to give our DB time to respond. Then we map through the `recordSeed` array, and for each `recordToAdd`, we do the following:

* Look up the artist based on the name provided.
* Insert the artist's ID in our `recordToAdd` object.
* Create the record in the database.
* Push the newly created record ID into the artist's `records` array and `.save()` the artist in the database.

Phwew! That's a lot. Now run `node seed/records.js` in your terminal. You should see the new records and updated artists listed in your terminal.

Drop into your MongoDB shell and run some queries to check that the seed data is there...

Then move on to [Step Two!](StepTwo.md)
