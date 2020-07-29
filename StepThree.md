# Step Three

Now that you've set up your database and  built controller functions to pull data from it, you can take the third step toward setting up [your uncle's record collection app](README.md).

> **OH-OHHHH WE'RE HALFWAY THERE**
>
> ![livin on a prayer](https://media1.giphy.com/media/5fE0uLFQrPCFy/giphy.gif?cid=ecf05e479plhauu65xx6h5rj3eergx5imd7fqbmwlnqk0jbs&rid=giphy.gif)
>
>*Take my code, and we'll make it, I swear.*

## Connecting Express

Now we can build a server using Express and `Router` to connect requests to our controller functions. First we'll need to install Express inside our `records-api` directory:

```bash
mkdir routes
touch server.js routes/index.js
```

Now `touch server.js`, and let's get things started by requiring Express, setting up a root route, and listening on port 3000!

```javascript
const express = require('express');
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

Now we can use tell our server file to direct all requests to the router. Inside `server.js`, add this immediately after `const express = require('express')`:
```javascript
const routes = require('./routes');
```

... and replace the current `app.get( ... )` line with this:
```javascript
app.use('/', routes);
```

