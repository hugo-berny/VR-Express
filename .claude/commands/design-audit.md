---
description: Lee un frame de Figma y audita el diseño (solo reporta y propone)
argument-hint: <pagina> <figma-url>
---
Pagina/URL: $ARGUMENTS
1. Lanza el agente `figma-reader` con esa URL/frame.
2. Con su salida, lanza `design-auditor`.
3. Muestra al usuario solo el resumen por severidad y la ruta del reporte; pidele que complete `Decision:` en cada hallazgo (mantener / A / B). No avances ni corrijas nada.
