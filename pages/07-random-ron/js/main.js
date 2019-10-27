(function() {
  "use strict";

  const btn = document.querySelector("button");
  const blockquote = document.querySelector("blockquote");
  const endPoint = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

  function fetchQuote() {
    fetch(endPoint)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(function(data) {
        blockquote.textContent = data;
      })
      .catch(function(error) {
        console.warn("Error:", error.status, error.statusText);
        blockquote.setAttribute("data-error", "true");

        blockquote.textContent =
          "To quote Ron: 'I like saying no. It lowers their enthusiasm'. Seriously though, something actually went wrong. Please try again.";
      });
  }

  fetchQuote();

  btn.addEventListener("click", fetchQuote, false);
})();
