const COSA = (function() {
	'use strict'

	/**
	 * The constructor object
	 */
	const Constructor = function(selector) {
		// Assign our properties
		this.selector = [...document.querySelectorAll(selector)]
	}

	//
	// Public methods
	//

	/**
	 * Get the first matching item from the DOM
	 */
	Constructor.prototype.getFirst = function() {
		return this.selector[0]
	}

	/**
	 * Get the last matching items from the DOM
	 */
	Constructor.prototype.getLast = function() {
		return this.selector[this.selector.length - 1]
	}

	/**
	 * Add a class to all elements in an array
	 */
	Constructor.prototype.addClass = function(className) {
		this.selector.forEach(item => item.classList.add(className))
	}

	/**
	 * Remove a class to all elements in an array
	 */
	Constructor.prototype.removeClass = function(className) {
		this.selector.forEach(item => item.classList.remove(className))
	}

	//
	// Return the constructor
	//

	return Constructor
})()
