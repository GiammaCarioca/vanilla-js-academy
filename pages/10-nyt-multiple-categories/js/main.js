(function() {
	'use strict';

	const app = document.querySelector('#app');
	const apiKey = 'cGKSCRZuXhcpv5wX59icpRRFGAqG4Mg8';
	const sections = ['arts', 'fashion', 'movies'];
	const numOfArticles = 5;

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
          <h3><a href="${article.url}">${article.title}</a></h3>
            <p>${article.byline}</p>
            <p>${article.abstract}</p>
            <img src="${article.multimedia[3].url}" alt="${article.multimedia[3].caption}"/>
				</article>
				`
			)
			.join('');
		const sectionTitle = section.toUpperCase();
		const HTMLString = `<section><h2>${sectionTitle}</h2>${articles}</section>`;
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
			.then(response => getJSON(response))
			.then(({ results }) => results)
			.then(articles => getTopStories(articles, numOfArticles))
			.then(topStories => buildSection({ section, topStories }))
			.then(HTMLString => renderApp(HTMLString))
			.catch(error => console.log('Something went wrong:', error))
	);
})();
