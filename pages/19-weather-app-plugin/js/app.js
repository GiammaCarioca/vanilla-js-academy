const getTheWeather = function(options) {
	'use script'

	/**
	 * Object.assign() polyfill
	 */
	// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	if (typeof Object.assign != 'function') {
		// Must be writable: true, enumerable: false, configurable: true
		Object.defineProperty(Object, 'assign', {
			value: function assign(target, varArgs) {
				// .length of function is 2
				'use strict'
				if (target == null) {
					// TypeError if undefined or null
					throw new TypeError('Cannot convert undefined or null to object')
				}

				var to = Object(target)

				for (var index = 1; index < arguments.length; index++) {
					var nextSource = arguments[index]

					if (nextSource != null) {
						// Skip over if undefined or null
						for (var nextKey in nextSource) {
							// Avoid bugs when hasOwnProperty is shadowed
							if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
								to[nextKey] = nextSource[nextKey]
							}
						}
					}
				}
				return to
			},
			writable: true,
			configurable: true
		})
	}

	//
	// Default settings
	//
	const defaults = {
		apiKey: null,
		selector: '#app',
		convertTemp: false,
		showIcon: true,
		description: 'It is currently {{temp}} and {{conditions}} in {{city}}.',
		noWeather: 'Unable to get weather data at this time. Sorry!'
	}

	// Merge user options into default settings
	const settings = Object.assign(defaults, options)

	//
	// Variables
	//

	// Get the #app element
	const app = document.querySelector(settings.selector)

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
		// If temperature should be converted, convert it
		if (settings.convertTemp) {
			return (parseFloat(temp) * 9) / 5 + 32
		}
		// Otherwise, return it as-is
		return temp
	}

	/**
	 * Display temperature
	 * @param  {Number} temp The temperature
	 * @return {String}      The temp to be displayed on the scale chosen
	 */
	const displayTemp = temp =>
		settings.convertTemp
			? `${cToF(sanitizeHTML(temp))} °F`
			: `${sanitizeHTML(temp)} °C`

	/**
	 * Get the icon for the current weather conditions
	 * @param  {Object} weather The weather object
	 * @return {String}         A markup string for the icon
	 */
	const getIcon = weather => {
		// If the icon is deactivated, return an empty string
		if (!settings.showIcon) return ''

		// Otherwise, return the icon
		const html = `<p><img src="https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png"></p>`
		return html
	}

	/**
	 * Get the description for the current weather conditions
	 * @param  {Object} weather The weather object
	 * @return {String}         A markup string for the weather description
	 */
	const getDescription = weather => {
		return settings.description
			.replace('{{temp}}', displayTemp(weather.temp))
			.replace(
				'{{conditions}}',
				sanitizeHTML(weather.weather.description).toLowerCase()
			)
			.replace('{{city}}', sanitizeHTML(weather.city_name))
			.replace('{{sunset}}', sanitizeHTML(weather.sunset))
	}

	/**
	 * Render the weather data into the DOM
	 * @param  {Object} weather The weather data object
	 */
	const renderWeather = weather =>
		(app.innerHTML = getIcon(weather) + `<p>${getDescription(weather)}</p>`)

	/**
	 * Display a message when no weather data can be found
	 */
	const renderNoWeather = _ => (app.innerHTML = settings.noWeather)

	//
	// Inits
	//

	// Don't run if no API key was provided
	if (!settings.apiKey) {
		console.warn('Please provide an API key.')
		return
	}

	// Get the user's location by IP address
	// Then, pass that into the weather API and get the current weather
	fetch('https://ipapi.co/json')
		.then(response =>
			response.ok ? response.json() : Promise.reject(response)
		)
		// Pass data into another API request
		// Then, return the new Promise into the stream
		.then(data =>
			fetch(
				`https://api.weatherbit.io/v2.0/current?key=${settings.apiKey}&lat=${data.latitude}&lon=${data.longitude}`
			)
		)
		.then(response =>
			response.ok ? response.json() : Promise.reject(response)
		)
		// Pass the first weather item into a helper function to render the UI
		.then(data => renderWeather(data.data[0]))
		.catch(_ => renderNoWeather())
}

// Initialize the plugin
getTheWeather({
	apiKey: '0345d3e5744543d9b60ade7183f1456e',
	convertTemp: true,
	description:
		"Right now in {{city}}, it's {{temp}} and {{conditions}}. The sunset will be at {{sunset}}.",
	noWeather: 'Unable to get weather data at this time. Try again later!'
})
