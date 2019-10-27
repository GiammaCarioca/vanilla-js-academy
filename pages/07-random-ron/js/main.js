(function() {
  "use strict";

  const quote = document.querySelector("#quote");
  const btn = document.querySelector("#getQuote");
  const endPoint = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
  const image = document.querySelector("#imgRon");

  function changeImage() {
    image.setAttribute("src", "../../assets/ron.gif");
    image.setAttribute("alt", "Ron Swanson slipping");
  }

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
        quote.textContent = data[0];
      })
      .catch(function(error) {
        console.warn("Error:", error.status, error.statusText);
        quote.setAttribute("data-error", "true");
        quote.textContent = "Something went wrong. Please try again.";

        changeImage();
      });
  }

  getQuote();

  btn.addEventListener("click", getQuote, false);
})();
