;(function() {
	'use strict'

	const API_KEY = '0345d3e5744543d9b60ade7183f1456e'
	const BASE_URL = 'https://api.weatherbit.io/v2.0/current'

	const app = document.querySelector('#app')

	fetch('https://ipapi.co/json')
		.then(response => response.json())
		.then(data =>
			fetch(
				`${BASE_URL}?&lat=${data.latitude}&lon=${data.longitude}&key=${API_KEY}`
			)
		)
		.then(response => response.json())
		.then(
			info =>
				(app.innerHTML = `<img src="https://www.weatherbit.io/static/img/icons/${info.data[0].weather.icon}.png" alt="${info.data[0].weather.description}"></img><p>It is currently ${info.data[0].temp} degrees in ${info.data[0].city_name}.</p>`)
		)
})()
