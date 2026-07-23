/**
 * EKRAS YAPI A.S. - PROJECT DETAIL PAGE LOGIC
 * Reads the "id" query parameter from URL, finds the matching project
 * in data.js, and dynamically fills the detail page content.
 */

(function () {
  "use strict";

  function initDetailPage() {
    if (typeof projects === "undefined" || !Array.isArray(projects)) {
      console.error("[detail.js] projects data not found. Make sure data.js is loaded before detail.js");
      showError("Proje verileri yüklenemedi.");
      return;
    }

    // Extract ?id=XXX from URL
    var urlParams = new URLSearchParams(window.location.search);
    var projectId = urlParams.get("id");

    if (!projectId) {
      showError("Proje ID'si belirtilmemiş.");
      return;
    }

    // Find the project by id
    var project = projects.find(function (p) {
      return p.id === projectId;
    });

    if (!project) {
      showError('"' + escapeHtml(projectId) + '" ID\'li proje bulunamadı.');
      return;
    }

    // Fill page content
    fillProjectDetail(project);

    console.log("[detail.js] Loaded project: " + project.title);
  }

  function fillProjectDetail(project) {
    // Page title
    document.title = project.title + " | Ekras Yapı A.Ş.";

    // Breadcrumb project title
    var breadcrumbTitle = document.getElementById("detail-breadcrumb-title");
    if (breadcrumbTitle) breadcrumbTitle.textContent = project.title;

    // Main title
    var mainTitle = document.getElementById("detail-title");
    if (mainTitle) mainTitle.textContent = project.title;

    // Location
    var locationEl = document.getElementById("detail-location");
    if (locationEl) locationEl.innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + escapeHtml(project.location);

    // Hero image
    var heroImg = document.getElementById("detail-hero-image");
    if (heroImg) {
      heroImg.src = project.image;
      heroImg.alt = project.title;
    }

    // Description (convert newlines to <br>)
    var descEl = document.getElementById("detail-description");
    if (descEl) descEl.innerHTML = escapeHtml(project.description).replace(/\n/g, "<br>");

    // Specs table
    var specsTbody = document.getElementById("detail-specs-body");
    if (specsTbody && project.specs) {
      specsTbody.innerHTML = "";
      Object.keys(project.specs).forEach(function (key) {
        var row = document.createElement("tr");
        row.innerHTML =
          '<th>' + escapeHtml(key) + '</th>' +
          '<td>' + escapeHtml(project.specs[key]) + '</td>';
        specsTbody.appendChild(row);
      });
    }

    // Gallery
    var galleryGrid = document.getElementById("detail-gallery");
    if (galleryGrid && project.gallery) {
      galleryGrid.innerHTML = "";
      project.gallery.forEach(function (imgSrc, index) {
        var item = document.createElement("div");
        item.className = "detail-gallery-item";
        item.innerHTML = '<img src="' + imgSrc + '" alt="' + project.title + ' - Görsel ' + (index + 1) + '" loading="lazy">';

        // Lightbox click
        item.addEventListener("click", function () {
          openLightbox(imgSrc, project.title + " - Görsel " + (index + 1));
        });

        galleryGrid.appendChild(item);
      });
    }
  }

  function showError(message) {
    var container = document.querySelector(".detail-container");
    if (container) {
      container.innerHTML =
        '<div class="detail-error">' +
          '<i class="fas fa-exclamation-circle"></i>' +
          '<h2>Hata</h2>' +
          '<p>' + escapeHtml(message) + '</p>' +
          '<a href="index.html#projelerimiz" class="btn-primary">Projelere Dön</a>' +
        '</div>';
    }
    document.title = "Hata | Ekras Yapı A.Ş.";
  }

  // Simple HTML escape helper
  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Lightbox for gallery images
  function openLightbox(imgSrc, altText) {
    // Remove existing lightbox
    var existing = document.querySelector(".lightbox");
    if (existing) existing.remove();

    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML =
      '<div class="lightbox-overlay"></div>' +
      '<div class="lightbox-content">' +
        '<img src="' + imgSrc + '" alt="' + escapeHtml(altText) + '">' +
        '<button class="lightbox-close" aria-label="Kapat">' +
          '<i class="fas fa-times"></i>' +
        '</button>' +
      '</div>';

    document.body.appendChild(lightbox);
    document.body.style.overflow = "hidden";

    var closeFn = function () {
      lightbox.remove();
      document.body.style.overflow = "";
    };

    lightbox.querySelector(".lightbox-overlay").addEventListener("click", closeFn);
    lightbox.querySelector(".lightbox-close").addEventListener("click", closeFn);

    document.addEventListener("keydown", function escHandler(e) {
      if (e.key === "Escape") {
        closeFn();
        document.removeEventListener("keydown", escHandler);
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDetailPage);
  } else {
    initDetailPage();
  }
})();
