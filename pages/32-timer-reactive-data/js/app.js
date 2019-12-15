;(function() {
	'use strict'

	//
	// Variables
	//

	// Get the #app element from the DOM
	const app = document.querySelector('#app')

	// Store duration to a variable
	const duration = 120

	// The state/data object
	const data = {
		timer: duration,
		done: false,
		paused: true
	}

	// A placeholder for the countdown interval
	let countdown

	//
	// Methods
	//

	/**
	 * String.prototype.padStart() polyfill
	 * https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
	 */
	if (!String.prototype.padStart) {
		String.prototype.padStart = function padStart(targetLength, padString) {
			targetLength = targetLength >> 0 //truncate if number or convert non-number to 0;
			padString = String(typeof padString !== 'undefined' ? padString : ' ')
			if (this.length > targetLength) {
				return String(this)
			} else {
				targetLength = targetLength - this.length
				if (targetLength > padString.length) {
					padString += padString.repeat(targetLength / padString.length) //append to original to ensure we are longer than needed
				}
				return padString.slice(0, targetLength) + String(this)
			}
		}
	}

	const formatTimer = function() {
		// Get the minutes and seconds
		const minutes = parseInt(data.timer / 60, 10)
		const seconds = data.timer % 60

		const paddedMinutes = minutes.toString()
		const paddedSeconds = seconds.toString().padStart(2, '0')

		return paddedMinutes + ':' + paddedSeconds
	}

	/**
	 * Get the template markup
	 * @return {String} The HTML string
	 */
	const template = function() {
		// If the timer is done, show a different UI
		if (data.done) {
			return '<p>⏰</p><button data-restart-timer>Restart Timer</button>'
		}

		// Create the markup string
		const html =
			`<p>${formatTimer(data.timer)}</p>` +
			'<p>' +
			(data.paused
				? '<button data-start-timer>Start</button>'
				: '<button data-pause-timer>Pause</button>') +
			' <button data-restart-timer>Restart</button></p>'

		return html
	}

	/**
	 * Render the template into the DOM
	 */
	const render = function() {
		// If there are no updates to the UI, do nothing
		if (app.innerHTML === template()) return

		// Update the UI
		app.innerHTML = template()
	}

	/**
	 * Reactively update the data object
	 * @param {Object} obj The updated data
	 */
	const setData = obj => {
		// Update the data object
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				data[key] = obj[key]
			}
		}

		// Render a new UI
		render()
	}

	/**
	 * Stop the countdown
	 */
	const stopCountdown = function() {
		setData({ ...data, paused: true })
		clearInterval(countdown)
	}

	/**
	 * Update the timer every second
	 */
	const startCountdown = function() {
		setData({ ...data, paused: false })

		countdown = setInterval(function() {
			// Get the new timer value
			let time = data.timer - 1

			// If the timer hits 0, set as done
			const done = time === 0 ? true : false

			setData({ ...data, timer: time, done: done })

			// If the timer is done, stop it from running
			if (done) {
				stopCountdown()
			}
		}, 1000)
	}

	/**
	 * Start the timer
	 */
	const startTimer = function() {
		// Reset the data
		setData({ ...data, timer: duration, done: false })

		// Clear any existing timers
		stopCountdown()

		// Update the timer every second
		startCountdown()
	}

	/**
	 * Handle click events
	 * @return {Event} The event object
	 */
	const clickhandler = event => {
		// If a restart button was clicked, start the timer
		if (event.target.hasAttribute('data-restart-timer')) {
			startTimer()
		}

		// If the start button was clicked, start the timer
		// Restart the countdown
		if (event.target.hasAttribute('data-start-timer')) {
			startCountdown()
		}

		// If the pause button was clicked, pause the timer
		// Stop the countdown
		if (event.target.hasAttribute('data-pause-timer')) {
			stopCountdown()
		}
	}

	//
	// Inits & Event Listeners
	//

	// Render the timer on page load
	render()

	document.addEventListener('click', clickhandler, false)
})()
