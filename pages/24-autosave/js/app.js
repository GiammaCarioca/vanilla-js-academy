;(function() {
	'use strict'

	//
	// Variables
	//
	const form = document.querySelector('#save-me')

	//
	// Methods
	//

	/**
	 * Handle input events
	 * @param  {Event} event The event object
	 */
	const inputHandler = evt => {
		if (!event.target.closest('#save-me')) return
		localStorage.setItem(evt.target['name'], evt.target.value)
	}

	/**
	 * Handle submit events
	 * @param  {Event} event The event object
	 */
	const submitHandler = evt => {
		if (!evt.target.closest('form').matches('#save-me')) return
		localStorage.clear()
	}

	/**
	 * Load saved form data from localStorage
	 */
	const populateForm = _ => {
		for (let item in localStorage) {
			if (localStorage.hasOwnProperty(item)) {
				form[item].value = localStorage.getItem(item)
			}
		}
	}

	//
	// Inits & Event Listeners
	//

	// Load saved data from storage
	populateForm()

	// Listen for input events
	document.addEventListener('input', inputHandler, false)

	// Listen for submit events
	document.addEventListener('submit', submitHandler, false)
})()
