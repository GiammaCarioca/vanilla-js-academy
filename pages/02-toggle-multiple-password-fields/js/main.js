(function() {
  "use strict";

  const toggle = document.querySelector("#show-passwords");
  const passwords = Array.prototype.slice.call(
    document.querySelectorAll('[type="password"]')
  );

  // Reset checkbox on Firefox
  if (toggle.checked) {
    toggle.checked = false;
  }

  function togglePasswords() {
    passwords.forEach(
      password => (password.type = this.checked ? "text" : "password")
    );
  }

  toggle.addEventListener("change", togglePasswords, false);
})();
