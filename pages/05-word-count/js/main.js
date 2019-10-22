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
  const wordCount = document.querySelector("#word-count");
  const charCount = document.querySelector("#character-count");

  function updateCount() {
    charCount.textContent = text.value.length;
    wordCount.textContent = text.value
      .split(/\s+/)
      .filter(item => item.length > 0).length;
  }

  // Keep character count on refresh
  updateCount();

  text.addEventListener("input", updateCount, false);
})();
