/**
 * EKRAS YAPI A.S. - DYNAMIC PROJECT CARDS
 * Reads project data from data.js and renders cards into the page.
 * Also handles click events to navigate to the detail page.
 */

(function () {
  "use strict";

  // Wait for data.js to load (projects array is globally available)
  function initProjectCards() {
    if (typeof projects === "undefined" || !Array.isArray(projects)) {
      console.error("[projects.js] projects data not found. Make sure data.js is loaded before projects.js");
      return;
    }

    const grid = document.getElementById("projects-grid");
    if (!grid) {
      console.error("[projects.js] #projects-grid element not found in DOM");
      return;
    }

    // Clear any existing static cards
    grid.innerHTML = "";

    // Render each project as a card
    projects.forEach(function (project) {
      const card = document.createElement("div");
      card.className = "project-card";
      card.setAttribute("data-project-id", project.id);
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", project.title + " detayını görüntüle");

      card.innerHTML =
        '<div class="project-image">' +
          '<img src="' + project.image + '" alt="' + project.title + '" loading="lazy">' +
        '</div>' +
        '<div class="project-content">' +
          '<h3 class="project-title">' + escapeHtml(project.title) + '</h3>' +
          '<p class="project-location">' +
            '<i class="fas fa-map-marker-alt"></i>' +
            escapeHtml(project.location) +
          '</p>' +
        '</div>';

      // Click handler: navigate to detail page with query parameter
      card.addEventListener("click", function () {
        window.location.href = "project-detail.html?id=" + encodeURIComponent(project.id);
      });

      // Keyboard accessibility: Enter/Space triggers click
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.location.href = "project-detail.html?id=" + encodeURIComponent(project.id);
        }
      });

      grid.appendChild(card);
    });

    console.log("[projects.js] Rendered " + projects.length + " project cards.");
  }

  // Simple HTML escape helper to prevent XSS
  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProjectCards);
  } else {
    initProjectCards();
  }
})();
