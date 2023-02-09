var bookSearchUrl = 'https://openlibrary.org/search.json?q=the+lord+of+the+rings';
var bookCoverEl = document.getElementById('book-cover')


var bookId;
var bookTitle;
var coverId;
var rating;

var bookDataNull = {
    bookTitle: '',
    rating: ''
};


function bookAPIs(){
    fetch(bookSearchUrl)
    .then(function (response){
        return response.json();
    }).then(function(data){
        console.log(data);
        bookId = data.docs[0].key;
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
            // Log the data to the console
            // You would do something with both sets of data here
            // console.log data displays 2 json objects. Data[0] = Works API, Data[1] = Ratings API
            console.log(data);
            console.log(data[0]);
            console.log(data[1]);
            // create and return object for refence in other logic
            
                bookTitle = data[0].title;
                coverId = data[0].covers[1];
                rating = data[1].summary.average * 2;
                        
            console.log(bookTitle, coverId, rating)

            //calls other 
            bookDataObj();
            bookCover();
           
           
           
           
           
            

        })
        


    })
}

function bookCover(){
    bookCoverEl.src = 'https://covers.openlibrary.org/b/id/' + coverId + '-L.jpg'
}

function bookDataObj(){
    var bookDataReturn = {
        bookTitle : bookTitle,
        rating: rating
    };
    
    var bookData = Object.assign (bookDataNull, bookDataReturn);
    console.log(bookData)
    return bookData;
    
}
bookAPIs();




    
    