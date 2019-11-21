const tinyDOM = (function() {
	'use strict'

	// Holds our public methods
	const methods = {}

	//
	// Methods
	//

	/**
	 * Convert a NodeList to an array
	 * @param  {NodeList}
	 * @return {Array}
	 */
	methods.makeArr = nodeList => Array.from(nodeList)

	/**
	 * Get the first matching element in the DOM
	 * @param  {NodeList}
	 * @return
	 */
	methods.getFirst = function(elements) {
		return methods.makeArr(elements)[0]
	}

	/**
	 * Get all matching elements in the DOM as an array
	 * @param  {NodeList}
	 * @return {Array}
	 */
	methods.getElements = function(elements) {
		return methods.makeArr(elements)
	}

	/**
	 * Add a class from all elements in an array
	 * @param  {Array}  array
	 * @param  {String} string
	 * @return {Array}
	 */
	methods.addClass = (arr, className) =>
		arr.forEach(item => item.classList.add(className))

	/**
	 * Remove a class from all elements in an array
	 * @param  {Array}  array
	 * @param  {String} string
	 * @return {Array}
	 */
	methods.removeClass = (arr, className) =>
		arr.forEach(item => item.classList.remove(className))

	//
	// Return public methods
	//
	return methods
})()
