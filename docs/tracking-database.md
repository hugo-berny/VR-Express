# Rastreo con Google Sheets — plan

Estado: PLANEACION (nada conectado aun). Contrato de datos destino: `src/scripts/services/tracking.js` (`buscarPedido`).

## Decision de arquitectura
```
Cliente edita Google Sheet (privado, dueño = cliente)
        │  lee
Apps Script "Web App" (vive DENTRO del Sheet, corre como el dueño)
        │  GET ?pedido=VR09324  → JSON solo con campos publicos
Pagina /rastreo  (services/tracking.js, fetch)
```
- El Sheet **nunca se publica**. Solo el Web App es publico y solo responde a una busqueda por numero (no hay forma de listar ni descargar la base).
- Sin backend propio ni costo: Apps Script es gratis y vive en la cuenta Google del cliente → el cliente es dueño de todo.
- Reemplaza el `rpc` de Supabase solo para rastreo; `supabase.js` queda intacto para otros usos.
- Una "base completa bloqueada + otra pagina que consulta" = exactamente esto: el Sheet completo es privado, el Web App es la "ventana" de consulta.

## Estructura del Sheet (3 pestañas)

### 1. `Pedidos` (la unica que el cliente edita a diario)
Una fila = un envio. Se llena de izquierda a derecha; las fechas se van llenando conforme avanza el envio.

| Col | Campo | Tipo / validacion | Publico |
|---|---|---|---|
| A | Número de pedido | Texto, unico, formato `^[A-Z0-9-]{4,32}$` (rechaza duplicados y espacios) | si |
| B | Cliente | Texto libre | **no** (interno) |
| C | Tracking Number | Texto | si |
| D | Dirección de entrega | Texto | si, solo en paso "Entrega" (confirmar con cliente) |
| E | Fecha estimada de entrega | Fecha (selector) | si |
| F | Fecha: Recibido en almacén | Fecha | si |
| G | Fecha: Proceso aduanal | Fecha | si |
| H | Fecha: En tránsito | Fecha | si |
| I | Ubicación actual (en tránsito) | Texto | si |
| J | Fecha: Entregado | Fecha | si |
| K | **Estatus** | **Formula automatica, columna protegida** | si |
| L | Notas internas | Texto libre | **no** |

Estatus automatico (el cliente nunca lo escribe, no hay error de captura):
`=SI(J2<>"";"Entregado";SI(H2<>"";"En tránsito";SI(G2<>"";"En proceso aduanal";SI(F2<>"";"Recibido en almacén";SI(A2<>"";"Registrado";"")))))`

A prueba de errores: validacion de datos en A/E–J, fechas con selector, formato de tabla con filtros, columna K y encabezados protegidos (advertencia al editar), fila 1 congelada, formato condicional (fila verde = entregado, roja = sin fecha estimada).

### 2. `Archivo`
Mismas columnas. El menu **"VR Express → Archivar entregados"** mueve a esta pestaña las filas con fecha de entrega de hace +30 dias. La pagina busca en `Pedidos` y luego en `Archivo`, asi un cliente final puede consultar su pedido ya entregado. Es opcional: si no archivan, todo sigue funcionando.

### 3. `Configuración`
Textos fijos de la ruta: ubicacion de "Recibido en almacén" (p. ej. *Laredo, Texas, EE. UU.*), de "Proceso aduanal" (*México*), y el dominio permitido. Asi el cliente cambia textos sin tocar codigo ni la pagina.

Pestaña extra `Instrucciones`: 6 lineas de como agregar un pedido y avanzar su estatus.

## Mapeo al contrato de la pagina (`ruta`)
Cada pedido produce 4 pasos fijos (los del diseño de Figma):
1. Envío recibido en almacén ← F, ubicacion de Configuración
2. Proceso aduanal completado ← G, ubicacion de Configuración
3. En tránsito ← H, ubicacion = I
4. Entrega ← J, ubicacion = D
`estado`: `completado` si tiene fecha, `actual` el primero sin fecha tras el ultimo completado, `pendiente` el resto. Si hay fecha de entrega, los 4 quedan `completado`.

## Seguridad / privacidad
- Web App devuelve una lista blanca de campos; nunca `Cliente`, `Notas`, ni otros pedidos.
- Numeros secuenciales (`VR09324`) se pueden adivinar → por eso no se expone nada personal. Mitigacion extra: limite de consultas por minuto con `CacheService`. Recomendable usar numeros no consecutivos.
- Dirección completa de entrega visible a quien conozca el número → decidir si se acorta (solo ciudad) o se quita.
- La URL del Web App va en `config.js` (no es secreto; no da acceso al Sheet).

## Cambios previstos en el repo (fase siguiente)
- `src/scripts/core/config.js`: `trackingApiUrl`.
- `src/scripts/services/tracking.js`: nueva rama `fromSheets(numero)` (fetch GET, sin headers custom para evitar preflight CORS) y quitar el mock cuando exista URL.
- Fuera de `src/`: `integrations/google-sheets/Code.gs` (script a pegar en el Sheet) + plantilla `.xlsx` para importar con todo el formato.
- Sin tocar HTML/CSS de la pagina.

## Alternativas descartadas
- Una sola hoja plana con una fila por evento (historial): mas flexible pero obliga a repetir numero/tracking en cada fila → mas errores. Solo vale si las etapas no son fijas.
- Publicar el Sheet como CSV: expone toda la base. No.
- Supabase: robusto pero el cliente depende de un panel desconocido. No cumple "dueño y familiarizado".

## Pendientes del usuario
1. ¿Las 4 etapas son siempre las mismas? (asumido: si)
2. ¿Quien crea el Sheet: el cliente desde su cuenta Google? (necesario para que sea dueño)
3. ¿Se muestra la dirección completa, solo ciudad, o nada?
4. ¿Archivo tras 30 dias esta bien?

## DECISIONES (actualizacion) — manda sobre lo anterior
- Etapas fijas: 1 Bodega Laredo → 2 Proceso aduanal → 3 Bodega México → 4 Entrega (domicilio). Ya no hay "En tránsito" ni "Ubicación actual".
- Ubicaciones: solo ciudad/país, salvo Entrega = domicilio (calle y número).
- Archivado automatico a los 30 dias de entregado (trigger diario) + menu manual.
- Fuente de verdad de columnas y logica: `integrations/google-sheets/Code.gs` (`configurarHoja` arma todo el formato).
- Handoff: el Sheet se crea en la cuenta del desarrollador; el cliente hace "Archivo > Hacer una copia". Los triggers y el despliegue Web App NO se copian: el cliente debe volver a ejecutar "Activar archivado automático" e "Implementar" el Web App → URL nueva en `config.js`.
