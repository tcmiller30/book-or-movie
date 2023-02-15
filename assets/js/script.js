var button = document.querySelector(".button");
var inputEl = document.querySelector(".input-box");
var bookCoverEl = document.querySelector(".book-cover");
var summary = document.querySelector(".summary");
var bScoreEl = document.querySelector(".bScore");
var mScoreEl = document.querySelector(".mScore");
var moviePosterEl = document.querySelector(".mPoster");
var bookPosterEl = document.querySelector(".bPoster");
var recommendEl = document.querySelector(".recommends");
var ansContainer = document.querySelector(".ans-container");
var bPoster = document.querySelector(".bPoster");
var mPoster = document.querySelector(".mPoster");

// button for light/dark
var btnTheme = document.querySelector(".btn-theme");

btnTheme.addEventListener("click", function () {
	document.querySelector("body").classList.toggle("dark");
	document.querySelector("footer").classList.toggle("dark");
});

function bookAPIs(input) {
	var bookSearchUrl = "https://openlibrary.org/search.json?q=" + input;
	return fetch(bookSearchUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			var bookId = data.docs[0].key;

			// Once the bookId/key has been obtained by the first API, simultaneously init the fetch requests to the works and ratings API's
			var worksRequestUrl = "https://openlibrary.org" + bookId + ".json";
			var ratingsRequestUrl =
				"https://openlibrary.org" + bookId + "/ratings.json";

			return Promise.all([fetch(worksRequestUrl), fetch(ratingsRequestUrl)])
				.then(function (responses) {
					// Get a JSON object from each of the responses
					return Promise.all(
						responses.map(function (response) {
							return response.json();
						})
					);
				})
				.then(function (data) {
					// console.log data displays 2 json objects. Data[0] = Works API, Data[1] = Ratings API

					// define variables usiong
					var bookTitle = data[0].title;
					var coverId = data[0].covers[0];
					var rating = Math.round(data[1].summary.average * 2 * 10) / 10;

					//calls displayBookData to pull data values for use
					displayBookData(coverId, rating);
					return rating;
				});
		});
}

function displayBookData(coverId, rating) {
	// changes img tag's src value to the image link provided by Open Library with the coverID
	var bookCover = "https://covers.openlibrary.org/b/id/" + coverId + "-L.jpg";
	bookPosterEl.src = bookCover;

	bScoreEl.textContent = "Book Score: " + rating + " / 10";
	//Changes value of book score to the rating provided by the OpenLibrary API
}

function reset() {
	bPoster.src = "https://bulma.io/images/placeholders/256x256.png";
	mPoster.src = "https://bulma.io/images/placeholders/256x256.png";
	bScoreEl.innerHTML = "Book Score:";
	mScoreEl.innerHTML = "Movie Score:";
	summary.innerHTML = "Summary:";
	recommendEl.innerHTML =
		"The internet recommends the [book/movie] over the [book/movie]";
}

//on keyup for enter key
$(".input-box").on("keyup", function (e) {
	if (e.keyCode === 13) {
		var input = $(".input-box").val();
		reset();
		movieInfo(input);
		bookAPIs(input);
		whichIsBetter(input);
		storeInput(input);
	}
});

//eventlistener for search button
document.querySelector(".button").addEventListener("click", function () {
	var input = $(".input-box").val();
	reset();
	movieInfo(input);
	bookAPIs(input);
	whichIsBetter(input);
	storeInput(input);
});

//fetch movie api
function movieInfo(input) {
	var movieApiTitle = "http://www.omdbapi.com/?S=" + input + "&apikey=c080d1c9";

	return fetch(movieApiTitle)
		.then((response) => response.json())
		.then((data) => {
			var movieId = data.Search[0].imdbID;
			var movieApiImdbId =
				"http://www.omdbapi.com/?i=" + movieId + "&apikey=c080d1c9";

			return fetch(movieApiImdbId)
				.then((response) => response.json())
				.then((data) => {
					var mPoster = data.Poster;
					var movieScore = data.imdbRating;
					var movieSummary = data.Plot;
					console.log(data);

					moviePosterEl.src = mPoster;
					summary.innerHTML = movieSummary;
					mScoreEl.textContent = "Movie Score: " + movieScore + " / 10";
					return movieScore;
				});
		});
}
//get data from both api and compare to see which is better
function whichIsBetter(input) {
	Promise.all([movieInfo(input), bookAPIs(input)]).then((data) => {
		movieScore = data[0];
		bookScore = data[1];
		if(!data[0]){

		}else if(!data[1]){

		}else{
			// compares book and movie scores
			if (bookScore > movieScore) {
				recommendEl.innerHTML =
					"The Internet recommends the book over the movie.";
				ansContainer.innerHTML = ">";
			} else if (bookScore < movieScore) {
				recommendEl.innerHTML =
					"The Internet recommends the movie over the book.";
				ansContainer.innerHTML = "<";
			} else if (bookScore == movieScore) {
				recommendEl.innerHTML =
					"The Internet equally recommends the book and the movie.";
				ansContainer.innerHTML = "=";
			}
		}
		return;
	});
}

function storeInput(input) {
	var searchHistory = getLocalStorage();
	if (searchHistory.includes(input)) {
		return;
	} else {
		searchHistory.push(input);
		localStorage.setItem("titles", JSON.stringify(searchHistory));
	}
}

function getLocalStorage() {
	var searchHistory = localStorage.getItem("titles");
	if (searchHistory !== null) {
		newList = JSON.parse(searchHistory);
		return newList;
	} else {
		newList = [];
	}
	return newList;
}
function displaySearchHistory() {
	var searchHistory = localStorage.getItem("titles");
	var titles = JSON.parse(searchHistory);
	console.log(titles);
}
displaySearchHistory();

// drop down menu functionality for user's previous searches
document.addEventListener('DOMContentLoaded', function () {
	var dropdown = document.querySelector('.dropdown');
	dropdown.addEventListener('click', function(event) {
	   event.stopPropagation();
	   dropdown.classList.toggle('is-active');
	   /* document.querySelector("dropdown-item").innerHTML = `<a href= "${titles}" </a>` */
	});
 }); 

 // retrieve data from local storage 
 var userInputArray = JSON.parse(localStorage.getItem('titles'));

 var dropdown = document.getElementById('dropdown-item');

 // loop through array of objects and display in previous searches 
 userInputArray.forEach((item) => {
	var previousSearches = document.createElement('div');
	previousSearches.value = item.id;
	previousSearches.innerHTML = item.name;
	dropdown.appendChild(previousSearches);
 });
