const $ = (function() {
	'use strict'

	/**
	 * Create the constructor object
	 * @param {String} selector The selector to use
	 */
	const Constructor = function(selector) {
		this.elems = [...document.querySelectorAll(selector)]
	}

	/**
	 * Get the first item in a set of elements
	 * @return {*} The first item
	 */
	Constructor.prototype.getFirst = function() {
		return this.elems[0]
	}

	/**
	 * Get the last item in a set of elements
	 * @return {*} The last item
	 */
	Constructor.prototype.getLast = function() {
		return this.elems[this.elems.length - 1]
	}

	/**
	 * Add a class to every item in a set of elements
	 * @param {String} className The class to add
	 */
	Constructor.prototype.addClass = function(className) {
		this.elems.forEach(el => el.classList.add(className))
	}

	/**
	 * Remove a class to every item in a set of elements
	 * @param {String} className The class to remove
	 */
	Constructor.prototype.removeClass = function(className) {
		this.elems.forEach(el => el.classList.remove(className))
	}

	return Constructor
})()
