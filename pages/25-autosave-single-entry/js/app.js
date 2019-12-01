;(function() {
	'use strict'

	//
	// Variables
	//
	const form = document.querySelector('#save-me')

	//
	// Helper functions
	//

	/**
	 * Add an item to a localStorage() object
	 * @param {String} name  The localStorage() key
	 * @param {String} key   The localStorage() value object key
	 * @param {String} value The localStorage() value object value
	 */
	const addToLocalStorageObject = function(name, key, value) {
		// Get the existing data
		let existing = localStorage.getItem(name)

		// If no existing data, create an array
		// Otherwise, convert the localStorage string to an array
		existing = existing ? JSON.parse(existing) : {}

		// Add new data to localStorage Array
		existing[key] = value

		// Save back to localStorage
		localStorage.setItem(name, JSON.stringify(existing))
	}

	//
	// Methods
	//

	/**
	 * Handle submit events
	 * @param  {Event} event The event object
	 */
	const submitHandler = evt => {
		if (!evt.target.closest('form').matches('#save-me')) return

		if (!localStorage.data) return
		const savedFormData = JSON.parse(localStorage.data)

		for (let key in savedFormData) {
			if (savedFormData.hasOwnProperty(key)) {
				savedFormData[key] = null
			}
		}

		localStorage.setItem('data', JSON.stringify(savedFormData))
	}

	/**
	 * Handle input events
	 * @param  {Event} event The event object
	 */
	const inputHandler = evt => {
		if (!event.target.closest('#save-me')) return

		const name = 'data'
		const key = evt.target['name']
		const value = evt.target.value

		addToLocalStorageObject(name, key, value)
	}

	const populateForm = _ => {
		if (!localStorage.data) return
		const savedFormData = JSON.parse(localStorage.data)

		for (let [key, value] of Object.entries(savedFormData)) {
			if (savedFormData.hasOwnProperty(key)) {
				form[key].value = value
			}
		}
	}

	//
	// Inits & Event Listeners
	//

	// Load saved form data from localStorage
	populateForm()

	// Listen for input events
	document.addEventListener('input', inputHandler, false)

	// Listen for submit events
	document.addEventListener('submit', submitHandler, false)
})()
