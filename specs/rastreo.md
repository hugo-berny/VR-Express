# Spec: rastreo
Fuente: captura `tests/visual/figma/rastreo.png` (escala ~1.14, frame 1280). La API de Figma devolvio 429, asi que NO hay node-id por elemento ni medidas exactas. Nodo de la seccion: 1:4261.

## Componentes
- `c-tracking` (`03-components/tracking.css`): pagina azul, titulo + buscador (`c-track-search__*`). JS: `components/tracking.js`.
- `c-track-card` (`tracking-card.css`): tarjeta blanca, oculta (`hidden`) hasta tener resultado. Datos: pedido, estatus, fecha estimada, tracking number. Ayuda enlaza a `/pages/contacto/`.
- `c-track-route` (`tracking-route.css`): linea de tiempo; pasos con `data-state` = completado | actual | pendiente.

## Datos
`services/tracking.js` es el unico punto de acceso: `buscarPedido(numeroPedido)`. Sin `config.supabaseUrl` usa datos de prueba (pedido `VR09324`). Con Supabase llama a la RPC `rastrear_pedido(p_numero)`; contrato en la cabecera del servicio.
Errores (`TrackingError.code`): VACIO, FORMATO, NO_ENCONTRADO, RED. Mensajes en `components/tracking.js`; se muestran en una caja blanca bajo el campo.

## Pendiente de verificar contra Figma (PROVISIONAL)
- Medidas y colores muestreados de la captura (`--size-search-*`, `--size-dot`, `--radius-40`, `--color-success|progress|pending|pill`).
- Sin frames 375/768: apilado en movil por supuesto. Estados de error y carga no existen en Figma: diseño propio (caja blanca con `--color-danger`).
- Fecha estimada en Figma dice "1 Nov 2027" (probable error; el footer dice 2025). Es dato dinamico.
- Estatus "En tránsito" en verde (tarjeta) pero azul en la ruta, y bajo contraste verde/gris. Se mantiene Figma; colores por estatus en `STATUS_VARIANT`.
- El conector de la ruta tambien aparece bajo el ultimo paso en Figma; se conserva.

## Pendiente de usuario
- Formato real del numero de pedido (`config.trackingOrderFormat`, hoy `[A-Z0-9-]{4,32}`) y lista de estatus.
- Crear tablas `envios` / `eventos_ruta` y la RPC `rastrear_pedido` (solo campos del contrato, sin datos personales; limitar intentos por posible enumeracion de pedidos consecutivos).
- Tracking number sin enlace a DHL/FedEx (Figma solo lo subraya).
