var buttonEl = document.querySelector(".button");
var inputEl = document.querySelector(".input-box");
var bookCoverEl = document.querySelector(".book-cover");
var symbolEl = document.querySelector("#symbol");
var summary = document.querySelector(".summary");
var bScoreEl = document.querySelector(".bScore");
var mScoreEl = document.querySelector(".mScore");
var moviePosterEl = document.querySelector(".mPoster");
var bookPosterEl = document.querySelector(".bPoster");
var recommendEl = document.querySelector(".recommends");

// button for light/dark
var btnTheme = document.querySelector('.btn-theme');

btnTheme.addEventListener("click", function(){
	document.querySelector('body').classList.toggle('dark')
	document.querySelector('footer').classList.toggle('dark')
})

function bookAPIs(input) {
	var bookSearchUrl = "https://openlibrary.org/search.json?q=" + input;
	fetch(bookSearchUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			var bookId = data.docs[0].key;
			console.log(bookId);
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
					console.log(data);
					console.log(data[0]);
					console.log(data[1]);
					// define variables usiong

					var bookTitle = data[0].title;
					var coverId = data[0].covers[1];
					var rating = data[1].summary.average * 2;
					rating = parseFloat(rating.toFixed(1));

					console.log(bookTitle, coverId, rating);

					//calls displayBookData to pull data values for use
					displayBookData(bookTitle, coverId, rating);
					 whichIsBetter(rating);
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
	}
});

document.querySelector(".buttonEl").addEventListener("click", function () {
	var input = $(".input-box").val();
	movieInfo(input);
	bookAPIs(input);
});

function movieInfo(input) {
	//code snippets from streaming availablity
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "baafd4bc5amsh95ef6911f3aea46p1665ccjsn9886d00b3604",
			"X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
		},
	};

	fetch(
		"https://streaming-availability.p.rapidapi.com/v2/search/title?title=" +
			input +
			"&country=us&type=movie&output_language=en",
		options
	)
		.then((response) => response.json())
		.catch((err) => console.error(err))
		.then((data) => {
			console.log(data);

			var movieSummary = data?.result[0]?.overview  || "No content found, please try again.";
			var moviePoster = data?.result[0]?.posterURLs.original;
			var movieScore = data?.result[0]?.imdbRating / 10;
			var bookScore = data?.result[0]?.tmdbRating / 10;

			displayMovieData(movieSummary, moviePoster, movieScore);
			whichIsBetter(bookScore,movieScore);
		});
}
//display movie data
function displayMovieData(movieSummary, moviePoster, movieScore) {
	summary.innerHTML = movieSummary;
	moviePosterEl.src = moviePoster;
	mScoreEl.innerHTML = "Movie Score: " + movieScore + "/10";
}

function whichIsBetter(rating, movieScore) {
	var mScore = movieScore;
	var bookScore = rating;
	console.log(mScore);
	console.log(bookScore);
	if (bookScore > mScore) {
		symbolEl.className = "";
		symbolEl.classList.add("fas");
		symbolEl.classList.add("fa-greater-than");
		recommendEl.innerHTML = "the internet recommends the book over the movie";
	} else if (bookScore < mScore) {
		console.log("less than the===");		
		symbolEl.className = "";
		symbolEl.classList.add("fas");
		symbolEl.classList.add("fa-less-than");
		recommendEl.innerHTML = "the internet recommends the movie over the book";
	} else if (bookScore == mScore) {
		recommendEl.innerHTML =
			"the internet recommends both the movie and the book";
	}
	return;
}
