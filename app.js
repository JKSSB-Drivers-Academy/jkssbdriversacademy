/* ===============================
   MASTER LAYOUT LOADER
================================= */

(function () {

  const repo = "/jkssbdriversacademy";

  // ========= LOAD NAVBAR =========
  fetch(`${repo}/navbar.html`)
    .then(res => {
      if (!res.ok) throw new Error("Navbar load failed");
      return res.text();
    })
    .then(html => {
      const navPlaceholder = document.getElementById("navbar-placeholder");
      if (navPlaceholder) {
        navPlaceholder.innerHTML = html;
        initMobileMenu();
        highlightActiveLink();
      }
    })
    .catch(err => console.error(err));


  // ========= LOAD FOOTER =========
  fetch(`${repo}/footer.html`)
    .then(res => {
      if (!res.ok) throw new Error("Footer load failed");
      return res.text();
    })
    .then(html => {
      const footerPlaceholder = document.getElementById("footer-placeholder");
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = html;
      }
    })
    .catch(err => console.error(err));


  // ========= HIGHLIGHT ACTIVE PAGE =========
  function highlightActiveLink() {
    const currentPage = location.pathname.split("/").pop();

    document.querySelectorAll(".nav-items a").forEach(link => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  }


  // ========= MOBILE SIDEBAR LOGIC =========
  function initMobileMenu() {
    const profileBtn = document.getElementById("mobileProfileBtn");
    const sidebar = document.getElementById("mobileSidebar");
    const overlay = document.getElementById("msOverlay");
    const accordion = document.querySelector(".ms-accordion");

    if (!profileBtn || !sidebar || !overlay) return;

    function toggleSidebar() {
      sidebar.classList.toggle("open");
      overlay.classList.toggle("show");
      profileBtn.classList.toggle("active");

      document.body.style.overflow =
        sidebar.classList.contains("open") ? "hidden" : "";
    }

    profileBtn.addEventListener("click", toggleSidebar);
    overlay.addEventListener("click", toggleSidebar);

    if (accordion) {
      accordion.addEventListener("click", () => {
        const expanded = accordion.getAttribute("aria-expanded") === "true";
        accordion.setAttribute("aria-expanded", String(!expanded));
      });
    }

    sidebar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", toggleSidebar);
    });
  }

})();
