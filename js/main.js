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
  setupCountdowns();
  setupLightbox();
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
   raíz junto a index.html: rutas tipo "assets/...", anclas tipo "#nosotros"
   y links a páginas internas tipo "galeria/" o "calendario/#noticias".
   Eso funciona tal cual en index.html.

   Cada página interna (galeria/index.html, calendario/index.html, la que
   sea) vive UN nivel más abajo, en su propia carpeta — por eso lleva
   <body data-subpage> — y ahí hay que anteponerle "../" a todo lo que sea
   relativo a la raíz:
   - "#seccion"   -> "../#seccion"   (vuelve al home sin mostrar index.html)
   - "assets/..." -> "../assets/..."
   - "galeria/"   -> "../galeria/"   (cualquier link interno, incluido a
                                       sí misma: solo pega la vuelta, no
                                       rompe nada)
   Los links externos (http, mailto, tel) no se tocan. */
function fixCrossPageAnchors() {
  const isSubpage = document.body.hasAttribute("data-subpage");
  if (!isSubpage) return;

  ["#navbar-placeholder", "#footer-placeholder"].forEach((rootSelector) => {
    const root = document.querySelector(rootSelector);
    if (!root) return;

    root.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (/^(https?:|mailto:|tel:)/.test(href)) return;
      link.setAttribute("href", "../" + href);
    });

    root.querySelectorAll('img[src^="assets/"]').forEach((img) => {
      img.setAttribute("src", "../" + img.getAttribute("src"));
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

/* Calcula "Faltan X días" en base a la fecha de hoy, no a un número fijo
   escrito a mano (así nunca queda desactualizado). Cada pill trae la fecha
   límite en data-countdown, formato ISO: "2026-08-09T23:59:00". */
function setupCountdowns() {
  const pills = document.querySelectorAll("[data-countdown]");
  if (!pills.length) return;

  const now = new Date();

  pills.forEach((pill) => {
    const deadline = new Date(pill.dataset.countdown);
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysLeft = Math.ceil((deadline - now) / msPerDay);

    pill.classList.remove("countdown-pill--soon", "countdown-pill--closed");

    if (daysLeft < 0) {
      pill.textContent = "Inscripciones cerradas";
      pill.classList.add("countdown-pill--closed");
    } else if (daysLeft === 0) {
      pill.textContent = "Cierra hoy";
      pill.classList.add("countdown-pill--soon");
    } else {
      pill.textContent = daysLeft === 1 ? "Falta 1 día" : `Faltan ${daysLeft} días`;
      if (daysLeft <= 7) pill.classList.add("countdown-pill--soon");
    }
  });
}

/* Lightbox: cualquier foto dentro de un contenedor .lightbox-gallery
   (carrusel, galería, etc.) se puede abrir en tamaño completo. Si esa
   galería tiene más de una foto, aparecen flechas para pasar entre ellas.
   El overlay se arma una sola vez por JS y se reutiliza para todas. */
function setupLightbox() {
  const galleries = document.querySelectorAll(".lightbox-gallery");
  if (!galleries.length) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.innerHTML = `
    <button type="button" class="lightbox__nav lightbox__nav--prev" aria-label="Foto anterior">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 5 8 12 15 19"/></svg>
    </button>
    <img class="lightbox__img" src="" alt="">
    <button type="button" class="lightbox__nav lightbox__nav--next" aria-label="Foto siguiente">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 5 16 12 9 19"/></svg>
    </button>
    <button type="button" class="lightbox__close" aria-label="Cerrar">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
  `;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector(".lightbox__img");
  const prevBtn = overlay.querySelector(".lightbox__nav--prev");
  const nextBtn = overlay.querySelector(".lightbox__nav--next");

  let currentGroup = [];
  let currentIndex = 0;

  function show(index) {
    currentIndex = (index + currentGroup.length) % currentGroup.length;
    const img = currentGroup[currentIndex];
    imgEl.src = img.currentSrc || img.src;
    imgEl.alt = img.alt || "";
    const hasMultiple = currentGroup.length > 1;
    prevBtn.style.display = hasMultiple ? "flex" : "none";
    nextBtn.style.display = hasMultiple ? "flex" : "none";
  }

  function open(group, index) {
    currentGroup = group;
    show(index);
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  galleries.forEach((gallery) => {
    const imgs = Array.from(gallery.querySelectorAll("img"));
    imgs.forEach((img, i) => {
      img.addEventListener("click", () => open(imgs, i));
    });
  });

  prevBtn.addEventListener("click", () => show(currentIndex - 1));
  nextBtn.addEventListener("click", () => show(currentIndex + 1));
  overlay.querySelector(".lightbox__close").addEventListener("click", close);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(currentIndex + 1);
    if (e.key === "ArrowLeft") show(currentIndex - 1);
  });
}
