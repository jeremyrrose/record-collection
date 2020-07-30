# Record Collection: Step Four

At this point, you've built an entire API for [your uncle's record collection app](README.md). You *are* a computer genius, just like your grandma says! You should be feeling pretty good about yourself.

>![strike a pose](https://media1.giphy.com/media/uLiOo1PxPjynK/giphy.gif?cid=ecf05e473auia4funwi6seiy7tkkz4wyhesnd4xrcw8ctx22&rid=giphy.gif)

But your uncle doesn't know much about REST APIs, and he'd like to be able to use this app on his phone from the record store -- so it's time to connect your API to a front end using jQuery!

## Get set up

So far, we've been doing our work on the API in the `/records-api` directory. Now we'll do our front-end work in a sibling directory called `/client`, where you'll find some HTML/CSS/JS starter code.

Go ahead and load `index.html` in your browser. Looks pretty bodacious, right? But it doesn't have any *content*, so let's populate it with data from our API!

Take a look at `app.js`. It's already set up with a few jQuery variables attached to DOM elements you'll want to use. It also has two functions -- `getArtists` and `showOneArtist`. See if you can tell what they do!

Now, make sure your API server is running, and then un-comment the last line of `app.js`. This will execute `getAllArtists` when you refresh your browser. Awesome! (Take a close look at the function and make sure you understand what just happened.)

## Show each artist

Ok, now when you click on one of the artists, you should see the artist's info appear along with all of their records... but that *doesn't* happen, because you haven't written `showOneArtist` yet.

Fix it! Here are some hints:

* `index.html` has comments describing what sort of DOM elements should be inserted where.
* You'll need to `.fetch()` data from your API's `getArtistById` function, right? Which route should your request hit?
* How can you get the artist ID you need? Is it already in the DOM somewhere?

## Create new artists

The page also has an "Add an Artist" button, but it doesn't *do* anything. Let's change that.

* Create a function that will clear `$info` and `$records`, then fill that space with a form for the info needed for a new artist. (Make sure there's a "Submit" button!)
* Add an event listener to `$addArtistButton` to execute that function.
* Now write another function to convert info from the form into a PUT request to your API, then link this function to the "Submit" button.

Did it work? How can you tell?

>**BONUS:** What should happen after the artist is successfully added? Make some more changes to the DOM to let your uncle know that his artist was submitted.

## Create new records








