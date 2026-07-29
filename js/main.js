/* ==========================================================================
   MAIN — inyecta los componentes y maneja la interacción de la página.
   Depende de que NAVBAR_HTML y FOOTER_HTML ya existan en el scope global
   (por eso navbar.js y footer.js se cargan antes que este archivo).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  injectComponents();
  setupMobileMenu();
  setupNavbarScroll();
  setupScrollReveal();
  setFooterYear();
});

function injectComponents() {
  const navbarSlot = document.getElementById("navbar-placeholder");
  const footerSlot = document.getElementById("footer-placeholder");

  if (navbarSlot && typeof NAVBAR_HTML !== "undefined") {
    navbarSlot.innerHTML = NAVBAR_HTML;
  }
  if (footerSlot && typeof FOOTER_HTML !== "undefined") {
    footerSlot.innerHTML = FOOTER_HTML;
  }
}

function setupMobileMenu() {
  const toggle = document.getElementById("navbar-toggle");
  const links = document.getElementById("navbar-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.classList.toggle("is-active", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupScrollReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

function setFooterYear() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
