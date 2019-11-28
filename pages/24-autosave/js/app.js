;(function() {
	'use strict'

	const form = document.querySelector('#save-me')

	const saveFormData = evt => {
		if (!evt.target.matches('input')) return
		localStorage.setItem(evt.target['name'], evt.target.value)
	}

	const handleSubmit = evt => {
		if (!evt.target.closest('form').matches('#save-me')) return
		localStorage.clear()
	}

	const populateForm = _ => {
		for (let item in localStorage) {
			if (localStorage.hasOwnProperty(item)) {
				form.children[item].value = localStorage.getItem(item)
			}
		}
	}

	populateForm()

	form.addEventListener('input', saveFormData, false)
	form.addEventListener('submit', handleSubmit, false)
})()
