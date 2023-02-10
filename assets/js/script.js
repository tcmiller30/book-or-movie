var button = document.querySelector("button");
var inputEl = document.querySelector(".input-box");
var bookCover = document.querySelector("#books");
var summary = document.querySelector(".summary");
var bScoreEl = document.querySelector(".bScore");
var mScoreEl = document.querySelector(".mScore");
var moviePosterEl = document.querySelector(".movie");

$(".input-box").on("keyup", function (e) {
	if (e.keyCode === 13) {
		var input = $(".input-box").val();
		movieInfo(input);
	}
});

document.querySelector("button").addEventListener("click", function () {
	var input = $(".input-box").val();
	movieInfo(input);
});

function movieInfo(input) {
	// var openBookApi = "https://openlibrary.org/search.json?q=" + input;
	var movieApiTitle =
		"https://mdblist.com/api/?apikey=0zlqcizpjwrma3fudekly1itt&s=" + input;

	fetch(movieApiTitle)
		.then((response) => response.json())
		.then((data) => {
			var movieData = data.search[0].imdbid;
			console.log(movieData);

			var imdbID = movieData;
			var movieApiImdbId =
				"https://infinite-cliffs-64050.herokuapp.com/https://mdblist.com/api?apikey=0zlqcizpjwrma3fudekly1itt&i=" +
				imdbID;

			fetch(movieApiImdbId)
				.then((response) => response.json())
				.then((data) => {
					var movieSummary = data.description;
					console.log(movieSummary);
					summary.innerHTML = movieSummary;
				});
		});

	fetch(movieApiTitle)
		.then((response) => response.json())
		.then((data) => {
			var movieScore = data.search[0].score;
			var movieId = data.search[0].id;
			console.log(movieId);
			mScoreEl.textContent = movieScore / 10 + " / 10";
			return movieId;
		})
		.then((moviePosterGetter) => {
			console.log(moviePosterGetter);

			var moviePoster =
				"https://mdblist.com/api/?apikey=0zlqcizpjwrma3fudekly1itt&i=" +
				moviePosterGetter;
			fetch(moviePoster)
				.then((response) => response.json())
				.then((data) => {
					console.log(data.poster);
					var mPoster = data.poster;
					var imageL = document.createElement("img");
					imageL.setAttribute("src", mPoster);
					document.querySelector(".movie-container").append(imageL);
				});
		});
}
