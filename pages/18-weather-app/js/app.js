;(function() {
	'use strict'

	const apiKey = '0345d3e5744543d9b60ade7183f1456e'
	const weatherApi = 'https://api.weatherbit.io/v2.0/current'

	const app = document.querySelector('#app')

	/**
	 * Sanitize and encode all HTML in a user-submitted string
	 * @param  {String} str  The user-submitted string
	 * @return {String} str  The sanitized string
	 */
	const sanitizeHTML = function(str) {
		const temp = document.createElement('div')
		temp.textContent = str
		return temp.innerHTML
	}

	const renderWeather = weather => {
		app.innerHTML = `<img src="https://www.weatherbit.io/static/img/icons/${sanitizeHTML(
			weather.weather.icon
		)}.png" alt="${sanitizeHTML(
			weather.weather.description
		)}"></img><p>It is currently ${sanitizeHTML(
			weather.temp
		)} degrees <br/>in ${sanitizeHTML(weather.city_name)}.</p>`
	}

	fetch('https://ipapi.co/json')
		.then(response => {
			if (response.ok) {
				return response.json()
			} else {
				return Promise.reject(response)
			}
		})
		.then(data =>
			fetch(
				`${weatherApi}?&lat=${data.latitude}&lon=${data.longitude}&key=${apiKey}`
			)
		)
		.then(response => {
			if (response.ok) {
				return response.json()
			} else {
				return Promise.reject(response)
			}
		})
		.then(data => renderWeather(data.data[0]))
		.catch(_ => (app.textContent = 'Unable to get weather data at this time.'))
})()
