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
  const charCount = document.querySelector("#character-count");

  function handleTextInput() {
    charCount.textContent = text.value.trim().length;
  }

  // Keep character count on refresh
  handleTextInput();

  text.addEventListener("input", handleTextInput, false);
})();
