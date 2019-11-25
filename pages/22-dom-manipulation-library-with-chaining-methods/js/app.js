;(function() {
	'use strict'

	// Get an array of items from the DOM
	const list = new $('li')
	const buttons = new $('button')

	// Get the first matching item from the DOM
	const firstListItem = list.getFirst()
	console.log(firstListItem.textContent)

	// Get the last matching item from the DOM
	const lastListItem = list.getLast()
	console.log(lastListItem.textContent)

	// Remove a class from, then add a class to, all matching elements
	buttons.removeClass('btn-blue').addClass('btn-purple')
})()
