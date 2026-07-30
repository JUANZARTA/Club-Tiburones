/* ==========================================================================
   COMPONENTE: Footer
   Template reutilizable. Para agregar el footer a una página nueva:
   1) Poné <div id="footer-placeholder"></div> antes de cerrar el <body>.
   2) Cargá este script ANTES de js/main.js.
   El año del copyright se completa solo (ver main.js).
   ========================================================================== */

const FOOTER_HTML = `
<footer class="footer">
  <div class="container footer__inner">
    <div class="footer__brand">
      <span class="footer__logo-badge">
        <img src="assets/images/logo.png" alt="Escudo del Club Deportivo de Natación Tiburones" width="64" height="64">
      </span>
      <p>Club Deportivo de Natación <strong>Tiburones</strong></p>
      <p class="footer__tagline">Formando nadadores en Popayán y el Cauca, un largo a la vez.</p>
    </div>

    <div class="footer__col">
      <h4>Navegación</h4>
      <ul>
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#nosotros">Nosotros</a></li>
        <li><a href="#logros">Logros</a></li>
        <li><a href="#categorias">Categorías</a></li>
        <li><a href="html/galeria.html">Galería</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </div>

    <div class="footer__col">
      <h4>Contacto</h4>
      <ul>
        <li><a href="https://wa.me/573207412254" target="_blank" rel="noopener">WhatsApp: 320 741 2254</a></li>
        <li>Vereda de Torres, Popayán, Cauca</li>
      </ul>
    </div>

    <div class="footer__col">
      <h4>Seguinos</h4>
      <ul class="footer__social">
        <li>
          <a href="https://www.instagram.com/clubdeportiburones" target="_blank" rel="noopener" aria-label="Instagram">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/ClubDeporTiburones" target="_blank" rel="noopener" aria-label="Facebook">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M14 8.5h-1.5c-.8 0-1.5.7-1.5 1.5v2h3l-.4 2.5H11V19"/></svg>
          </a>
        </li>
        <li>
          <a href="https://wa.me/573207412254" target="_blank" rel="noopener" aria-label="WhatsApp">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.35 0-2.6-.32-3.7-.9L3 21l1.9-5.7A8.46 8.46 0 0 1 3.5 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z"/></svg>
          </a>
        </li>
      </ul>
    </div>
  </div>

  <div class="footer__bottom">
    <p>&copy; <span id="footer-year"></span> Club Deportivo de Natación Tiburones. Todos los derechos reservados.</p>
  </div>
</footer>
`;
