var button = document.querySelector("button");
var inputEl = document.querySelector(".input-box");
var bookCover = document.querySelector("#books");
var summary = document.querySelector(".summary");
var bScoreEl = document.querySelector(".bScore");
var mScoreEl = document.querySelector(".mScore");
var moviePosterEl = document.querySelector(".mPoster")


document.querySelector("button").addEventListener("click", function () {
	var input = $(".input-box").val();
	movieInfo(input);
});

function movieInfo(input) {
	// var openBookApi = "https://openlibrary.org/search.json?q=" + input;
	var movieApiTitle =	"http://www.omdbapi.com/?S=" + input + "&apikey=c080d1c9";

	fetch(movieApiTitle)
		.then((response) => response.json())
		.then((data) => {
			var movieData = data;
			console.log(data);
			var movieId = data.Search[0].imdbID;
			var movieApiImdbId = "http://www.omdbapi.com/?i=" + movieId + "&apikey=c080d1c9";

			fetch(movieApiImdbId)
				.then((response) => response.json())
				.then((data) => {
					var mPoster = data.Poster;
					console.log(data);
					moviePosterEl.src = mPoster;
					var movieSummary = data.Plot;
					console.log(movieSummary);
					summary.innerHTML = movieSummary;
					var movieScore = data.imdbRating;
					mScoreEl.textContent = (movieScore + " / 10") ;
				});
		});


		function whichIsBetter(rating, movieScore) {
			var mScore = movieScore;
			var bookScore = rating;
			console.log(mScore);
			console.log(bookScore);
			if (bookScore > mScore) {
				recommendEl.innerHTML = "the internet recommends the book over the movie";
			} else if (bookScore < mScore) {
				recommendEl.innerHTML = "the internet recommends the movie over the book";
			} else if (bookScore == mScore) {
				recommendEl.innerHTML =
					"the internet recommends both the movie and the book";
			}
	}	
}