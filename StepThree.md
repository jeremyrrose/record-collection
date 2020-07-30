# Record Collection: Step Three

Now that you've set up your database and built controller functions to pull data from it, you can take the third step toward setting up [your uncle's record collection app](README.md).

> **OH-OHHHH WE'RE HALFWAY THERE**
>
> ![livin on a prayer](https://media1.giphy.com/media/5fE0uLFQrPCFy/giphy.gif?cid=ecf05e479plhauu65xx6h5rj3eergx5imd7fqbmwlnqk0jbs&rid=giphy.gif)
>
>*Take my code, and we'll make it, I swear.*

## Connect Express

Now we can build a server using Express and `Router` to connect requests to our controller functions. First we'll need to install Express and our middleware dependencies inside our `records-api` directory:

```bash
npm i express dotenv morgan cors
```

Now `touch server.js`, and let's get things started with some exciting Express boilerplate! 

>Since you don't have many decisions to make here, this can be a time for reflection. As you cut and paste, take some time to consider what each line does. What is `process.env`? What does `morgan` do? Why is there so much `cors` security config? What does the first line of the `// middleware` section do? Seek understanding.

```javascript
// dependencies
require("dotenv").config();
const express = require('express');
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// global variables
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

// CORS security config
const whitelist = ["http://localhost:3000/"];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(
                new Error("Not allowed by CORS; origin domain needs to be added to whitelist.")
            );
        }
    },
};

// middleware
NODE_ENV === "development" ? app.use(cors()) : app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.get('/', (req,res) => {
    res.send('This is the Record Collection.')
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}.`)
});
```

Now, because you totally understand what's going on here, you can tell that this server still won't work until we put some crucial info into a `.env` file. Here's a fun new way to do that with one command in your terminal:

```bash
echo -e "PORT=3000\nNODE_ENV=development" >> .env
```

Test everything by running `node server.js` and navigating to `localhost:3000` in your browser. Great!

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

Now you can start your development server by typing `npm run dev`.

## Set up routing
We'll use Express router to handle routing, so let's make a directory for that and create our router file:

```bash
mkdir routes
touch routes/index.js
```

Inside `routes/index.js`, let's pull in Express's `Router` object and move our root route over to this new file:

```javascript
const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.send('This is the Record Collection served via Express with Router.')
})

module.exports = router;
```

Now we can use tell our server file to direct all requests to our new router. Inside `server.js`, add this at the end of the `// dependencies` section:

```javascript
const routes = require('./routes');
```

... and replace the current `app.get( ... )` line with this:

```javascript
app.use('/', routes);
```

Test it in your browser or in Postman!

## Custom routes

Now it's time to set up the routes you'll need for your uncle's app. Here's what you want to happen:

* GET request at `'/artists'`: Return all artists as JSON.
* GET request at `'/artists/:id'`: Return an individual artist along with info for records by that artist.
* POST request at `'/artists'`: Create a new artist based on JSON in the request body.
* POST request at `'/records'`: Create a new record (associated with an artist) based on JSON in the request body.

You've already made controllers for all of these, right? Let's export/import them! First, in `controllers/index.js`, replace everything from `const run` onward with:

```javascript
module.exports = {
  findAllArtists,
  getArtistById,
  createArtist,
  createRecord
}
```

Now import those same functions into `routes/index.js`. You know how!

Now we can use these controllers with the routes we're about to create. Here's *one* way to set up the `/artists` GET route after you've imported `findAllArtists`:

```javascript
router.get('/artists', async (req, res) => {
    try {
      res.status(200).json(await findAllArtists())
    } catch (error) {
      res.status(400).send(error)
    }
  })
```

But it would probably make more sense to refactor your controller functions to work with the `req` and `res` arguments and to include the `try/catch` block. If you were to do that successfully, the line in `routes/index.js` would just look like this:

```javascript
router.get('/artists', findAllArtists)
```

It's up to you!

It's also up to you to create the other three routes in the list above! For the POST routes, the requests will have to include JSON information, which your controllers will be able to read from `req.body`. Once you've built each route, test it in Postman!

If all four routes work, you're in great shape -- but unless you think you can talk your uncle into installing Postman, we're going to need to build him a front end. Let's move on to [Step Four](StepFour.md)!