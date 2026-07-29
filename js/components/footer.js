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
      <span class="footer__logo" aria-hidden="true">🦈</span>
      <p>Club <strong>Tiburones</strong></p>
      <p class="footer__tagline">Formando deportistas, un largo a la vez.</p>
    </div>

    <div class="footer__col">
      <h4>Navegación</h4>
      <ul>
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#nosotros">Nosotros</a></li>
        <li><a href="#categorias">Categorías</a></li>
        <li><a href="#horarios">Horarios</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </div>

    <div class="footer__col">
      <h4>Contacto</h4>
      <ul>
        <li><a href="tel:+000000000">+00 000 000 000</a></li>
        <li><a href="mailto:info@clubtiburones.com">info@clubtiburones.com</a></li>
        <li>Dirección del club, ciudad</li>
      </ul>
    </div>

    <div class="footer__col">
      <h4>Seguinos</h4>
      <ul class="footer__social">
        <li><a href="#" aria-label="Instagram">Instagram</a></li>
        <li><a href="#" aria-label="Facebook">Facebook</a></li>
        <li><a href="#" aria-label="WhatsApp">WhatsApp</a></li>
      </ul>
    </div>
  </div>

  <div class="footer__bottom">
    <p>&copy; <span id="footer-year"></span> Club Tiburones. Todos los derechos reservados.</p>
  </div>
</footer>
`;
