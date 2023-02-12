var button = document.querySelector("button");
var inputEl = document.querySelector(".input-box");
var bookCover = document.querySelector("#books");
var summary = document.querySelector(".summary");
var bScoreEl = document.querySelector(".bScore");
var mScoreEl = document.querySelector(".mScore");
var moviePosterEl = document.querySelector(".movie")


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
			
			
			

			// var imageL = document.createElement("img");
			// imageL.setAttribute("src", mPoster);
			// document.querySelector(".movie-container").append(imageL);
		


			
			var movieApiImdbId = "http://www.omdbapi.com/?i=" + movieId + "&apikey=c080d1c9";
	


			fetch(movieApiImdbId)
				.then((response) => response.json())
				.then((data) => {

					var mPoster = data.Poster;
					console.log(data);
					var imageL = document.createElement("img");
					imageL.setAttribute("src", mPoster);
					document.querySelector(".movie-container").append(imageL);


					
				});
		});





			
// 		fetch(movieApiImdbId)
// 		.then((response) => response.json())
// 		.then((data) => {
// 			var mPoster = data.Poster;
// 			var imageL = document.createElement("img");
// 			imageL.setAttribute("src", mPoster);
// 			document.querySelector(".movie-container").append(imageL);
// 			var movieSummary = data.description;
// 			console.log(movieSummary);
// 			summary.innerHTML = movieSummary;
// 		});
// });




	// fetch(movieApiTitle)
 	// 	.then((response) => response.json())
 	// 	.then((data) => {
 	// 		var movieScore = data.search[0].score;
 	// 		var movieId = data.search[0].id;
 	// 		console.log(movieId);
	// 		mScoreEl.textContent = (movieScore / 10) + " / 10";
 	// 		return(movieId);
 	// 	})
 	// 	.then(moviePosterGetter => {
 	// 	console.log(moviePosterGetter);
		
 	// var moviePoster = "https://mdblist.com/api/?apikey=0zlqcizpjwrma3fudekly1itt&i=" + moviePosterGetter;
 	// fetch(moviePoster)
 	// 	.then((response) => response.json())
 	// 	.then((data) => {
				
 	// 		console.log(data.Poster);
 	// 		var mPoster = data.Poster;
	// 		var imageL = document.createElement("img");
	// 		imageL.setAttribute("src", mPoster);
	// 		document.querySelector(".movie-container").append(imageL);
	// 	});
 	// });
 }