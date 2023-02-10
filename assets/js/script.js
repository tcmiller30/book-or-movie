var button = document.querySelector(".button");
var inputEl = document.querySelector(".input-box");
var bookCoverEl = document.querySelector(".book-cover");
var summary = document.querySelector(".summary");
var bScoreEl = document.querySelector(".bScore");
var mScoreEl = document.querySelector(".mScore");
var moviePosterEl = document.querySelector(".movie");

var bookSearchUrl = 'https://openlibrary.org/search.json?q='+ input;

function bookAPIs(){
    fetch(bookSearchUrl)
    .then(function (response){
        return response.json();
    }).then(function(data){
        console.log(data);
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
            // console.log data displays 2 json objects. Data[0] = Works API, Data[1] = Ratings API
            console.log(data);
            console.log(data[0]);
            console.log(data[1]);
            // define variables usiong 
            
                var bookTitle = data[0].title;
                var coverId = data[0].covers[1];
                var rating = data[1].summary.average * 2;
                        
            console.log(bookTitle, coverId, rating)

            //calls displayBookData to pull data values for use
            displayBookData(bookTitle, coverId, rating);
        })
    })
}


function displayBookData(bookTitle, coverId, rating){

    console.log(bookTitle);
    // changes img tag's src value to the image link provided by Open Library with the coverID
    bookCoverEl.src = 'https://covers.openlibrary.org/b/id/' + coverId + '-L.jpg'

    //Changes value of book score to the rating provided by the OpenLibrary API
    bScoreEl.textContent = rating;

}
bookAPIs();




    
    