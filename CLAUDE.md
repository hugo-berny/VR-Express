# VR Express — reglas del proyecto

Sitio estatico front-end. Diseño fuente: Figma (via MCP `figma`). Verificacion visual: MCP `playwright`.

## Reglas duras
1. **Solo HTML + CSS + JS vanilla** (ES modules nativos). Prohibido: frameworks, librerias, CDN, bundlers, preprocesadores, `npm install` en `src/`.
2. **Sin backend.** Datos opcionales via `src/scripts/services/supabase.js` (REST + anon key, import dinamico, funciones finas).
3. **CSS modular por capas** (`tokens, base, layout, components, utilities`). Ningun valor crudo (color, tamaño, espacio, radio, sombra) fuera de `src/styles/00-tokens/`. Un componente = un archivo en `03-components/`, clases BEM-lite con prefijo (`l-` layout, `c-` componente, `u-` utilidad), mobile-first con `min-width` en 48em / 64em / 90em unicamente.
4. **JS**: un modulo por componente interactivo en `scripts/components/<nombre>.js` con `export function init(root)`; se activa con `data-component="<nombre>"`.
5. **Assets**: el usuario sube a `src/assets/_inbox/`; `asset-manager` clasifica, nombra `<seccion>-<descripcion>-<variante>.<ext>` y registra en `src/assets/manifest.json`.
6. **No sobre-ingeniar**: no crear archivos/componentes que Figma no pida.

## Reglas para todos los agentes (anti-alucinacion, ahorro de tokens)
- Lee SOLO los archivos que tu spec/tarea lista. No explores el repo completo.
- No inventes valores. Si falta un dato: responde `BLOQUEADO: falta <x>` y para.
- Cita la fuente de cada dato: `node-id` de Figma o ruta de spec.
- Handoff por archivo (`specs/`, `docs/design-audit/`, `reports/`), no por prosa.
- Respuestas cortas, formato de plantilla, sin relleno.
- Respeta tu lista "NO hacer". Nunca corrijas el diseño de Figma: reporta y propone.
- Bucle QA → builder: maximo 2 iteraciones, luego escala al usuario.

## Flujo
Ver `docs/workflow.md`. Comandos: `/design-audit`, `/build-page`, `/verify-page`.
Arquitectura: `docs/architecture.md`. Design system: `docs/design-system.md`.
