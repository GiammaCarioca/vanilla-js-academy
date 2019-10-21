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
  const counter = document.querySelector("#character-count");

  if (!text) return;

  text.value = "";

  function handleTextInput() {
    const trimmedText = text.value.trim();
    counter.textContent = trimmedText.length;
  }

  text.addEventListener("input", handleTextInput, false);
})();
