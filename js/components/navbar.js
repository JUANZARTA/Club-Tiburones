/* ==========================================================================
   COMPONENTE: Navbar
   Template reutilizable. Para agregar el navbar a una página nueva:
   1) Poné <div id="navbar-placeholder"></div> al principio del <body>.
   2) Cargá este script ANTES de js/main.js.
   main.js se encarga de inyectarlo y de la lógica (menú mobile, scroll).
   ========================================================================== */

const NAVBAR_HTML = `
<nav class="navbar" id="navbar">
  <div class="container navbar__inner">
    <a href="#inicio" class="navbar__brand">
      <span class="navbar__logo-badge">
        <img src="assets/images/logo.png" alt="Escudo del Club Deportivo de Natación Tiburones" width="44" height="44">
      </span>
      <span class="navbar__brand-text">Club <strong>Tiburones</strong></span>
    </a>

    <ul class="navbar__links" id="navbar-links">
      <li><a href="#inicio">Inicio</a></li>
      <li><a href="#nosotros">Nosotros</a></li>
      <li><a href="#logros">Logros</a></li>
      <li><a href="#categorias">Categorías</a></li>
      <li><a href="#instalaciones">Instalaciones</a></li>
      <li><a href="#contacto">Contacto</a></li>
    </ul>

    <a href="https://wa.me/573207412254" target="_blank" rel="noopener" class="btn btn--accent navbar__cta">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.35 0-2.6-.32-3.7-.9L3 21l1.9-5.7A8.46 8.46 0 0 1 3.5 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z"/></svg>
      WhatsApp
    </a>

    <button class="navbar__toggle" id="navbar-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="navbar-links">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</nav>
`;
