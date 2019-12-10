;(function() {
	'use strict'

	//
	// Variables
	//
	const btn = document.querySelector('button')

	let timer = 10

	//
	// Methods
	//
	const template = _ => {
		if (timer <= 0) {
			btn.style.display = 'inline-block'
			return '<p>⏰</p>'
		}

		return `<p>${timer}</p>`
	}

	const render = _ => {
		const display = document.querySelector('#display')
		if (!display) return
		display.innerHTML = template()
	}

	const startTimer = _ => {
		const countdown = setInterval(function() {
			timer--

			render()

			if (timer <= 0) {
				clearInterval(countdown)
			}
		}, 1000)
	}

	const restart = _ => {
		timer = 10
		btn.style.display = 'none'
		render()
		startTimer()
	}

	//
	// Inits & Event Listeners
	//
	render()
	startTimer()

	btn.addEventListener('click', restart, false)
})()
