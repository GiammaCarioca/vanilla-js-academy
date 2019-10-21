(function() {
  "use strict";

  /**
   * Element.matches() polyfill (simple version)
   * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
   */
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
  }

  // Reset checkboxes on Firefox
  const checkboxes = Array.prototype.slice.call(
    document.querySelectorAll('[type="checkbox"]')
  );

  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  function togglePasswordVisibility(event) {
    if (event.target.matches("[data-toggle]")) {
      const toggle = event.target;
      const form = toggle.closest("form");
      const passwords = Array.prototype.slice.call(
        form.querySelectorAll("[data-password]")
      );

      passwords.forEach(password => {
        password.type = toggle.checked ? "text" : "password";
      });
    }
  }

  document.addEventListener("click", togglePasswordVisibility, false);
})();
