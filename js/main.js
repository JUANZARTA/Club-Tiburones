/* ==========================================================================
   MAIN — inyecta los componentes y maneja la interacción de la página.
   Depende de que NAVBAR_HTML y FOOTER_HTML ya existan en el scope global
   (por eso navbar.js y footer.js se cargan antes que este archivo).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  injectComponents();
  fixCrossPageAnchors();
  setupMobileMenu();
  setupNavbarScroll();
  setupScrollReveal();
  setFooterYear();
  setupCarousels();
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

/* El navbar/footer son el mismo componente (NAVBAR_HTML/FOOTER_HTML) en
   todas las páginas del sitio, y están escritos como si vivieran en la
   raíz junto a index.html: rutas tipo "assets/..." y anclas tipo "#nosotros".
   Eso funciona tal cual en index.html. Para cualquier página adentro de
   /html/ (como galeria.html) hay que corregir esas rutas relativas:
   - "#seccion"        -> "../index.html#seccion" (volver al home y bajar)
   - "assets/..."       -> "../assets/..."
   - "html/galeria.html" -> "galeria.html" (ya estamos ahí, es la misma carpeta) */
function fixCrossPageAnchors() {
  const inSubfolder = /\/html\//.test(location.pathname);
  if (!inSubfolder) return;

  ["#navbar-placeholder", "#footer-placeholder"].forEach((rootSelector) => {
    const root = document.querySelector(rootSelector);
    if (!root) return;

    root.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.setAttribute("href", "../index.html" + link.getAttribute("href"));
    });

    root.querySelectorAll('img[src^="assets/"]').forEach((img) => {
      img.setAttribute("src", "../" + img.getAttribute("src"));
    });

    root.querySelectorAll('a[href="html/galeria.html"]').forEach((link) => {
      link.setAttribute("href", "galeria.html");
    });
  });
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

function setupCarousels() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".carousel").forEach((carousel) => {
    const track = carousel.querySelector(".carousel__track");
    const slides = Array.from(carousel.querySelectorAll(".carousel__slide"));
    const dotsWrap = carousel.querySelector(".carousel__dots");
    const prevBtn = carousel.querySelector(".carousel__btn--prev");
    const nextBtn = carousel.querySelector(".carousel__btn--next");
    if (!track || slides.length < 2) return;

    let index = 0;
    let timer = null;

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel__dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Ir a la foto ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function render() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      render();
    }

    function next() {
      goTo(index + 1);
    }

    function prev() {
      goTo(index - 1);
    }

    function startAutoplay() {
      if (reduceMotion) return;
      stopAutoplay();
      timer = setInterval(next, 5000);
    }

    function stopAutoplay() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    nextBtn?.addEventListener("click", () => { next(); startAutoplay(); });
    prevBtn?.addEventListener("click", () => { prev(); startAutoplay(); });
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", startAutoplay);

    render();
    startAutoplay();
  });
}
