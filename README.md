# Club Tiburones — Web base

Base de presentación para el cliente. HTML + CSS + JS puro (sin frameworks, sin build).

## Cómo verla

Doble clic en `index.html` y se abre en el navegador. No necesita servidor ni instalar nada.

## Estructura de carpetas

```
index.html              -> única página, con todas las secciones
css/
  variables.css         -> paleta de colores y tipografía (ÚNICA fuente de verdad)
  reset.css             -> normalización básica entre navegadores
  base.css              -> tipografía global, contenedores, utilidades
  layout.css            -> estilos del navbar y el footer
  components.css        -> botones, cards, ola divisoria, burbujas
  sections.css          -> estilos propios de cada sección (hero, nosotros, etc.)
js/
  components/
    navbar.js           -> template del navbar (const NAVBAR_HTML)
    footer.js           -> template del footer (const FOOTER_HTML)
  main.js               -> inyecta navbar/footer y maneja menú mobile, scroll, animaciones
assets/
  images/               -> fotos (ver "Sobre las imágenes" abajo)
  icons/                -> vacía, para íconos propios si hacen falta más adelante
```

## Cómo replicar el navbar/footer en una página nueva

Si el club pide más páginas (ej. `nosotros.html`, `contacto.html`), en cada una:

1. Copiá el `<head>` de `index.html` (mismos `<link>` de CSS y fuentes).
2. Poné `<div id="navbar-placeholder"></div>` justo después de abrir `<body>`.
3. Poné `<div id="footer-placeholder"></div>` antes de cerrar `</body>`.
4. Cargá los scripts en este orden, al final del body:
   ```html
   <script src="js/components/navbar.js"></script>
   <script src="js/components/footer.js"></script>
   <script src="js/main.js"></script>
   ```

`main.js` hace el resto (inyecta el HTML, activa el menú hamburguesa, etc.). No hay que tocar nada más.

## Paleta de colores y tipografía

Todo vive en `css/variables.css` como custom properties (`--color-...`, `--font-...`). En el resto de los CSS **no hay colores ni fuentes hardcodeadas**, todo usa `var(--...)`. Cuando el cliente confirme su marca:

- Si tiene logo/colores propios: cambiar los valores en `variables.css` y se actualiza todo el sitio solo.
- Si no tiene: esta paleta azul/turquesa queda como propuesta de diseño.

## Sobre las imágenes (IMPORTANTE antes de presentar/publicar)

Las fotos de `assets/images/` son de **Wikimedia Commons** (licencia Creative Commons, uso libre), puestas como placeholder para mostrar la idea de diseño:

- `hero-shark.jpg`, `about-shark.jpg`, `shark-closeup.jpg` — tiburones (temática del club).
- `pool-olympic.jpg`, `pool-indoor.jpg`, `pool-training.jpg` — piletas de referencia.

**Antes de la versión final, reemplazar por fotos reales del club** (instalaciones, alumnos, logo). Estas imágenes ya están comprimidas y livianas, pero no son del club.

## Pendientes para cerrar con el cliente

- Textos reales de Misión y Visión (buscar `TODO` en `index.html`).
- Logo del club (hoy se usa el emoji 🦈 como placeholder en navbar/footer).
- Datos reales de contacto, dirección y horarios (los actuales son de ejemplo).
- El formulario de contacto no envía nada todavía: hay que conectarlo a un servicio (Formspree, EmailJS) o a un backend propio.
