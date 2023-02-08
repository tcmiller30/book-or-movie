// Global Variables
var searchBar = document.getElementById('search');
var submitBtn = document.getElementById('submit');


// Uses Open Library Search API to fetch the Work ID of a book for use in Open Library Works API

function bookSearch(){
    var bookRequestUrl = 'https://openlibrary.org/search.json?q=the+lord+of+the+rings'

    fetch(bookRequestUrl)
    .then(response => response.json())
    .then(data => {
       var bookKey = data.docs[0].key;
       console.log(bookKey);

    // 2nd API Fetch Request using the bookkey from fetch 1
        // var workRequestUrl = 'https://openlibrary.org' + bookKey + '/ratings.json'
        // fetch(workRequestUrl)
        // .then(response => response.json())
        // .then(data => {
        //     var bookRating = data;
        //     console.log(bookRating[0]);
        // })
       

    })
}


bookSearch();
