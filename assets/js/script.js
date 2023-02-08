var button = document.querySelector("button");
var inputEl = document.querySelector(".input-box");
var bScoreEl = document.querySelector(".bScore");
var mScoreEl = document.querySelector(".mScore");

document.querySelector("button").addEventListener("click", function () {
	var input = $(".input-box").val();
	var movieApiTitle = "https://mdblist.com/api/?apikey=0zlqcizpjwrma3fudekly1itt&s=" + input;
	
	fetch(movieApiTitle)
		.then((response) => response.json())
		.then((data) => {
			var movieScore = data.search[0].search;
			var movieId = data.search[0].id;
			console.log(movieId);
			mScoreEl.textContent = movieScore / 10;
			return(movieId);
		})
		.then(movieDescriptionGetter => {
		console.log(movieDescriptionGetter);
		
		var movieDescription = "https://mdblist.com/api/?apikey=0zlqcizpjwrma3fudekly1itt&i=" + movieDescriptionGetter;
		fetch(movieDescription)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
		});

});	