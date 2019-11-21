const tinyDOM = (function() {
	'use strict'

	// Holds our public methods
	const methods = {}

	//
	// Methods
	//

	/**
	 * Convert a NodeList to an array
	 * @param  {NodeList} nodeList The original
	 * @return {Array}             The array from the NodeList
	 */
	methods.makeArr = nodeList => Array.from(nodeList)

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
