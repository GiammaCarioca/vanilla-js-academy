(function() {
  "use strict";

  const app = document.querySelector("#app");
  const apiKey = "cGKSCRZuXhcpv5wX59icpRRFGAqG4Mg8";
  const endpoint = `https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${apiKey}`;

  const render = function(articles) {
    return articles
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
      .join("");
  };

  fetch(endpoint)
    .then(function(response) {
      if (response.ok) return response.json();
      return Promise.reject(response);
    })
    .then(function(data) {
      return render(data.results);
    })
    .then(function(htmlString) {
      app.innerHTML = htmlString;
      return app;
    })
    .catch(function(error) {
      console.log("Something went wrong:", error);
    });
})();
