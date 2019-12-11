;(function() {
	'use strict'

	//
	// Variables
	//
	const app = document.querySelector('#app')

	const data = {
		timer: 120
	}

	let count = data.timer

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

	const formatTimer = time => {
		const minutes = parseInt(time / 60, 10)
		const seconds = time % 60

		const paddedMinutes = minutes.toString().padStart(2, '0')
		const paddedSeconds = seconds.toString().padStart(2, '0')

		return `${paddedMinutes}:${paddedSeconds}`
	}

	const template = _ => {
		if (count === 0) {
			return '<p>⏰</p><button id="restart">Restart Timer</button>'
		}

		return `<p>${formatTimer(count)}</p>`
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
