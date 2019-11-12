(function() {
  "use strict";

  const tableOfContents = document.querySelector("#table-of-contents");
  const headings = Array.prototype.slice.call(document.querySelectorAll("h2"));

  if (headings.length > 0) {
    tableOfContents.innerHTML =
      "<h2>Table of Contents</h2>" +
      "<ol>" +
      headings
        .map(
          heading =>
            `<li><a href=#${heading.id}>${heading.textContent}</a></li>`
        )
        .join("") +
      "</ol>";
  }
})();
