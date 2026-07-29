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
      <span class="navbar__logo" aria-hidden="true">🦈</span>
      <span class="navbar__brand-text">Club <strong>Tiburones</strong></span>
    </a>

    <ul class="navbar__links" id="navbar-links">
      <li><a href="#inicio">Inicio</a></li>
      <li><a href="#nosotros">Nosotros</a></li>
      <li><a href="#categorias">Categorías</a></li>
      <li><a href="#horarios">Horarios</a></li>
      <li><a href="#instalaciones">Instalaciones</a></li>
      <li><a href="#contacto">Contacto</a></li>
    </ul>

    <a href="#contacto" class="btn btn--accent navbar__cta">Inscribite</a>

    <button class="navbar__toggle" id="navbar-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="navbar-links">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</nav>
`;
