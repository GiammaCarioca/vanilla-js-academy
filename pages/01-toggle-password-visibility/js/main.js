(function() {
  "use strict";

  const toggle = document.querySelector("#show-password");
  const password = document.querySelector("#password");

  // Reset checkbox on Firefox
  if (toggle.checked) {
    toggle.checked = false;
  }

  function togglePasswordVisibility() {
    password.type = this.checked ? "text" : "password";
  }

  toggle.addEventListener("change", togglePasswordVisibility, false);
})();
