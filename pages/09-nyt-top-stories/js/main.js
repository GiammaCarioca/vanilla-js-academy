(function() {
  "use strict";

  const app = document.querySelector("#app");

  const endpoint =
    "https://api.nytimes.com/svc/topstories/v2/fashion.json?api-key=cGKSCRZuXhcpv5wX59icpRRFGAqG4Mg8";

  fetch(endpoint)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(function(data) {
      console.log(data);
      app.innerHTML = renderStories(data.results);
    })
    .catch(function(err) {
      console.log(err);
    });

  const renderStories = function(stories) {
    return stories
      .map(story => `<h2><a href="${story.url}">${story.title}</a></h2>`)
      .join("");
  };
})();
