/**
 * EKRAS YAPI A.S. - SUPPORT / COMPLAINT MODULE
 * Handles the customer support form:
 *   - Reads site content and project names from data.js
 *   - Validates and submits the form
 *   - Stores complaints in localStorage via data.js functions
 *   - Displays submitted complaints in a table
 *   - Google Sheets ready: replace addComplaint() body with fetch()
 */

(function () {
  "use strict";

  /* ─── Initialization ─── */
  function init() {
    if (typeof siteContent === "undefined") {
      console.error("[support.js] siteContent not found. Ensure data.js is loaded first.");
      return;
    }

    populateFormContent();
    populateProjectDropdown();
    bindFormEvents();
    renderComplaintsTable();
  }

  /* ─── Populate static text from data.js ─── */
  function populateFormContent() {
    var s = siteContent.support;

    var subtitle = document.getElementById("support-subtitle");
    if (subtitle) subtitle.textContent = s.pageSubtitle;

    var formTitle = document.getElementById("form-title");
    if (formTitle) formTitle.textContent = "Bildirim Formu";

    var formSubtitle = document.getElementById("form-subtitle");
    if (formSubtitle) formSubtitle.textContent = "Lutfen asagidaki formu eksiksiz doldurunuz";

    var submitBtn = document.getElementById("submit-btn");
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ' + s.submitButton;
    }

    var successText = document.getElementById("success-text");
    if (successText) successText.textContent = s.successMessage;

    // Info card
    var infoTitle = document.getElementById("info-title");
    if (infoTitle) infoTitle.textContent = s.infoBox.title;

    var infoDesc = document.getElementById("info-description");
    if (infoDesc) infoDesc.textContent = s.infoBox.description;

    var infoPhone = document.getElementById("info-phone");
    if (infoPhone) infoPhone.textContent = s.infoBox.phone;

    var infoEmail = document.getElementById("info-email");
    if (infoEmail) infoEmail.textContent = s.infoBox.email;

    var infoHours = document.getElementById("info-hours");
    if (infoHours) infoHours.textContent = s.infoBox.hours;

    // Subject dropdown from data.js
    var subjectSelect = document.getElementById("subject");
    if (subjectSelect && s.subjectOptions) {
      subjectSelect.innerHTML = "";
      s.subjectOptions.forEach(function (opt) {
        var option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.label;
        subjectSelect.appendChild(option);
      });
    }
  }

  /* ─── Populate project dropdown from data.js ─── */
  function populateProjectDropdown() {
    var select = document.getElementById("project");
    if (!select) return;

    // Clear existing options (keep the placeholder)
    select.innerHTML = '<option value="">Proje Secin</option>';

    if (typeof projectNames === "undefined" || !projectNames.length) {
      // Fallback: hardcoded list if data.js projects aren't available
      var fallback = [
        "Eksioglu Metsan Evleri",
        "Eksioglu Life City",
        "Eksioglu Konaklari 1. Etap",
        "Eksioglu Konaklari 2. Etap",
        "Eksioglu Konaklari 3. Etap",
        "Eksioglu Konaklari 4. Etap"
      ];
      fallback.forEach(function (name) {
        var option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
      });
      return;
    }

    projectNames.forEach(function (p) {
      var option = document.createElement("option");
      option.value = p.id;
      option.textContent = p.title;
      select.appendChild(option);
    });
  }

  /* ─── Form Events ─── */
  function bindFormEvents() {
    var form = document.getElementById("support-form");
    var successMsg = document.getElementById("form-success");
    var newRequestBtn = document.getElementById("new-request-btn");

    if (!form) return;

    // Submit handler
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validateForm(form)) return;

      // Gather data
      var complaint = {
        subject: getSelectText("subject"),
        project: getSelectText("project"),
        customerName: form.customerName.value.trim(),
        message: form.message.value.trim()
      };

      // ─── SAVE: Currently uses localStorage via data.js ───
      // TO CONNECT TO GOOGLE SHEETS:
      // Replace the next line with:
      //   fetch('YOUR_GOOGLE_SCRIPT_URL', {
      //     method: 'POST',
      //     body: JSON.stringify(complaint)
      //   })
      var saved = addComplaint(complaint);

      // Show success
      form.style.display = "none";
      if (successMsg) successMsg.classList.add("visible");

      // Refresh table
      renderComplaintsTable();

      // Show toast
      showToast("Bildiriminiz basariyla kaydedildi!");

      console.log("[support.js] Complaint saved:", saved);
    });

    // "New Request" button
    if (newRequestBtn) {
      newRequestBtn.addEventListener("click", function () {
        form.reset();
        clearValidation(form);
        form.style.display = "block";
        if (successMsg) successMsg.classList.remove("visible");
      });
    }
  }

  /* ─── Form Validation ─── */
  function validateForm(form) {
    var isValid = true;
    var fields = ["subject", "project", "customerName", "message"];

    fields.forEach(function (fieldName) {
      var field = form[fieldName];
      if (!field) return;

      field.classList.remove("error", "success");

      if (!field.value || !field.value.trim()) {
        field.classList.add("error");
        isValid = false;
      } else {
        field.classList.add("success");
      }
    });

    if (!isValid) {
      showToast("Lutfen tum zorunlu alanlari doldurun.", "error");
    }

    return isValid;
  }

  function clearValidation(form) {
    var fields = form.querySelectorAll(".form-control");
    fields.forEach(function (f) { f.classList.remove("error", "success"); });
  }

  /* ─── Get selected <option> text ─── */
  function getSelectText(id) {
    var select = document.getElementById(id);
    if (!select) return "";
    return select.options[select.selectedIndex].text;
  }

  /* ─── Render Complaints Table ─── */
  function renderComplaintsTable() {
    var tbody = document.getElementById("complaints-tbody");
    var emptyState = document.getElementById("empty-state");
    var table = document.getElementById("complaints-table");

    if (!tbody) return;

    // loadComplaints, getComplaints are from data.js
    var complaints = (typeof getComplaints === "function") ? getComplaints() : [];

    if (complaints.length === 0) {
      tbody.innerHTML = "";
      if (emptyState) emptyState.style.display = "block";
      if (table) table.style.display = "none";
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    if (table) table.style.display = "table";

    tbody.innerHTML = "";

    complaints.forEach(function (c) {
      var row = document.createElement("tr");

      // Format date
      var dateStr = "-";
      if (c.date) {
        var d = new Date(c.date);
        dateStr = d.toLocaleDateString("tr-TR") + " " + d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
      }

      // Status badge
      var statusClass = "status-waiting";
      var statusText = "Beklemede";
      if (c.status === "Islemde") { statusClass = "status-processing"; statusText = "Islemde"; }
      else if (c.status === "Cozuldu") { statusClass = "status-resolved"; statusText = "Cozuldu"; }

      row.innerHTML =
        '<td>' + escapeHtml(dateStr) + '</td>' +
        '<td><strong>' + escapeHtml(c.subject || "-") + '</strong></td>' +
        '<td>' + escapeHtml(c.project || "-") + '</td>' +
        '<td>' + escapeHtml(c.customerName || "-") + '</td>' +
        '<td>' + escapeHtml(truncate(c.message, 60)) + '</td>' +
        '<td><span class="status-badge ' + statusClass + '">' + statusText + '</span></td>';

      tbody.appendChild(row);
    });
  }

  /* ─── Helpers ─── */
  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function truncate(text, maxLength) {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  }

  function showToast(message, type) {
    var existing = document.querySelector(".toast");
    if (existing) existing.remove();

    var toast = document.createElement("div");
    toast.className = "toast" + (type === "error" ? " toast-error" : "");
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(function () { toast.classList.add("show"); });

    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () { toast.remove(); }, 450);
    }, 4000);
  }

  /* ─── Run ─── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
