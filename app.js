/* ===============================
   MASTER LAYOUT LOADER
   =============================== */

(function () {
  const repo = "/jkssbdriversacademy";

  // Load navbar
  fetch(`${repo}/navbar.html`)
    .then(res => {
      if (!res.ok) throw new Error("Navbar load failed");
      return res.text();
    })
    .then(html => {
      const navHolder = document.getElementById("navbar-placeholder");
      if (navHolder) navHolder.innerHTML = html;

      initMobileSidebar();
      highlightActiveLink();
    })
    .catch(err => console.error(err));

  // Inject page content (for future use)
  const contentHolder = document.getElementById("page-content");
  const page = document.body.dataset.page;

  if (contentHolder && page) {
    fetch(`${repo}/pages/${page}.html`)
      .then(res => res.text())
      .then(html => contentHolder.innerHTML = html)
      .catch(err => console.error("Page load failed", err));
  }

  /* ===============================
     MOBILE SIDEBAR LOGIC
     =============================== */
  function initMobileSidebar() {
    const btn = document.getElementById("mobileProfileBtn");
    const sidebar = document.getElementById("mobileSidebar");
    const overlay = document.getElementById("msOverlay");
    const accordion = document.querySelector(".ms-accordion");

    if (!btn || !sidebar || !overlay) return;

    function toggle() {
      sidebar.classList.toggle("open");
      overlay.classList.toggle("show");
      document.body.style.overflow =
        sidebar.classList.contains("open") ? "hidden" : "";
    }

    btn.onclick = toggle;
    overlay.onclick = toggle;

    if (accordion) {
      accordion.onclick = () => {
        const open = accordion.getAttribute("aria-expanded") === "true";
        accordion.setAttribute("aria-expanded", String(!open));
      };
    }

    sidebar.querySelectorAll("a").forEach(a => {
      a.onclick = toggle;
    });
  }

  /* ===============================
     ACTIVE LINK HIGHLIGHT
     =============================== */
  function highlightActiveLink() {
    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-items a, .ms-nav a").forEach(link => {
      if (link.getAttribute("href") === current) {
        link.classList.add("active");
      }
    });
  }
})();
