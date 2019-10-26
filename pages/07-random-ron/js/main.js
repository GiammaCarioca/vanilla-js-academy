(function() {
  "use strict";

  const btn = document.querySelector("button");
  const quote = document.querySelector("blockquote");

  function getQuote() {
    fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        quote.textContent = data;
      });
  }

  btn.addEventListener("click", getQuote, false);
})();
