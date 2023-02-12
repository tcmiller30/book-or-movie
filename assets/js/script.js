
var button = document.querySelector(".button");
var inputEl = document.querySelector(".input-box");
var bookCoverEl = document.querySelector(".book-cover");
var summary = document.querySelector(".summary");
var bScoreEl = document.querySelector(".bScore");
var mScoreEl = document.querySelector(".mScore");
var moviePosterEl = document.querySelector(".movie");

// Uses input to search through OpenLibrary's APIs
function bookAPIs(input){
  var bookSearchUrl = 'https://openlibrary.org/search.json?q='+ input;
    fetch(bookSearchUrl)
    .then(function (response){
        return response.json();
    }).then(function(data){
        console.log(data);
		// if search pulls no results from OpenLibrary API, exit logic
		if(data.num_found === 0){
			console.log('No Books Found. Please try again');
			
			return;
		}
		else{
			var bookId = data.docs[0].key;
			console.log(bookId);
			// Once the bookId/key has been obtained by the first API, simultaneously init the fetch requests to the works and ratings API's
			var worksRequestUrl = 'https://openlibrary.org' + bookId + '.json';
			var ratingsRequestUrl = 'https://openlibrary.org' + bookId + '/ratings.json';
		
			return Promise.all([
				fetch(worksRequestUrl),
				fetch(ratingsRequestUrl)
			]).then(function (responses) {
				// Get a JSON object from each of the responses
				return Promise.all(responses.map(function (response) {
					return response.json();
				}));
			}).then(function (data) {
				// console.log 2 json objects. Data[0] = Works API, Data[1] = Ratings API
				console.log(data[0]);
				console.log(data[1]);
				// define variables usiong 
				
					var bookTitle = data[0].title;
					var coverId = data[0].covers[0];
					var rating = Math.round((data[1].summary.average * 2) * 10) / 10;
					console.log(data[1].summary.average)

							
				console.log(bookTitle, coverId, rating)

				//calls displayBookData to pull data values for use
				displayBookData(bookTitle, coverId, rating);
				})
		}
	})
}


function displayBookData(bookTitle, coverId, rating){

    console.log(bookTitle);
    // changes img tag's src value to the image link provided by Open Library with the coverID
    bookCoverEl.src = 'https://covers.openlibrary.org/b/id/' + coverId + '-L.jpg'

    //Changes value of book score to the rating provided by the OpenLibrary API
    bScoreEl.textContent = rating + '/10';

}

$(".input-box").on("keyup", function (e) {
	if (e.keyCode === 13) {
		var input = $(".input-box").val();
		movieInfo(input);
    	bookAPIs(input);
	}
});

document.querySelector("button").addEventListener("click", function () {
	var input = $(".input-box").val();
	movieInfo(input);
  bookAPIs(input);
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
