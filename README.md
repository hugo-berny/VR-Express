# VR Express

Sitio estatico: HTML + CSS + JS vanilla, sin dependencias ni build. Backend opcional (Supabase) solo si hace falta.

## Uso
```bash
npm run dev      # http://localhost:5173  (sirve src/)
npm run audit    # valida tokens, breakpoints, sin CDN/librerias
```

## Setup de MCPs (una vez)
1. Figma: crea un Personal Access Token (read-only) y exportalo: `export FIGMA_API_KEY=...` (o copia `.env.example` → `.env`). `.mcp.json` ya define `figma` (Framelink) y `playwright`.
2. Abre Claude Code en este repo y aprueba los servidores MCP.
3. Baselines visuales: exporta cada frame de Figma como PNG 1x a `tests/visual/figma/<pagina>-375.png`, `-768.png`, `-1440.png`.

## Subir material
Deja imagenes/iconos/fuentes/video en `src/assets/_inbox/` y ejecuta `npm run images` (o pide "procesa el inbox" al agente `asset-manager`). Las imagenes se convierten a AVIF + WebP + fallback en anchos 400/800/1200/1920 (sin ampliar), el original queda en `images/raw/` y todo se registra en `manifest.json` con su `srcset`. Avisa si alguna supera 150 KB (`--budget=N` para cambiarlo; `--dry` simula). Para reemplazar un asset, sube el nuevo con el mismo nombre: se sobrescribe.
Requiere `npm install` una sola vez (sharp, solo desarrollo).

## Flujo con agentes
`/design-audit <pagina> <figma-url>` → revisas y decides cada hallazgo → `/build-page <pagina> <figma-url>` → `/verify-page <pagina>`.
Detalle: [docs/workflow.md](docs/workflow.md) · Reglas: [CLAUDE.md](CLAUDE.md) · Arquitectura: [docs/architecture.md](docs/architecture.md)

## Estructura
`src/` (publicable: `styles/` por capas, `scripts/` por modulos, `assets/`, `pages/`) · `specs/` · `docs/` · `reports/` · `tests/visual/` · `tools/` · `.claude/` (agentes y comandos)
