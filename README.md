# Club Deportivo de Natación Tiburones — Sitio web

Sitio con el contenido y las fotos reales del club (Popayán, Cauca). HTML + CSS + JS puro, sin frameworks ni build.

## Cómo verla

Doble clic en `index.html` y se abre en el navegador. No necesita servidor ni instalar nada.

## Estructura de carpetas

```
index.html              -> página principal, con todas las secciones
galeria/
  index.html            -> página con TODAS las fotos del club (galería completa) — URL limpia: /galeria/
calendario/
  index.html            -> próximos torneos (cards con cuenta regresiva real) + sección Noticias — URL limpia: /calendario/
css/
  variables.css         -> paleta oficial del club y tipografía (ÚNICA fuente de verdad)
  reset.css             -> normalización básica entre navegadores
  base.css              -> tipografía global, contenedores, utilidades
  components.css        -> botones, cards, carrusel, olas, burbujas, íconos
  layout.css            -> estilos del navbar y el footer
  sections.css          -> estilos propios de cada sección (hero, nosotros, etc.)
js/
  components/
    navbar.js           -> template del navbar (const NAVBAR_HTML)
    footer.js           -> template del footer (const FOOTER_HTML)
  main.js               -> inyecta navbar/footer, carrusel, menú mobile, scroll, animaciones
assets/
  images/               -> fotos y logo reales del club (ver detalle abajo)
```

## Secciones de la página

Inicio → Nosotros (carrusel + tarjeta de estadísticas) → Misión/Visión/Valores → Logros → Categorías y etapas → Cuerpo técnico → Contacto.

`index.html` ya no tiene secciones propias de "Instalaciones" ni "Galería": las fotos viven todas en `/galeria/` (el botón "Galería" del hero y el link del navbar/footer llevan ahí). Esa página tiene su propia sección "Instalaciones" (texto de la piscina + 4 fotos) y después el grid con el resto de las fotos.

Contacto no tiene formulario: es una tarjeta centrada (fondo celeste, sobre sección blanca) con el botón de WhatsApp como única acción — la ubicación y las redes están en el footer, no repetidas ahí. También hay un botón flotante de WhatsApp (esquina inferior derecha) presente en todas las páginas.

### Páginas internas: `/galeria/` y `/calendario/`

Cada página interna vive en su propia carpeta con un `index.html` adentro (`galeria/index.html`, `calendario/index.html`), **no** en un archivo `nombre.html` suelto. Es el truco estándar para que un hosting estático (GitHub Pages, Netlify, lo que sea) sirva `/galeria` y `/calendario` como URL limpia, sin `.html` ni carpetas intermedias — no hace falta backend ni configurar nada del lado del servidor, solo poner el archivo en esa ruta.

Si el club pide una página nueva, replicá el mismo patrón: carpeta `nombre-de-la-pagina/` con su `index.html` adentro. Dentro de esa página:

- Todos sus `<link>`/`<script src>` e imágenes (`assets/...`) llevan `../` adelante (`../css/variables.css`, `../assets/images/...`), porque vive un nivel más abajo que la raíz.
- El `<body>` lleva el atributo `data-subpage` (`<body data-subpage>`). El navbar y el footer son el mismo componente (`NAVBAR_HTML`/`FOOTER_HTML`) en todo el sitio, escrito pensando que vive en la raíz (links tipo `galeria/`, anclas tipo `#nosotros`). `main.js` (función `fixCrossPageAnchors`) busca ese atributo y ahí sí le antepone `../` a todos los links internos del navbar/footer automáticamente — no hay que tocar nada a mano, ni siquiera para una página nueva.

### Calendario de torneos

`/calendario/` muestra los próximos torneos en los que compite Tiburones, agrupados por torneo (no por categoría) para no repetir tarjetas. Cada categoría tiene su fecha de cierre de inscripción y la fecha/hora de la primera jornada. El texto "Faltan X días" **no está hardcodeado**: `main.js` (función `setupCountdowns`) lo calcula en el momento comparando la fecha de hoy contra el atributo `data-countdown="AAAA-MM-DDTHH:MM:00"` de cada pill, así nunca queda desactualizado. Si pasó la fecha, dice "Inscripciones cerradas" solo.

Para cargar un torneo nuevo: copiar un `<article class="event-card">` completo, cambiar el logo/nombre del club anfitrión, el nombre del torneo, y las categorías con sus fechas.

La sección "Noticias" (al final de esa misma página, `id="noticias"`) muestra el feed real de Facebook (`facebook.com/ClubDeporTiburones`) con el Page Plugin oficial de Meta — se actualiza solo, sin API key ni cuentas de terceros. **Importante**: el plugin de Facebook no carga si abrís el archivo con doble clic (`file://`); necesita que la página se sirva por `http(s)`, así que solo se ve bien una vez publicado el sitio (o corriendo un servidor local para probar).

Todo el contenido (historia, misión, visión, valores, logros, categorías, perfil del cuerpo técnico, características de la piscina, contacto) sale de `.docs/Info.txt` y `.docs/portafolio los tiburones.pdf` que pasó el club — no hay texto inventado.

## Cómo replicar el navbar/footer en una página nueva

Si el club pide más páginas, en cada una:

1. Copiá el `<head>` de `index.html` (mismos `<link>` de CSS y fuentes).
2. Poné `<div id="navbar-placeholder"></div>` justo después de abrir `<body>`.
3. Poné `<div id="footer-placeholder"></div>` antes de cerrar `</body>`.
4. Cargá los scripts en este orden, al final del body:
   ```html
   <script src="js/components/navbar.js"></script>
   <script src="js/components/footer.js"></script>
   <script src="js/main.js"></script>
   ```

`main.js` hace el resto (inyecta el HTML, activa el menú hamburguesa, arranca los carruseles, etc.).

## Paleta de colores y tipografía

Todo vive en `css/variables.css` como custom properties. Es la paleta **oficial** que pasó el club (`.docs/Copia de Paleta de colores.png`): navy `#0d043b`, azul `#22557a`, slate `#2b3d55`, rojo `#f32c43`. En el resto de los CSS no hay colores hardcodeados, todo usa `var(--...)` — si el club ajusta algún color, se cambia una sola vez acá y se actualiza todo el sitio.

## Íconos

No se usan emojis en ningún lado: todos los íconos son SVG en línea, estilo trazo simple (droplet, target, trophy, medalla, WhatsApp, Facebook, Instagram, etc.), coloreados con `currentColor` para heredar el color de marca automáticamente.

## Sobre las imágenes

Todas las fotos de `assets/images/` son del club (de `.docs/fotos/` y `.docs/Logo.jpeg`), redimensionadas y comprimidas para web:

- `logo.png` / `favicon.png` — escudo oficial del club.
- `hero-team.jpg` — foto de portada del equipo en la piscina olímpica.
- `carousel-1.jpg` a `carousel-5.jpg` — carrusel de la sección Nosotros (medallas, banderas, entrenador).
- `coach-team.jpg` — foto grupal con el cuerpo técnico, sección "Cuerpo técnico".
- `gallery-1.jpg` a `gallery-4.jpg` — sección "Instalaciones" dentro de `/galeria/`.
- `galeria-1.jpg` a `galeria-16.jpg` — grid "Todas las fotos" de `/galeria/`. `galeria-1.jpg` (entrenador con nadador, trofeo y medallas) va destacada más grande a propósito (`photo-grid__item--featured`), a pedido del club.

`/galeria/` es la única página que muestra todas las fotos juntas (reutiliza todos los archivos de arriba). De las fotos que fue mandando el club en `.docs/fotos/`, quedó **una sola sin usar**: `foto (10).jpeg`, que en realidad es una captura de pantalla borrosa de un logo personal, no una foto del club.

- `logo-delfines.png`, `logo-esturiones.png` — escudos de los clubes anfitriones de los torneos en `/calendario/` (no son del Club Tiburones, son de los otros clubes organizadores).

## Pendientes para cerrar con el club

- Confirmar que el número de WhatsApp (320 741 2254) y los links de Facebook/Instagram sean los vigentes.
- Si el club consigue el logo en formato vectorial (SVG/AI) o con fondo transparente, reemplazar `logo.png`/`favicon.png` mejora la nitidez en pantallas grandes.
