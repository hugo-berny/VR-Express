# Arquitectura

## Capas CSS (orden en `src/styles/main.css`)
| Capa | Carpeta | Contenido | Prefijo |
|---|---|---|---|
| tokens | `00-tokens/` | custom properties (unica fuente de valores) | `--color-*`, `--space-*`… |
| base | `01-base/` | reset, estilos de elementos | — |
| layout | `02-layout/` | primitivas (container, grid, stack) | `l-` |
| components | `03-components/` | un archivo por componente | `c-` |
| utilities | `04-utilities/` | helpers minimos | `u-` |

Reglas: una capa solo usa tokens y capas anteriores. Variantes = modificadores (`.c-btn--primary`) o custom properties locales (`--btn-bg`). Estilos de pagina especificos van en `src/pages/<pagina>/page.css` (solo composicion, nunca valores crudos).

Alta de componente: crear `03-components/<nombre>.css` + agregar `@import ... layer(components)` en `main.css`.

## JS
`main.js` → `core/dom.js` busca `[data-component]` y hace `import()` de `components/<nombre>.js` → `init(root)`. Sin estado global. `services/` encapsula red.

## Responsive
Mobile-first. Breakpoints: 48em (md), 64em (lg), 90em (xl). Unidades `rem`/`%`/`clamp()`; imagenes con `srcset` y `max-width:100%`. Verificacion en 375 / 768 / 1440.

## Estructura de pagina
`src/pages/<pagina>/index.html` (+ `page.css`, `page.js` si hace falta). `src/index.html` es el home.

## Subir / reemplazar material
Subir a `src/assets/_inbox/`. `asset-manager` lo mueve y actualiza `manifest.json`. Para reemplazar: subir con el mismo nombre logico y se sobrescribe la ruta registrada.
