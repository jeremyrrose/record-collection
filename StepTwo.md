# Record Collection: Step Two

Now we can take the second step toward setting up [your uncle's record collection app](README.md). Since you set up a pair of Mongoose models and seeded your database in [Step One](StepOne.md), now we can think about how we want our API to serve the data.

Remember that your uncle wants to be able to:

* Display all the artists whose records he has
* Display all the records he owns for each artist
* Add new records for existing artists
* Add new artists

>**ALLRIGHT STOP!**
>
>![ICE ICE BABY](https://media2.giphy.com/media/5pYo6tWPle0WMyhksf/giphy.gif?cid=ecf05e47ca0g25qvi6bsv5wxqa5tm2yhr6oisfi5gc960tzl&rid=giphy.gif)
>
>**Collaborate and listen.** Your API is a brand new invention. Take a moment to think about what your uncle wants the front end to do; this will determine what kind of data you need your controllers to deliver!
>
>Seriously, talk this over a little with your colleagues. How is this all gonna work?

## Set up the controllers file
We can start building controller functions even before we install Express. Go ahead and `mkdir controllers` from within your `/records-api` directory, then `touch controllers/index.js`. Let's start by importing our models and our DB connection and making a function to show all artists. Add this to your file:

```javascript
const db = require('../db/index.js')
const Record = require('../models/record')
const Artist = require('../models/artist')

const findAllArtists = async () => {
    const artists = await Artist.find()
    return artists
}

const run = async () => {
    console.log(await findAllArtists())
    db.close()
}

run()
```

Now run `node controllers` (or `node controllers/index.js`) in your terminal. You should see a list of artists. Radical!

Notice how we've used `await` in two places to make sure we have a result before moving on. Keep this in mind going forward!

Notice also that the `records` attribute for each artist is an array filled with record IDs. What if you wanted to include the actual info from the record document? You can use `.populate()` to do this. Change the first line of `findAllArtists` to this and run the file again:
```javascript
const artists = await Artist.find().populate('records')
```

Your terminal now should show each ID replaced by an `[Object]` that will contain all the data for each record. You might not always want to use `.populate()`... but sometimes you might!

## Build the controllers
Now you'll write the rest of your controller functions to get the info you need from the database! After writing a function, you can test it by adding it to the `run` function in `controllers/index.js`.

You'll need *at least* these functions to move forward with the rest of the app:

* `getArtistById` to show a single artist with info for each of their records
* `createArtist` to add a new artist to the database
* `createRecord` to add a new record and associate it with a particular artist

The two `create` functions will need to take in an object containing artist or record data. From there, you can choose to use the `.create()` or `.insertOne()` methods of each model to insert the new entry in the database.

>**PRO TIP:** If you make a bunch of malformed or duplicate MongoDB documents while you're testing your new functions, you can fairly easily run `db.dropDatabase()` in the `mongo` shell, then run `seed/artists.js` and `seed/records.js` files again in Node to start again with fresh data.

>**BONUS:** Shouldn't our `findAllArtists()` function sort the results alphabetically by name? Your uncle would probably like that.

Once you've fully tested your functions, it's time to move on to [Step Three](StepThree.md)!