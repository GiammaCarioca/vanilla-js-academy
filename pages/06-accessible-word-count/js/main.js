(function() {
  "use strict";

  /**
   * String.prototype.trim() polyfill
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
   */
  if (!String.prototype.trim) {
    String.prototype.trim = function() {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };
  }

  const text = document.querySelector("#text");
  const count = document.querySelector("#count");

  function updateCount() {
    const chars = text.value.length;
    const words = text.value.split(/\s+/).filter(word => word.length > 0)
      .length;

    count.innerHTML = `You've written <strong>${words} words</strong> and <strong>${chars} characters</strong>.`;
  }

  // Keep character count on refresh
  updateCount();

  text.addEventListener("input", updateCount, false);
})();
