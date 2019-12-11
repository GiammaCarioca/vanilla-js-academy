;(function() {
	'use strict'

	//
	// Variables
	//
	const app = document.querySelector('#app')

	const data = {
		timer: 60
	}

	let count = data.timer

	//
	// Methods
	//
	const template = _ => {
		if (count === 0) {
			return '<p>⏰</p><button id="restart">Restart Timer</button>'
		}

		return `<p>${count}</p>`
	}

	const render = _ => {
		app.innerHTML = template()
	}

	const startTimer = _ => {
		const countdown = setInterval(function() {
			render()

			count--

			if (count < 0) {
				clearInterval(countdown)
			}
		}, 1000)
	}

	const restartTimer = _ => {
		if (event.target.id === 'restart') {
			count = data.timer

			startTimer()
		}
	}

	//
	// Inits & Event Listeners
	//
	startTimer()

	document.addEventListener('click', restartTimer, false)
})()
