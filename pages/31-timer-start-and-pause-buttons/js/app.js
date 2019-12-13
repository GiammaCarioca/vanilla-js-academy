;(function() {
	'use strict'

	//
	// Variables
	//

	// Get the #app element from the DOM
	const app = document.querySelector('#app')

	// Store duration to a variable
	var duration = 120

	// The state/data object
	const data = {
		timer: duration,
		paused: false,
		done: false
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

	const formatTimer = _ => {
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
	const template = _ => {
		// If the timer is done, show a different UI
		if (data.done) {
			return '<p>⏰</p><button data-restart-timer>Restart Timer</button>'
		}

		return `<p>${formatTimer(
			data.timer
		)}</p><p><button data-pause-timer>Pause</button><button data-restart-timer>Restart</button></p>`
	}

	/**
	 * Render the template into the DOM
	 */
	const render = _ => {
		// If there are no updates to the UI, do nothing
		if (app.innerHTML === template()) return

		// Update the UI
		app.innerHTML = template()
	}

	/**
	 * Start the timer
	 */
	const startTimer = duration => {
		// Reset the data
		data.timer = duration
		data.done = false

		// Run an initial render
		render()

		// Update the timer every second
		countdown = setInterval(function() {
			// Get the new timer value
			let time = data.timer - 1

			// If the timer hits 0, set as done
			const done = time === 0 ? true : false

			// Update data and render new UI
			data.timer = time
			data.done = done

			// Render new UI
			render()

			// If the timer is done, stop it from running
			if (data.done) {
				clearInterval(countdown)
			}
		}, 1000)
	}

	/**
	 * Handle the click on the buttons
	 */
	const handleclick = event => {
		if (event.target.hasAttribute('data-pause-timer')) {
			if (data.done) return startTimer(data.timer)

			data.done = !data.done
			clearInterval(countdown)
			event.target.innerHTML = 'Start'
		}

		if (event.target.hasAttribute('data-restart-timer')) {
			clearInterval(countdown)
			startTimer(duration)
		}
	}

	//
	// Inits & Event Listeners
	//
	startTimer(duration)

	document.addEventListener('click', handleclick, false)
})()
