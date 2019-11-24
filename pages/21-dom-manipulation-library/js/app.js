;(function() {
	'use strict'

	//
	// Getting items from the DOM
	//

	// Get an array of items from the DOM
	const listItems = new COSA('li')
	console.log(listItems)

	// Get the first matching item from the DOM
	const firstListItem = listItems.getFirst()
	console.log(firstListItem.textContent)

	// Get the last matching item from the DOM
	const lastListItem = listItems.getLast()
	console.log(lastListItem.textContent)

	//
	// Adding/removing classes to/from matching elements
	//

	// Get an array of items from the DOM
	const buttons = new COSA('button')

	// Log the current class names
	console.log('Before removing/adding classes:', buttons.getFirst().className)

	// Remove a class from, then add a class to, all matching elements
	buttons.removeClass('btn-blue')
	buttons.addClass('btn-purple')

	// Log the new class names
	console.log('After removing/adding classes:', buttons.getFirst().className)
})()
