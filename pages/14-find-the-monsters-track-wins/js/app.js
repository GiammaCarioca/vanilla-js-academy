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
	let monstersFound = null

	function reset() {
		location.reload()
	}

	function youWin() {
		const body = document.querySelector('body')
		const div = document.createElement('div')
		const resetButton = document.createElement('button')

		app.closest('#app').remove()
		body.insertBefore(div, body.childNodes[2])
		div.textContent = 'You won! You found all of the monsters. Congrats!'
		body.insertBefore(resetButton, body.childNodes[3])
		resetButton.textContent = 'play again'
		resetButton.setAttribute('id', 'reset')
	}

	function gameOver() {
		const body = document.querySelector('body')
		const div = document.createElement('div')
		const resetButton = document.createElement('button')

		app.closest('#app').remove()
		body.insertBefore(div, body.childNodes[2])
		div.textContent = 'Oops, you found a sock!'
		body.insertBefore(resetButton, body.childNodes[3])
		resetButton.textContent = 'play again'
		resetButton.setAttribute('id', 'reset')
	}

	function handleClick(e) {
		const resetBtn = e.target.matches('#reset')
		if (resetBtn) {
			reset()
		}

		const monster = e.target.closest('[data-monster-id]')

		if (!monster) return
		const sock = monsters.findIndex(monster => monster === 'sock')
		const index = monster.getAttribute('data-monster-id')

		if (index == sock) return gameOver()

		if (monstersFound === monsters.length - 2) return youWin()

		monstersFound++
		monster.parentNode.innerHTML = `<img src="assets/svg/${monsters[index]}.svg" alt="${monsters[index]}">`
	}

	function createCells(monsters) {
		return monsters.map(
			(_, index) =>
				`<button type="button" data-monster-id="${index}"><img src="assets/svg/door.svg" alt="Click the door to see what\'s behind it"></button>`
		)
	}

	function buildGrid() {
		const cells = createCells(monsters)
		return (
			'<p>Click a door to reveal a monster. Try not to find the sock.</p>' +
			'<div class="row">' +
			shuffle(cells)
				.map(item => `<div class="grid" aria-live="polite">${item}</div>`)
				.join('') +
			'</div>'
		)
	}

	function renderGrid() {
		app.innerHTML = buildGrid()
	}

	renderGrid()

	document.addEventListener('click', handleClick, false)
})()
