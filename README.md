##Spotify-Me AJAX Code Along
1) Clone the repo for our Spotify Me exercise [here](https://github.com/ga-dc/spotify-me). Open the repo in Sublime. Take a look at the `spotify.js` file. 

Note that we have the Spotify endpoints to search by either artist and track. Try pasting these into your browser with a keyword and see what's returned. Eventually we're gonna use string concatenation to create one flexible endpoint.

Note that the jQuery library is already included. We also have a handy drop-down menu in our HTML.

2) We need to create an event handler for our submit button. Let's get it working with an alert first:

```js
$('form#search input[type=submit]').on("click", function(){
    alert("working");
  });
```

3) Let's create two functions, one to request the results and one to display them:

```js
function searchSpotify(event) {
  event.preventDefault(); 

}

function displayResults() {
 
}
```
>What does event.preventDefault() mean?

>(From W3 Schools) The event.preventDefault() method stops the default action of an element from happening.
	
>For example, prevent a submit button from submitting a form or prevent a link from following the URL. In this case, from reloading the page.

4) Let's add the function searchSpotify to our event handler.

```js
$(document).ready(function() {
  $('form#search input[type=submit]').on("click", searchSpotify);
});
```

5) Inside our `searchSpotify` function, let's capture the user search term input using jQuery and assign it to a variable. We'll also `console.log` it to confirm it's working:

```js
var $term = $("#search-keyword").val();
console.log($term);
```

6) Inside our `searchSpotify` function, let's also capture the search type from the drop-down and add it to our `console.log`:

```js
var $searchType = $("#search-type").val();
console.log($term, $searchType);
```

7) Take a close look at our two Spotify URLs. What is the difference between them? Let's use string concatenation to build our two URLs that will vary based on the user's search and term preferences:

```js
var url = 'http://ws.spotify.com/search/1/' + $searchType + '.json?q=' + $term;
```

8) Let's use `ajax` to ping the API:

```js
 $.ajax({
    url: url,
    method: "get"
  }).done(function(data) {
    var resultsProperty = $searchType + "s";
    displayResults(data[resultsProperty]);
    console.log(data);
  });
```

So, what's going on here? First, we're using AJAX to call our `url` which sends our returning data into our `.done()` method. 

Why are we adding an "s" to the searchType? Check out the data that's returned and you'll notice that the data object has keys for either "artists" or "tracks". Our `searchType` is singular, therefore we need to concatenate an "s" to the end.

Next, we pass the artists or tracks array to our `displayResults` function.

>BONUS... How could we accomplish this using `$.get`?

```js
$.get(url).done(function(data) {
    var resultsProperty = $searchType + "s";
    displayResults(data[resultsProperty]);
    console.log(data);
  }); 
```

9) Let's finish our `displayResults` function. Above we passed `data[resultsProperty]` into our function as an argument. So let's add the ability to pass an argument into our function:

```js
function displayResults(results) {
  
}
```

10) Where in the DOM do we want to insert our results? Let's use jQuery to convert that element into an object and assign it to a variable. We're also gonna use `.empty()` on the container. Why?

>If we don't, each search result will append to the bottom of the current results div.

```js
function displayResults(results) {
  var $container = $("#results");
  $container.empty();  
}
```

11) Let's loop over each result in our results array and confirm it's working with a `console.log`:

```js
function displayResults(results) {
  var $container = $("#results");
  $container.empty();
  results.forEach(function(result) {
    console.log(result);
  })
}
```

12) Now let's actually `append()` each result to our container as a link (so the user will be directed to Spotify):

```js
function displayResults(results) {
  var $container = $("#results");
  $container.empty();
  results.forEach(function(result) {
    $container.append("<li><a href='" + result.href + "'>" + result.name + "</a></li>");
  })
}
```

##BONUS

- Try adding a Spotify search for genre, album, etc.
- Try using pagination to limit the results that are shown on the page at one time (e.g.- maybe only show 10 results at a time).
- Add some logic in case the search term doesn't exist or is misspelled.
