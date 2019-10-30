(function() {
  "use strict";

  const quote = document.querySelector("#quote");
  const btn = document.querySelector("#getQuote");
  const endPoint = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
  const image = document.querySelector("#imgRon");

  const quotes = [];

  function getQuote() {
    fetch(endPoint)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(function(data) {
        const currentQuote = data[0];

        if (quotes.indexOf(currentQuote) > -1) {
          return getQuote();
        }

        quote.textContent = currentQuote;
        quotes.push(currentQuote);

        if (quotes.length > 50) {
          quotes = [];
        }
      })
      .catch(function(error) {
        quote.setAttribute("data-error", "true");
        quote.textContent = "Something went wrong. Please try again.";

        changeImage();
      });
  }

  getQuote();

  function changeImage() {
    image.setAttribute("src", "../../assets/ron.gif");
    image.setAttribute("alt", "Ron Swanson slipping");
  }

  btn.addEventListener("click", getQuote, false);
})();
