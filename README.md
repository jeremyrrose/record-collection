# Record Collection

Your uncle heard you were a computer whiz -- and he wants you to build him an app to catalog his awesome record collection. He'd really like to be able to check his stacks while he's at the record store and add any new purchases to his virtual library from his phone.

Here's what he wants the app to be able to do:
* Display all the artists whose records he has
* Display all the records he owns for each artist
* Add new records for existing artists
* Add a new artists

You told him that this will literally take you all day, but he's very insistent. Let's build a full-stack app using Express and MongoDB for the back end and JavaScript/jQuery for the front end!

## Setting up Express

First, fork and clone this repository. From within this repo, create a new directory called `server`, `cd` into it, initialize `npm`, and install Express:
```bash
mkdir server
cd server
npm init -y
npm i express
```

Now let's `touch server.js` to get started. Inside your new `server.js` file, let's get things started by requiring Express, setting up a root route, and listening on port 3000!

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
```
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

## 
