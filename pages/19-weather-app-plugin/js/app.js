var weatherPlugin = function(options) {
	'use script'

	//
	// Variables
	//

	// Store the weather API key to a variable for easier configuration
	var apiKey = '0345d3e5744543d9b60ade7183f1456e'

	// Defaults
	var defaults = {
		selector: 'div#app',
		tempScale: 'celsius',
		displayIcon: true
	}

	var settings = Object.assign(defaults, options)

	// Get the #app element
	var app = document.querySelector(settings.selector)

	//
	// Methods
	//

	/**
	 * Sanitize and encode all HTML in a user-submitted string
	 * @param  {String} str  The user-submitted string
	 * @return {String} str  The sanitized string
	 */
	var sanitizeHTML = function(str) {
		var temp = document.createElement('div')
		temp.textContent = str
		return temp.innerHTML
	}

	/**
	 * Convert celcius to fahrenheit
	 * @param  {String} temp The temperature in celcius
	 * @return {Number}      The temperature in fahrenheit
	 */
	var cToF = function(temp) {
		return (parseFloat(temp) * 9) / 5 + 32
	}

	/**
	 * Display icon
	 * @param  {String} icon The icon code
	 * @return {String}      The image to be displayed
	 */
	var displayIcon = function(icon) {
		return settings.displayIcon
			? '<img src="https://www.weatherbit.io/static/img/icons/' +
					icon +
					'.png">'
			: ''
	}

	/**
	 * Display temperature
	 * @param  {Number} temp The temperature
	 * @return {String}      The temp to be displayed on the scale chosen
	 */
	var displayTemp = function(temp) {
		console.log(typeof temp)
		return settings.tempScale === 'fahrenheit'
			? cToF(sanitizeHTML(temp)) + '°F '
			: sanitizeHTML(temp) + '°C '
	}

	/**
	 * Render the weather data into the DOM
	 * @param  {Object} weather The weather data object
	 */
	var renderWeather = function(weather) {
		app.innerHTML =
			'<p>' +
			displayIcon(weather.weather.icon) +
			'</p>' +
			'<p>It is currently ' +
			displayTemp(weather.temp) +
			sanitizeHTML(weather.weather.description).toLowerCase() +
			' in ' +
			sanitizeHTML(weather.city_name) +
			', ' +
			sanitizeHTML(weather.state_code) +
			'.</p>'
	}

	/**
	 * Display a message when no weather data can be found
	 */
	var renderNoWeather = function() {
		app.innerHTML = 'Unable to get weather data at this time. Sorry!'
	}

	//
	// Inits
	//

	// Get the user's location by IP address
	// Then, pass that into the weather API and get the current weather
	fetch('https://ipapi.co/json')
		.then(function(response) {
			if (response.ok) {
				return response.json()
			} else {
				return Promise.reject(response)
			}
		})
		.then(function(data) {
			// Pass data into another API request
			// Then, return the new Promise into the stream
			return fetch(
				'https://api.weatherbit.io/v2.0/current?key=' +
					apiKey +
					'&lat=' +
					data.latitude +
					'&lon=' +
					data.longitude
			)
		})
		.then(function(response) {
			if (response.ok) {
				return response.json()
			} else {
				return Promise.reject(response)
			}
		})
		.then(function(data) {
			// Pass the first weather item into a helper function to render the UI
			renderWeather(data.data[0])
		})
		.catch(function() {
			renderNoWeather()
		})
}

weatherPlugin({
	tempScale: 'fahrenheit',
	displayIcon: true
})
