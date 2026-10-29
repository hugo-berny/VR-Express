# Spec: home
Figma: https://www.figma.com/design/PPh2wVGw7yF07KrgHUrhwa?node-id=1-4138 · frame node-id: 1:4054 (Desktop 1280x2990, fill #FFFFFF, column, alignItems center)
Fuentes: `specs/home.data.md`, `docs/design-audit/2026-10-29-home.md` (columna `Decision` completa: 18/18).

## Alcance por breakpoint
- Desktop (unico frame, 1280): se construye aplicando A-08 B (hero fluido), A-15 A (contenedor unico 1200), A-02 A, A-03 A, A-10 A, A-16 B.
- 375 / 768: BLOQUEADO: falta frame movil (~375) y tablet (~768) en Figma (A-01 = A: diseñar en Figma). Hasta que existan no se escriben reglas `min-width`; las reglas desktop van como base y se reordenaran mobile-first al recibir los frames.
- 1440: bandas a ancho completo (header, servicios, socios, carrusel, footer = 100% del viewport; en Figma ocupan el frame completo 1280). Contenido en `l-container` (max-width 1200) centrado.
- QA: diff visual comparable solo en 1440/1280 contra 1:4054, con diferencias esperadas por decisiones (ver "Diferencias esperadas vs Figma").

## Secciones (orden)
| # | Seccion | node-id | Componentes | Nuevo/Reuso |
|---|---|---|---|---|
| 1 | Header (en flujo, ver A-16) | 1:4095 (comp 1:4156) | `c-header` | Nuevo (reusable en otras paginas) |
| 2 | Hero2 | 1:4056 | `l-container` + `c-hero` | Nuevo |
| 3 | Que hacemos | 1:4061 | `l-container` + `c-intro` | Nuevo |
| 4 | Servicios Section | 1:4064 (comp 1:4140) | `c-services` + `l-container` | Nuevo |
| 5 | Testimonios | 1:4065 | `l-container` + `c-testimonials` + `c-review` x4 | Nuevo |
| 6 | Socios | 1:4072 | `c-partners` | Nuevo |
| 7 | CTA | 1:4082 | `l-container` + `c-cta` | Nuevo |
| 8 | Carrucel | 1:4086 | `c-carousel` (scroll-snap) | Nuevo |
| 9 | Footer | 1:4094 (comp 1:4403) | `c-footer` | Nuevo (reusable en otras paginas) |

Eliminados por A-16 B: espaciadores 1:4055 (176x109) y 1:4081 (573x110) no se construyen.
Reuso: `docs/design-system.md` vacio; el contenido de `src/styles/03-components/` y `00-tokens/` no se pudo listar (sin herramienta de listado; los directorios existen). Se asume nada reutilizable; si el builder encuentra un archivo con el mismo nombre, reutilizar y no duplicar.

## Tokens nuevos requeridos
A-12 = B: cada valor tokenizado tal cual (sin consolidar escala).

### Color
| Token | Valor | node-id |
|---|---|---|
| `--color-primary` | BLOQUEADO: falta hex del azul oscurecido (A-05 A: contraste >=4.5 vs #FFF, es decir luminancia relativa <=0.1833; actual #1D73E9 = 4.49). Provisional hasta confirmar: #1D73E9 | 1:4403, 1:4056, titulos |
| `--color-primary-15` | rgba(<primary>,0.15) (tal cual sobre el valor final del primario) | 1:4064 |
| `--color-primary-0` | rgba(<primary>,0) | 1:4164 |
| `--color-white` | #FFFFFF | 1:4054 |
| `--color-black` | #000000 | 1:4143;1:4170 |
| `--color-accent` | #FFBA0B | 1:4352, 1:4063 ts2 (A-04 mantener) |
| `--color-text-muted` | rgba(0,0,0,0.6) | 1:4143;1:4171, 1:4357, borde filas servicios |
| `--color-text-soft` | rgba(0,0,0,0.75) | 1:4063 |
| `--color-text-inverse-soft` | rgba(255,255,255,0.85) | 1:4059 |
| `--color-placeholder` | #D9D9D9 | 1:4359 |
Eliminado: `--color-primary-75` (A-06 A, el cargo pasa a color pleno).

### Tipografia
| Token | Valor | node-id |
|---|---|---|
| `--font-base` | "Afacad" (tambien header, A-13 A) | todo |
| `--fw-medium` / `--fw-semibold` / `--fw-bold` | 500 / 600 / 700 | varios |
| `--fs-76` | 76px | 1:4058 |
| `--fs-36` | 36px | 1:4083 (A-14 mantener) |
| `--fs-32` | 32px | 1:4059, 1:4062, 1:4066, 1:4073, 1:4142 |
| `--fs-24` | 24px | 1:4063, 1:4085 |
| `--fs-16` | 16px | 1:4159-1:4161, 1:4143 titulo, empresa review, 1:4406 |
| `--fs-15` | 15px | 1:4404 |
| `--fs-14` | 14px | descripcion servicio, texto review, cargo |
| `--lh-hero` | 0.91 | 1:4058 |
Eliminado: `--font-header` (A-13 A).

### Espaciado
| Token | Valor | node-id |
|---|---|---|
| `--space-neg-1` | -1px | 1:4141 (gap -1, A-16 B lo deja) |
| `--space-2` | 2px | bloque autor review |
| `--space-5` | 5px | 1:4084 padding vert. |
| `--space-6` | 6px | filas servicios padding vert. |
| `--space-7` | 7px | estrellas gap |
| `--space-10` | 10px | filas servicios padding horiz., footer padding vert., carrusel gap/padding horiz. |
| `--space-12` | 12px | header padding vert. 1:4095 (A-13: instancia) |
| `--space-19` | 19px | 1:4057 gap, 1:4084 padding horiz. |
| `--space-20` | 20px | 1:4061 gap, review gap (A-10 A), review padding vert., footer iconos gap |
| `--space-25` | 25px | footer texto-iconos |
| `--space-30` | 30px | review padding horiz., 1:4074 gap, CTA padding vert. |
| `--space-35` | 35px | 1:4056 gap |
| `--space-36` | 36px | 1:4067 gap |
| `--space-38` | 38px | 1:4056 padding horiz. |
| `--space-40` | 40px | header/footer padding horiz., servicios gap fila, socios gap, CTA padding horiz., carrusel padding inf. |
| `--space-44` | 44px | 1:4158 gap |
| `--space-55` | 55px | 1:4065 gap, 1:4082 gap |
| `--space-60` | 60px | 1:4065 padding vert., carrusel padding sup. |
| `--space-70` | 70px | 1:4072 padding vert. |
| `--space-80` | 80px | 1:4061 padding vert. |

### Tamaños
| Token | Valor | node-id |
|---|---|---|
| `--size-container` | 1200px | A-15 A (valor de la opcion aprobada; reemplaza 1213/1163/1155/1185/1030/1001) |
| `--size-tap` | 44px | A-07 A (area interactiva minima) |
| `--size-intro-text` | 1021px | 1:4063 (ancho de texto, cabe en 1200) |
| `--size-services-h` | 485px | 1:4064 |
| `--size-services-title-h` | 64px | 1:4142 |
| `--size-testimonials-title-h` | 38px | 1:4066 |
| `--size-review-author` | 220px | 1:4350 |
| `--size-star` | 28px | 1:4352 |
| `--size-avatar` | 39px | 1:4359 |
| `--size-partners-h` | 310px | 1:4072 |
| `--size-partner-logo` | 101px | 1:4075-1:4080 |
| `--size-cta-btn-w` / `--size-cta-btn-h` | 177px / 42px | 1:4084 (visual; area >=44 por A-07) |
| `--size-carousel-h` | 250px | 1:4087-1:4093 |
| `--ratio-hero` | 608 / 552 | 1:4060 (A-11 B) |
| `--ratio-carousel-377` / `-250` / `-200` / `-194` / `-189` | 377/250, 250/250, 200/250, 194/250, 189/250 | 1:4087 / 1:4089,1:4093 / 1:4088,1:4091 / 1:4092 / 1:4090 (A-11 B) |
| `--size-header-h` | 67px | 1:4095 |
| `--size-logo-w` / `--size-logo-h` | 212px / 43px | 1:4157 |
| `--size-contact-btn-w` / `-h` | 108px / 29px | 1:4162 (visual) |
| `--size-link-btn` | 40px | 1:4164 (visual) |
| `--size-link-icon-w` | 28px | 1:4165 |
| `--size-social-h` | 28px | 1:4408-1:4411 |
| `--size-social-fb` / `-ig` / `-tt` / `-x` (ancho) | 28 / 28 / 25 / 30 px | 1:4408 / 1:4409 / 1:4410 / 1:4411 |
| `--size-copyright-w` | 325px | 1:4404 |
| `--border-1` | 1px | filas servicios |
| `--border-1-8` | 1.8px | 1:4152 |
| `--stroke-2-5` | 2.5px | 1:4165 |
Eliminados vs spec anterior: `--size-page`, `--size-hero`, `--size-hero-col`, `--size-hero-h1-w/-h`, `--size-hero-sub-h`, `--size-hero-img-w/-h`, `--size-intro`, `--size-services-content`, `--size-testimonials`, `--size-testimonials-row`, `--size-review-w` (si se confirma 4 columnas), `--size-review-h-fixed`, `--size-spacer-*`, `--space-100`, `--color-primary-75`, `--font-header`.

### Radios y sombras
| Token | Valor | node-id |
|---|---|---|
| `--radius-3` | 3px | 1:4086, 1:4087-1:4093 |
| `--radius-8` | 8px | 1:4084 |
| `--radius-15` | 15px | 1:4068 |
| `--radius-17` | 17px | 1:4056 |
| `--radius-20` | 20px | 1:4164 |
| `--radius-21` | 21px | 1:4082 |
| `--radius-30` | 30px | 1:4152 |
| `--shadow-header` | 0 -3px 16.3px 0 rgba(0,0,0,0.25) | 1:4095 (provisional, ver A-13) |
| `--shadow-review` | 0 2px 12px 0 rgba(0,0,0,0.25) | 1:4068 |

## Componentes

### l-page / l-container (layout)
- Archivos: `02-layout/page.css` (compartido).
- `l-page`: ancho 100%, column, align-items center, fondo `--color-white`. Sin espaciadores (A-16 B).
- `l-container`: `max-width: var(--size-container)`, `width: 100%`, `margin-inline: auto`. Gutter lateral bajo 1200: BLOQUEADO (A-01).
- 375/768: BLOQUEADO (A-01). 1440: contenedor 1200 centrado.

### c-header (1:4095)
- Archivos: `03-components/header.css`. Sin JS (no hay nav movil en Figma; A-01 bloqueado).
- Estructura: en flujo normal (ya no absolute: sin espaciador 1:4055, A-16 B), ancho 100%, alto 67, fondo blanco, `--shadow-header`, row space-between center, padding 12 40.
  - Logo `<a>` img 212x43 (1:4157).
  - Nav row gap 44 (1:4158): "Servicios" (1:4159), "Garantía" (1:4160), "Rastrea tu envío" (1:4161, subrayado), boton "Contacto" (1:4162).
  - Texto: `--font-base` (Afacad) 600 16px `--color-primary` (A-13 A).
  - `c-header__contact`: visual 108x29, borde 1.8px `--color-primary`, radio 30 (1:4152).
- Tap targets (A-07 A): links y `c-header__contact` con area interactiva >= `--size-tap` (pseudo-elemento `::after` posicionado o padding) sin cambiar tamaño visual.
- Estados: BLOQUEADO: falta diseño de hover/focus/active en Figma (A-09 A). Mientras tanto: sin estilos de estado propios, conservar outline de foco nativo.
- A-13: BLOQUEADO: falta elegir sombra unica (instancia 1:4095 `0 -3 16.3` / padding 12 40 vs comp 1:4156 `0 5 7.4` / padding 10 40). Provisional: instancia 1:4095.
- Enlaces: BLOQUEADO: falta URL final. Provisional por frame: `/servicios` (1:4241), `/garantia` (1:4215), `/rastreo` (1:4261); "Contacto" sin hyperlink (frame `/contacto` 1:4349).
- Medidas: 1280/1440 = arriba. 375/768: BLOQUEADO (A-01).
- Contenido: "Servicios", "Garantía", "Rastrea tu envío", "Contacto".

### c-hero (1:4056)
- Archivos: `03-components/hero.css`
- Estructura (A-08 B + A-15 A): dentro de `l-container` (1200); grid de dos columnas `1fr 1fr`, gap 35, padding 0 38, align center, fondo `--color-primary`, radio 17.
  - `c-hero__text` (1:4057) column gap 19.
  - `c-hero__title` h1 (1:4058) Afacad 700 76px, line-height 0.91, blanco, ancho = columna (sin caja fija 642x169).
  - `c-hero__subtitle` (1:4059) Afacad 600 32px `--color-text-inverse-soft`, alto hug.
  - `c-hero__image` (1:4060) ancho 100% de su columna, `aspect-ratio: var(--ratio-hero)`, `object-fit: cover` (A-11 B).
- Medidas: 1280/1440: contenedor 1200 → columnas (1200 - 76 - 35)/2 = 544,5 px c/u. 375/768: BLOQUEADO (A-01).
- Assets: hero 1:4060 exportado con el crop de Figma (sufijo 6bd0cc). Alt: BLOQUEADO: falta alt en manifest (A-11 B).
- Contenido: "Importación express de EEUU a México" / "Somos tus aliados para importar en México de una manera segura y confiable."

### c-intro (1:4061)
- Archivos: `03-components/intro.css`
- Estructura: dentro de `l-container` (A-15), column, padding 80 0, gap 20, center.
  - `c-intro__title` h2 (1:4062) Afacad 600 32px center `--color-primary` (A-14 mantener).
  - `c-intro__text` p (1:4063) max-width 1021, Afacad 500 24px center `--color-text-soft`.
    - `<strong>` "VR Express": 700 (ts1).
    - `c-intro__highlight` "especialistas en importar": 600, `--color-accent` (A-04 mantener).
    - `c-intro__muted` ultima frase: `--color-text-muted` (ts3).
- Medidas: 1280/1440 = arriba. 375/768: BLOQUEADO.
- Contenido exacto: "Somos **VR Express**, **especialistas en importar** de Estados Unidos a México. Nos encargamos de todo el proceso: recibimos y almacenamos tu mercancía, gestionamos el despacho aduanal y la entregamos en destino, con seguimiento en tiempo real. Conocemos los permisos, normas y clasificación arancelaria de cada sector, para que tu importación llegue completa y en regla." (ts3 = "Conocemos los permisos, ... en regla.")

### c-services (1:4064, comp 1:4140; filas comp 1:4168/1:4169)
- Archivos: `03-components/services.css`
- Estructura: banda ancho 100%, alto 485, fondo `--color-primary-15`, column center. Contenido en `l-container` (1200, A-15 A; sustituye 1001 + padding 0 100).
  - `c-services__content` (1:4141) column, gap -1 (A-16 B: tal cual).
  - `c-services__title` h2 (1:4142) Afacad 700 32px center `--color-primary`, alto 64.
  - `c-services__row` x5 (un solo componente; A-16 B no unifica en Figma): row, padding 6 10, gap 40, align center; borde 1px `--color-text-muted`: primera fila arriba y abajo, resto solo abajo.
    - `c-services__name` Afacad 700 16px `--color-black`.
    - `c-services__desc` Afacad 500 14px `--color-text-muted`.
    - `c-services__link` visual 40x40, radio 20, fondo `--color-primary-0`, icono SVG 28 ancho, stroke `--color-primary` 2.5px (1:4164/1:4165); area interactiva >= 44 (A-07 A).
- BLOQUEADO: falta reparto de columnas titulo vs descripcion dentro de la fila.
- BLOQUEADO: falta destino de los Link Button.
- Estados: BLOQUEADO (A-09 A, falta diseño en Figma); foco nativo.
- Medidas: 1280/1440 = arriba. 375/768: BLOQUEADO.
- Assets: flecha 1:4165 (SVG).
- Contenido: 5 filas exactas de `specs/home.data.md` §4 (1:4143-1:4147). Fila 4 (1:4146) SIN salto manual tras "suplementos," (A-18 A).

### c-testimonials (1:4065)
- Archivos: `03-components/testimonials.css` (depende de `c-review`; mismo builder)
- Estructura: dentro de `l-container` (A-15), column, padding 60 0, gap 55, center.
  - `c-testimonials__title` h2 (1:4066) Afacad 700 32px center `--color-primary`, alto 38.
  - `c-testimonials__grid` (1:4067) gap 36 (A-02 A), 4 `c-review`.
- BLOQUEADO: falta elegir layout de A-02 A ("rejilla 2x2" o "4 columnas fluidas ~25%"). Provisional: 4 columnas `repeat(4, 1fr)` → (1200 - 3x36)/4 = 273 px por tarjeta. Si 2x2: 2 columnas de 371 (1:4350), ancho 778, centrada.
- Medidas: 1280/1440 = arriba. 375/768: BLOQUEADO.
- Contenido: "Lo que opinan nuestros clientes".

### c-review (comp 1:4350)
- Archivos: `03-components/review.css`
- Estructura: ancho = celda de la rejilla, fondo blanco, `--shadow-review`, radio 15, padding 20 30, column, gap 20, alto hug (A-10 A: una sola variante; se eliminan `--fixed` 245/40 y `--fixed-alt` 245/38). Tarjetas de una fila igualan alto por el stretch del grid.
  - `c-review__stars`: 5 estrellas 28x28 `--color-accent`, gap 7 (1:4352).
  - `c-review__text` Afacad 700 14px `--color-text-muted`. Limite de contenido ~240 caracteres (A-10 A): regla editorial, los 4 textos actuales cumplen (max 235); sin truncado CSS.
  - `c-review__author` ancho 220, gap 2: avatar SVG 39x39 `--color-placeholder` (1:4359); `c-review__company` Afacad 700 16px `--color-primary`; `c-review__role` Afacad 500 14px.
- `c-review__role` color (A-06 A): BLOQUEADO: falta elegir entre azul pleno `--color-primary` o gris `--color-text-muted`. Provisional: `--color-primary` (con A-05 resuelto pasa AA).
- BLOQUEADO: falta direccion y gap entre avatar y textos del autor.
- Medidas: 1280/1440 = arriba. 375/768: BLOQUEADO.
- Assets: estrella 1:4352 (SVG), avatar 1:4359 (SVG).
- Contenido: 4 reseñas exactas de `specs/home.data.md` §5 (1:4068-1:4071). 1:4071 sin cargo ("Juan C. Jacobo").

### c-partners (1:4072)
- Archivos: `03-components/partners.css`
- Estructura: banda ancho 100%, alto 310, column, padding 70 0, gap 40.
  - `c-partners__title` h2 (1:4073) Afacad 700 32px center `--color-primary`.
  - `c-partners__row` (1:4074) row center gap 30; 6 logos circulares 101x101 (radio 50%), fondo `--color-white`, `object-fit: contain` en los 6 (A-17 A).
- BLOQUEADO: falta alt/nombre de cada socio (manifest, A-11 B).
- Medidas: 1280/1440 = arriba. 375/768: BLOQUEADO.
- Assets: 1:4075-1:4080.
- Contenido: "Conoce a nuestros socios comerciales".

### c-cta (1:4082)
- Archivos: `03-components/cta.css`
- Estructura: dentro de `l-container` (1200, A-15 A; antes 1030), column, padding 30 40, gap 55, center, fondo `--color-primary`, radio 21. Sin espaciador previo 1:4081 (A-16 B).
  - `c-cta__title` (1:4083) Afacad 700 36px center blanco (A-14 mantener).
  - `c-cta__button` (1:4084) 177x42 visual, fondo blanco, radio 8, padding 5 19; `min-block-size: var(--size-tap)` (A-07 A); texto (1:4085) Afacad 700 24px center `--color-primary`.
- BLOQUEADO: falta destino de "Cotiza tu envío".
- Estados: BLOQUEADO (A-09 A).
- Medidas: 1280/1440 = arriba. 375/768: BLOQUEADO.
- Contenido: "Optimiza tu cadena de suministro con VR Express" / "Cotiza tu envío".

### c-carousel (1:4086)
- Archivos: `03-components/carousel.css`, `scripts/components/carousel.js` (`data-component="carousel"`, A-03 A).
- Estructura: banda ancho 100%, row, padding 60 10 40, gap 10, radio 3; `overflow-x: auto`, `scroll-snap-type: x mandatory`; cada imagen `scroll-snap-align: start`, alto 250, radio 3, `aspect-ratio` por token (A-11 B), `object-fit: cover`. Orden: 377, 200, 250, 189, 200, 194, 250 (1:4087-1:4093).
- JS: botones prev/next desplazan el track (`scrollBy`). BLOQUEADO: falta diseño de controles prev/next en Figma (icono, tamaño, posicion, estados). Hasta entonces: construir solo CSS scroll-snap; `carousel.js` no se escribe.
- Autoplay: no (A-03 A no lo pide).
- BLOQUEADO: falta alt de las 7 imagenes (manifest, A-11 B).
- Medidas: 1280/1440 = arriba. 375/768: BLOQUEADO.
- Assets: 1:4087-1:4093.

### c-footer (1:4094, comp 1:4403)
- Archivos: `03-components/footer.css`, `scripts/components/footer.js` (`data-component="footer"`, A-18 A: año generado).
- Estructura: banda ancho 100%, alto hug, row space-between center, padding 10 40, fondo `--color-primary`.
  - `c-footer__copy` (1:4404) Afacad 500 15px blanco, ancho 325. Año en `<span data-year>`; `init(root)` escribe `new Date().getFullYear()`; texto HTML por defecto "2025".
  - `c-footer__social`: texto (1:4406) Afacad 500 16px blanco; gap 25 con lista de iconos (gap 20): Facebook 28x28, Instagram 28x28, TikTok 25x28, X 30x28; cada enlace con area >= 44 (A-07 A).
- BLOQUEADO: falta URL de cada red social.
- Estados: BLOQUEADO (A-09 A).
- Medidas: 1280/1440 = arriba. 375/768: BLOQUEADO.
- Assets: 1:4408-1:4411.
- Contenido: "Copyright © <año> VR Express is a registered trademark of VRI Freight S.A. de C.V. All rights reserved." / "Síguenos en redes sociales".

## Archivos y paralelismo
| Paso | Tarea | Archivos | Paralelo |
|---|---|---|---|
| 1 | Tokens | `src/styles/00-tokens/*` (compartido) | No: un solo builder, antes que todo |
| 1b | Layout | `src/styles/02-layout/page.css` (`l-page`, `l-container`) (compartido) | No: mismo builder que tokens |
| 2a | c-header | `03-components/header.css` | Si |
| 2b | c-hero | `03-components/hero.css` | Si |
| 2c | c-intro | `03-components/intro.css` | Si |
| 2d | c-services | `03-components/services.css` | Si |
| 2e | c-review + c-testimonials | `03-components/review.css`, `testimonials.css` | Si (mismo builder) |
| 2f | c-partners | `03-components/partners.css` | Si |
| 2g | c-cta | `03-components/cta.css` | Si |
| 2h | c-carousel | `03-components/carousel.css` (`scripts/components/carousel.js` bloqueado) | Si |
| 2i | c-footer | `03-components/footer.css`, `scripts/components/footer.js` | Si |
| 3 | Integracion | HTML de la home (ruta segun `docs/architecture.md`), hoja de entrada/imports CSS, registro de modulos JS | No: compartidos, un solo integrador al final |

## Assets requeridos (via `src/assets/_inbox/` → asset-manager)
| Uso | node-id | Tipo | imageRef |
|---|---|---|---|
| Logo header | 1:4157 | png | e7e5d0be7f4f5227b8bb58187c336ccecd236253 |
| Hero (recortado) | 1:4060 | png | 2cb09a0bb3a5db49f341d3b4078fbe5fff8bcbf7 (crop 6bd0cc) |
| Socios x6 | 1:4075-1:4080 | png | ver `specs/home.data.md` §6 |
| Carrusel x7 | 1:4087-1:4093 | png | ver `specs/home.data.md` §9 |
| Facebook / Instagram / TikTok / X | 1:4408 / 1:4409 / 1:4410 / 1:4411 | png | ver §10 (TikTok crop 3cf150, X crop 127880) |
| Flecha link | 1:4165 | svg | vector |
| Avatar | 1:4359 | svg | vector |
| Estrella | 1:4352 | svg | vector |
| Fuente Afacad 500/600/700 | — | woff2 local | BLOQUEADO: falta archivo (no se permite CDN) |
| Alt de hero, socios x6, carrusel x7 | — | texto en manifest | BLOQUEADO: falta texto (A-11 B) |
Ya no requerida: fuente ITF Devanagari Marathi (A-13 A).

## Datos faltantes (resumen de BLOQUEADO)
1. Frames movil 375 y tablet 768 (A-01 A).
2. Hex del azul primario oscurecido >=4.5:1 (A-05 A).
3. Layout testimonios: 2x2 vs 4 columnas (A-02 A).
4. Color del cargo: azul pleno vs gris 0.6 (A-06 A).
5. Sombra/padding unico del header: 1:4095 vs 1:4156 (A-13 A).
6. Diseño de estados hover/focus/active (A-09 A).
7. Diseño de controles prev/next del carrusel (A-03 A).
8. Alt de hero, socios y carrusel (A-11 B).
9. URLs: header (final), Contacto, Link Button servicios, "Cotiza tu envío", redes sociales.
10. Reparto de columnas en fila de servicios; direccion/gap avatar-autor en review.
11. Archivo woff2 de Afacad.

## Diferencias esperadas vs Figma (por decisiones)
- Sin franja blanca de 42px entre header y hero (1:4055 eliminado, header en flujo) ni de 110px antes del CTA (1:4081).
- Hero, intro, servicios, testimonios y CTA a 1200 de ancho; hero en 2 columnas iguales.
- Testimonios en rejilla sin desborde; reseñas de alto igual por fila, gap 20.
- Carrusel con scroll horizontal (scroll-snap) en vez de desborde.
- Header en Afacad; logos de socios en contain; año del copyright dinamico; sin `<br>` en 1:4146.

## Decisiones de diseño aplicadas
| Hallazgo | Decision |
|---|---|
| A-01 sin movil/tablet | A → diseñar en Figma: 375/768 BLOQUEADO hasta recibir frames; sin media queries por ahora |
| A-02 testimonios desbordan | A → rejilla gap 36; 2x2 vs 4 col BLOQUEADO (provisional 4 col fluidas) |
| A-03 carrusel sin comportamiento | A → scroll-snap; controles prev/next BLOQUEADO (falta diseño); alt BLOQUEADO |
| A-04 amarillo sobre blanco | mantener → `--color-accent` en ts2 |
| A-05 azul 4.49:1 | A → oscurecer `--color-primary` a >=4.5; hex BLOQUEADO (provisional #1D73E9) |
| A-06 cargo azul 75% | A → color pleno; azul vs gris BLOQUEADO (provisional `--color-primary`); se elimina `--color-primary-75` |
| A-07 tap targets <44 | A → area interactiva >= `--size-tap` 44px sin cambiar tamaño visual (header, Contacto, Link Button, CTA, redes) |
| A-08 hero desborda | B → hero fluido `1fr 1fr`, H1 al ancho de columna |
| A-09 estados no definidos | A → diseñar en Figma: BLOQUEADO; foco nativo mientras tanto |
| A-10 reseñas inconsistentes | A → una variante, alto hug (stretch), gap 20, limite editorial ~240 caracteres |
| A-11 imagenes sin alt/responsive | B → `object-fit: cover` + `aspect-ratio` por token; alt desde manifest (BLOQUEADO texto) |
| A-12 tokens casi duplicados | B → tokenizar valores tal cual |
| A-13 fuente/sombra header | A → Afacad en header; sombra unica BLOQUEADO (provisional 1:4095) |
| A-14 jerarquia tipografica | mantener → "¿Qué hacemos?" 600, CTA 36 |
| A-15 anchos sin sistema | A → `--size-container` 1200 unico en hero, intro, servicios, testimonios, CTA |
| A-16 espaciadores / nombres | B → espaciadores 1:4055 y 1:4081 no se construyen; header en flujo; gap -1 tal cual; nombres Figma sin cambios |
| A-17 ajuste logos socios | A → los 6 en contain sobre fondo blanco |
| A-18 salto manual / año fijo | A → sin `<br>` en 1:4146; año via `footer.js` |

## Criterios de aceptacion
- Diff visual ≤ umbral en 1440 contra 1:4054, descontando "Diferencias esperadas vs Figma". 375/768: no evaluables hasta A-01.
- Sin errores de consola, sin valores crudos fuera de tokens.
- Areas interactivas >= 44x44 en todos los enlaces/botones (A-07).
- Contraste AA de `--color-primary` sobre blanco >= 4.5 cuando se resuelva A-05.
- `footer.js` exporta `init(root)` y escribe el año actual.
