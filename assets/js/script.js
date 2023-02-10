var button = document.querySelector("button");
var inputEl = document.querySelector(".input-box");
var bookCover = document.querySelector("#books");
var summary = document.querySelector(".summary");

document.querySelector("button").addEventListener("click", function () {
	var input = $(".input-box").val();
	movieSummary(input);
});

function movieSummary(input) {
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
}
