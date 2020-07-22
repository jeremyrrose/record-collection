# Step Three

This is the third step toward setting up [your uncle's record collection app](README.md).

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

