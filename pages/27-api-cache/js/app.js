;(function() {
	'use strict'

	//
	// Variables
	//

	const app = document.querySelector('#app')
	const endpoint = 'https://vanillajsacademy.com/api/pirates.json'

	// Get data from localStorage
	const saved = JSON.parse(localStorage.getItem('myData'))

	// 5 minutes
	const goodFor = 1000 * 60 * 5

	//
	// Helper functions
	//

	/*!
	 * Sanitize and encode all HTML in a user-submitted string
	 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
	 * @param  {String} str  The user-submitted string
	 * @return {String} str  The sanitized string
	 */
	const sanitizeHTML = function(str) {
		const temp = document.createElement('div')
		temp.textContent = str
		return temp.innerHTML
	}

	const isDataValid = function(saved, goodFor) {
		// Check that there's data, and a timestamp key
		if (!saved || !saved.data || !saved.timestamp) return

		// Get timestamp from cache
		const { timestamp } = JSON.parse(localStorage.getItem('myData'))

		// Get the difference between the timestamp and current time
		const difference = new Date().getTime() - timestamp

		return difference < goodFor
	}

	const saveToLocalStorage = data => {
		// Setup the localStorage data
		const saved = {
			data: data,
			timestamp: new Date().getTime()
		}

		// Save to localStorage
		localStorage.setItem('myData', JSON.stringify(saved))
	}

	const getFromLocalStorage = _ => {
		const { data } = JSON.parse(localStorage.getItem('myData'))
		return data
	}

	const render = function(articles) {
		return articles
			.map(
				article =>
					`<article>
						<h2>${sanitizeHTML(article.title)}</h2>
						<h3>by ${sanitizeHTML(article.author)}</h3>
						<p>${sanitizeHTML(article.article)}</p>
					</article>`
			)
			.join('')
	}

	//
	// Methods
	//

	const getArticles = () => {
		fetch(endpoint)
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response)
			})
			.then(data => saveToLocalStorage(data))
			.then(cached => getFromLocalStorage(cached))
			.then(cached => render(cached.articles))
			.then(function(htmlString) {
				app.innerHTML = htmlString
				return app
			})
			.catch(function(error) {
				console.log('Something went wrong:', error)
			})
	}

	//
	// Inits
	//

	// Check if it's been less than a minute since the data was saved
	if (isDataValid(saved, goodFor)) {
		// The data is still good, use it
		const { data } = saved
		app.innerHTML = render(data.articles)
		return app
	} else {
		// Get fresh data and use that instead
		getArticles()
	}
})()
