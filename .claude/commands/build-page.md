---
description: Pipeline completo para construir una pagina desde Figma
argument-hint: <pagina> <figma-url>
---
Pagina/URL: $ARGUMENTS
Sigue `docs/workflow.md` en orden, un agente por paso, pasando solo rutas de archivos:
1. Si no existe `docs/design-audit/*<pagina>.md` con decisiones, ejecuta el flujo de `/design-audit` y DETENTE hasta que el usuario decida.
2. `architect` → `specs/<pagina>.md`.
3. `tokens-builder`.
4. `asset-manager` si hay archivos en `src/assets/_inbox/`.
5. `component-builder` por cada componente de la spec (en paralelo solo si no comparten archivos; `main.css` se edita en serie).
6. `qa-verifier`. Si hay FAIL, devuelve solo los fallos al `component-builder` correspondiente; maximo 2 ciclos, luego escala al usuario.
Si un agente devuelve `BLOQUEADO`, para y pregunta al usuario.
