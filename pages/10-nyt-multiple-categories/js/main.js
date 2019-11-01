(function() {
	'use strict';

	const app = document.querySelector('#app');
	const apiKey = 'cGKSCRZuXhcpv5wX59icpRRFGAqG4Mg8';
	const categories = ['arts', 'fashion', 'movies'];

	function createSection(top5) {
		return top5
			.map(
				article => `
				<article>
          <h2><a href="${article.url}">${article.title}</a></h2>
            <p>${article.byline}</p>
            <p>${article.abstract}</p>
            <img src="${article.multimedia[3].url}" alt="${article.multimedia[3].caption}"/>
				</article>
				`
			)
			.join('');
	}

	function getTop5(articles) {
		const top5 = articles.slice(0, 5);
		return top5;
	}

	categories.map(category =>
		fetch(
			`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${apiKey}`
		)
			.then(function(response) {
				if (response.ok) return response.json();
				return Promise.reject(response);
			})
			.then(function(data) {
				// console.log(data.results);
				return data.results;
			})
			.then(function(articles) {
				// Get only 5 articles
				return getTop5(articles);
			})
			.then(function(top5) {
				// console.log(category, top5);
				return createSection(top5);
			})
			.then(function(section) {
				// console.log(section);
				return `<section><h2>${category.toUpperCase()}</h2>${section}</section>`;
			})
			.then(function(HTMLString) {
				console.log(HTMLString);
				app.innerHTML += HTMLString;
				return app;
			})
			.catch(function(error) {
				console.log('Something went wrong:', error);
			})
	);
})();

console.log(categories);
