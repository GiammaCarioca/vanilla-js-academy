;(function() {
	'use strict'

	/**
	 * Element.closest() polyfill
	 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
	 */
	if (!Element.prototype.closest) {
		if (!Element.prototype.matches) {
			Element.prototype.matches =
				Element.prototype.msMatchesSelector ||
				Element.prototype.webkitMatchesSelector
		}
		Element.prototype.closest = function(s) {
			var el = this
			var ancestor = this
			if (!document.documentElement.contains(el)) return null
			do {
				if (ancestor.matches(s)) return ancestor
				ancestor = ancestor.parentElement
			} while (ancestor !== null)
			return null
		}
	}

	/**
	 * Randomly shuffle an array
	 * https://stackoverflow.com/a/2450976/1293256
	 * @param  {Array} array The array to shuffle
	 * @return {String}      The first item in the shuffled array
	 */
	const shuffle = function(array) {
		let currentIndex = array.length
		let temporaryValue, randomIndex
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex -= 1
			// And swap it with the current element.
			temporaryValue = array[currentIndex]
			array[currentIndex] = array[randomIndex]
			array[randomIndex] = temporaryValue
		}
		return array
	}

	// The monsters and socks
	const monsters = [
		'monster1',
		'monster2',
		'monster3',
		'monster4',
		'monster5',
		'monster6',
		'monster7',
		'monster8',
		'monster9',
		'monster10',
		'monster11',
		'sock'
	]

	const app = document.querySelector('#app')

	function revealCard(e) {
		const button = e.target.closest('button')

		if (!button) return
		const img = button.firstElementChild

		img.src = `./assets/svg/${img.dataset.card}.svg`
		img.alt = `${img.dataset.card}`
	}

	function createCells(monsters) {
		const door = 'door'
		return monsters.map(
			monster =>
				`<button type="button"><img src="assets/svg/${door}.svg" alt="${door}" data-card="${monster}"  ></button>`
		)
	}

	function buildGrid() {
		const cells = createCells(monsters)
		return (
			`<div class="row">` +
			shuffle(cells)
				.map(item => `<div class="grid" >${item}</div>`)
				.join('') +
			`</div>`
		)
	}

	function renderGrid() {
		app.innerHTML = buildGrid()
	}

	renderGrid()

	document.addEventListener('click', revealCard, false)
})()
