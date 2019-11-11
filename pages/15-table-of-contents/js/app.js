;(function() {
	'use strict'

	const table = document.querySelector('#table-of-contents')
	const h2 = Array.prototype.slice.call(document.querySelectorAll('h2'))

	h2.forEach(function(heading) {
		return (table.innerHTML += `
			<li><a href="#${heading.id}">${heading.textContent}</a></li>
		`)
	})
})()
