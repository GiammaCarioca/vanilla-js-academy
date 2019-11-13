;(function() {
	'use strict'

	const tableOfContents = document.querySelector('#table-of-contents')
	const headings = Array.prototype.slice.call(document.querySelectorAll('h2'))

	function createID(heading) {
		const id = heading.textContent
			.replace(new RegExp("'", 'g'), ' ')
			.replace(new RegExp(' ', 'g'), '-')
			.toLowerCase()
		return id
	}

	if (headings.length > 0) {
		headings.map(heading => {
			if (heading.id) return
			heading.id = createID(heading)
		})

		return (tableOfContents.innerHTML =
			'<h2>Table of Contents</h2>' +
			'<ol>' +
			headings
				.map(
					heading =>
						`<li><a href=#${heading.id}>${heading.textContent}</a></li>`
				)
				.join('') +
			'</ol>')
	}
})()
