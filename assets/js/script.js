fetch('https://mdblist.p.rapidapi.com/?s=jaws', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));