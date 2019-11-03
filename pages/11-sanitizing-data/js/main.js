(function() {
	'use strict';

	let app = document.querySelector('#app');
	const apiKey = 'cGKSCRZuXhcpv5wX59icpRRFGAqG4Mg8';
	const sections = ['arts', 'fashion', 'movies'];
	const numOfArticles = 5;

	/*!
	 * Sanitize and encode all HTML in a user-submitted string
	 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
	 * @param  {String} str  The user-submitted string
	 * @return {String} str  The sanitized string
	 */
	const sanitizeHTML = function(str) {
		const temp = document.createElement('div');
		temp.textContent = str;
		return temp.innerHTML;
	};

	function getJSON(response) {
		if (response.ok) return response.json();
		return Promise.reject(response);
	}

	function getTopStories(articles, numOfArticles) {
		const topStories = articles.slice(0, numOfArticles);
		return topStories;
	}

	function buildSection({ section, topStories }) {
		const articles = topStories
			.map(
				article => `
				<article>
          <h3><a href="${sanitizeHTML(article.url)}">${sanitizeHTML(
					article.title
				)}</a></h3>
            <p>${sanitizeHTML(article.byline)}</p>
            <p>${sanitizeHTML(article.abstract)}</p>
            <img src="${sanitizeHTML(
							article.multimedia[3].url
						)}" alt="${sanitizeHTML(article.multimedia[3].caption)}"/>
				</article>
				`
			)
			.join('');
		const HTMLString = `<section><h2>${section}</h2>${articles}</section>`;
		return HTMLString;
	}

	function renderApp(HTMLString) {
		app.innerHTML += HTMLString;
		return app;
	}

	sections.forEach(section =>
		fetch(
			`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`
		)
			.then(getJSON)
			.then(({ results }) => results)
			.then(articles => getTopStories(articles, numOfArticles))
			.then(topStories => buildSection({ section, topStories }))
			.then(renderApp)
			.catch(error => console.log('Something went wrong:', error))
	);
})();
