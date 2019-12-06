;(function() {
	'use strict'

	//
	// Variables
	//

	const app = document.querySelector('#app')
	const endpoint = 'https://vanillajsacademy.com/api/pirates.json'
	const storageID = 'pirateCache'
	const timestring = 1000 * 60 * 5 // expiration time: five minutes

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

	/**
	 * Check if the data is valid
	 * @param  {Object}  saved   The data to validate
	 * @param  {Number}  goodFor How long the data is good for
	 * @return {Boolean}         If true, data has not yet expired
	 */
	const isDataValid = function(saved, goodFor) {
		// Check that there's data, and a timestamp key
		if (!saved || !saved.data || !saved.timestamp) return

		// Get timestamp from cache
		const { timestamp } = JSON.parse(localStorage.getItem(storageID))

		// Get the difference between the timestamp and current time
		const difference = new Date().getTime() - timestamp

		return difference < goodFor
	}

	/**
	 * Save article data to localStorage
	 * @param  {Object} data The article data
	 */
	const saveDataToLocalStorage = data => {
		// Create a cache object with a timestamp
		const cache = {
			data: data,
			timestamp: new Date().getTime()
		}

		// Stringify it and save it to localStorage
		localStorage.setItem(storageID, JSON.stringify(cache))
	}

	/**
	 * Render articles into the UI
	 * @param  {Object} articles The API response object
	 */
	const renderNews = data => {
		const { articles } = data

		// If there are no articles, render a message into the UI
		if (articles.length < 1) {
			renderNoArticles()
			return
		}

		// Otherwise, render the UI
		return (app.innerHTML =
			articles
				.map(
					article =>
						`<article>
						<h2>${sanitizeHTML(article.title)}</h2>
						<p><em>By ${sanitizeHTML(article.author)} on ${sanitizeHTML(
							article.pubdate
						)} </em></p>
						<p>${sanitizeHTML(article.article)}</p>
					</article>`
				)
				.join('') +
			`<p><em>Articles from <a href="${sanitizeHTML(
				data.attribution.url
			)}">${sanitizeHTML(data.attribution.name)}</a></em></p>`)
	}

	/**
	 * Render a message into the UI when there are no articles to share
	 */
	const renderNoArticles = function() {
		app.innerHTML =
			'<p>There be no pirate news afoot, matey. Check back later.</p>'
	}

	//
	// Methods
	//

	/**
	 * Get articles from the API
	 */
	const fetchArticles = () => {
		fetch(endpoint)
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response)
			})
			.then(data => {
				renderNews(data)
				saveDataToLocalStorage(data)
			})
			.catch(error => {
				console.log('Something went wrong:', error)
				renderNoArticles()
			})
	}

	//
	// Inits
	//

	/**
	 * Get API data from localStorage
	 */
	const saved = JSON.parse(localStorage.getItem(storageID))

	if (saved) {
		// Check if it's been less than five minutes since the data was saved
		if (isDataValid(saved, timestring)) {
			// The data is still good, use it
			console.log('loaded from cache')

			const { data } = saved
			renderNews(data)

			return
		}
	}

	// Get fresh data and use that instead
	console.log('fetched from API')
	fetchArticles()
})()
