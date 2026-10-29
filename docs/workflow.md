# Pipeline de agentes

```
figma-reader → design-auditor ⏸(decision usuario) → architect → tokens-builder
   → component-builder (1 por componente) → asset-manager → qa-verifier
        ↑__________ fallos (max 2 ciclos) ___________|
```

| Paso | Agente | Entrada | Salida (archivo) |
|---|---|---|---|
| 1 | figma-reader | URL/node-id | `docs/figma-map.md` + `specs/<pagina>.data.md` |
| 2 | design-auditor | URL/node-id | `docs/design-audit/<fecha>-<pagina>.md` |
| ⏸ | usuario | reporte | edita `Decision:` en cada hallazgo (mantener / opcion A / opcion B) |
| 3 | architect | `*.data.md` + decisiones | `specs/<pagina>.md` |
| 4 | tokens-builder | spec | `src/styles/00-tokens/*` |
| 5 | component-builder | spec (1 seccion) | `src/**` + nota de handoff |
| 6 | asset-manager | `_inbox` + spec | `src/assets/**`, `manifest.json` |
| 7 | qa-verifier | pagina + baseline | `reports/<pagina>-<fecha>.md` |

Reglas: nada avanza si el paso previo devolvio `BLOQUEADO`. Hallazgos de diseño con `Decision: pendiente` bloquean al architect solo en lo afectado (se construye la version de Figma tal cual hasta que el usuario decida).

Repetir para otra pagina: `/build-page <nombre> <figma-url>`.
