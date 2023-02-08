var button = document.querySelector("button");
var inputEl = document.querySelector(".input-box");
var bScoreEl = document.querySelector(".bScore");
var mScoreEl = document.querySelector(".mScore");
var moviePosterEl = document.querySelector(".movie")

document.querySelector("button").addEventListener("click", function () {
	var input = $(".input-box").val();
	var movieApiTitle = "https://mdblist.com/api/?apikey=0zlqcizpjwrma3fudekly1itt&s=" + input;
	
	fetch(movieApiTitle)
		.then((response) => response.json())
		.then((data) => {
			var movieScore = data.search[0].score;
			var movieId = data.search[0].id;
			console.log(movieId);
			mScoreEl.textContent = (movieScore / 10) + " / 10";
			return(movieId);
		})
		.then(moviePosterGetter => {
		console.log(moviePosterGetter);
		
		var moviePoster = "https://mdblist.com/api/?apikey=0zlqcizpjwrma3fudekly1itt&i=" + moviePosterGetter;
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
		
});	