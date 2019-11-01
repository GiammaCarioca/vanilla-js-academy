(function() {
	'use strict';

	const app = document.querySelector('#app');
	const apiKey = 'cGKSCRZuXhcpv5wX59icpRRFGAqG4Mg8';
	const categories = ['arts', 'fashion', 'movies'];

	function getJSON(response) {
		if (response.ok) return response.json();
		return Promise.reject(response);
	}

	function getTopStories(articles, num) {
		const topStories = articles.slice(0, num);
		return topStories;
	}

	function buildArticle(topStories) {
		return topStories
			.map(
				story => `
				<article>
          <h2><a href="${story.url}">${story.title}</a></h2>
            <p>${story.byline}</p>
            <p>${story.abstract}</p>
            <img src="${story.multimedia[3].url}" alt="${story.multimedia[3].caption}"/>
				</article>
				`
			)
			.join('');
	}

	function renderApp(HTMLString) {
		app.innerHTML += HTMLString;
		return app;
	}

	categories.forEach(category =>
		fetch(
			`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${apiKey}`
		)
			.then(response => getJSON(response))
			.then(data => data.results)
			.then(articles => getTopStories(articles, 5))
			.then(topStories => buildArticle(topStories))
			.then(function(section) {
				return `<section><h2>${category}</h2>${section}</section>`;
			})
			.then(HTMLString => renderApp(HTMLString))
			.catch(error => console.log('Something went wrong:', error))
	);
})();
