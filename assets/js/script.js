var button = document.querySelector("button");
var inputEl = document.querySelector(".input-box");
var bookCover = document.querySelector("#books");

document.querySelector("button").addEventListener("click", function () {
	var input = $(".input-box").val();
	var openBookApi = "https://openlibrary.org/search.json?q=" + input;
	var movieApiTitle =
		"https://mdblist.com/api/?apikey=0zlqcizpjwrma3fudekly1itt&s=" + input;
	// var movieApiImdbId =
	// 	"https://mdblist.com/api?apikey=0zlqcizpjwrma3fudekly1itt&i=" + imdbID;
	fetch(movieApiTitle)
		.then((response) => response.json())
		.then((data) => {
			var movieData = data.search[0].imdbid;
			console.log(movieData);
		});
});
