fetch('https://mdblist.com/api/?apikey=&mutnvco5tkvza4daour7p7zc4', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
	