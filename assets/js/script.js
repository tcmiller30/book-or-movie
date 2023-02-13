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

function bookAPIs(input) {
	var bookSearchUrl = "https://openlibrary.org/search.json?q=" + input;
	return fetch(bookSearchUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
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
					var coverId = data[0].covers[1];
					var rating = data[1].summary.average * 2;
					rating = parseFloat(rating.toFixed(1));
					//calls displayBookData to pull data values for use
					displayBookData(bookTitle, coverId, rating);
					return rating;
				});
		});
}

function displayBookData(bookTitle, coverId, rating) {
	console.log(bookTitle);
	// changes img tag's src value to the image link provided by Open Library with the coverID
	var bookCover = "https://covers.openlibrary.org/b/id/" + coverId + "-L.jpg";
	bookPosterEl.src = bookCover;

	bScoreEl.textContent = "Book Score: " + rating;
	//Changes value of book score to the rating provided by the OpenLibrary API
}

$(".input-box").on("keyup", function (e) {
	if (e.keyCode === 13) {
		var input = $(".input-box").val();
		movieInfo(input);
		bookAPIs(input);
		whichIsBetter(input);
	}
});

document.querySelector("button").addEventListener("click", function () {
	var input = $(".input-box").val();
	movieInfo(input);
	bookAPIs(input);
	whichIsBetter(input);
});

function movieInfo(input) {
	// var openBookApi = "https://openlibrary.org/search.json?q=" + input;
	var movieApiTitle = "http://www.omdbapi.com/?S=" + input + "&apikey=c080d1c9";

	return fetch(movieApiTitle)
		.then((response) => response.json())
		.then((data) => {
			var movieData = data;

			var movieId = data.Search[0].imdbID;
			var movieApiImdbId =
				"http://www.omdbapi.com/?i=" + movieId + "&apikey=c080d1c9";

			return fetch(movieApiImdbId)
				.then((response) => response.json())
				.then((data) => {
					var mPoster = data.Poster;

					moviePosterEl.src = mPoster;
					var movieSummary = data.Plot;

					summary.innerHTML = movieSummary;
					var movieScore = data.imdbRating;
					mScoreEl.textContent = movieScore + " / 10";
					return movieScore;
				});
		});
}
//display movie data
function displayMovieData(movieSummary, moviePoster, movieScore) {
	summary.innerHTML = movieSummary;
	moviePosterEl.src = moviePoster;
	mScoreEl.innerHTML = "Movie Score: " + movieScore + "/10";
}

function whichIsBetter(input) {
	Promise.all([movieInfo(input), bookAPIs(input)]).then((data) => {
		movieScore = data[0];
		bookScore = data[1];
		if (bookScore > movieScore) {
			recommendEl.innerHTML = "the internet recommends the book over the movie";
			ansContainer.innerHTML = ">";
		} else if (bookScore < movieScore) {
			recommendEl.innerHTML = "the internet recommends the movie over the book";
			ansContainer.innerHTML = "<";
		} else if (bookScore == movieScore) {
			recommendEl.innerHTML =
				"the internet recommends both the movie and the book";
			ansContainer.innerHTML = "=";
		}
		return;
	});
}
