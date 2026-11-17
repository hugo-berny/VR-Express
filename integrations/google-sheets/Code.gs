/**
 * VR Express — Rastreo con Google Sheets.
 * Pegar en Extensiones > Apps Script de un Google Sheet NUEVO y ejecutar `configurarHoja` una vez.
 * Contrato de salida: src/scripts/services/tracking.js (buscarPedido).
 */

// ---- Constantes (columnas de la pestaña Pedidos, base 1) ----
const HOJA_PEDIDOS = 'Pedidos';
const HOJA_ARCHIVO = 'Archivo';
const HOJA_CONFIG = 'Configuración';
const HOJA_AYUDA = 'Instrucciones';
const COL = { PEDIDO: 1, CLIENTE: 2, TRACKING: 3, DOMICILIO: 4, ESTIMADA: 5, LAREDO: 6, ADUANA: 7, BODEGA_MX: 8, ENTREGADO: 9, ESTATUS: 10, NOTAS: 11 };
const ENCABEZADOS = [
  'Número de pedido', 'Cliente (interno)', 'Tracking Number', 'Domicilio de entrega (calle y número)',
  'Fecha estimada de entrega', 'Fecha: Recibido en bodega Laredo', 'Fecha: Proceso aduanal',
  'Fecha: En bodega México', 'Fecha: Entregado', 'Estatus (automático, no editar)', 'Notas internas (no se publican)',
];
const FILAS = 2000;
const DIAS_PARA_ARCHIVAR = 30;
const LIMITE_CONSULTAS_POR_MINUTO = 120;
const FORMATO_PEDIDO = /^[A-Z0-9-]{4,32}$/;

// ---- Menu ----
function onOpen() {
  SpreadsheetApp.getUi().createMenu('VR Express')
    .addItem('Archivar entregados ahora', 'archivarEntregados')
    .addItem('Activar archivado automático diario', 'activarArchivadoAutomatico')
    .addSeparator()
    .addItem('Reconfigurar formato de la hoja', 'configurarHoja')
    .addToUi();
}

// ---- Configuracion inicial (idempotente) ----
function configurarHoja() {
  const ss = SpreadsheetApp.getActive();
  const sheet = (name) => ss.getSheetByName(name) || ss.insertSheet(name);
  const pedidos = sheet(HOJA_PEDIDOS);
  const archivo = sheet(HOJA_ARCHIVO);
  const config = sheet(HOJA_CONFIG);
  const ayuda = sheet(HOJA_AYUDA);

  // Encabezados y estilo
  [pedidos, archivo].forEach((s) => {
    s.getRange(1, 1, 1, ENCABEZADOS.length).setValues([ENCABEZADOS])
      .setFontWeight('bold').setBackground('#0b2a4a').setFontColor('#ffffff').setWrap(true).setVerticalAlignment('middle');
    s.setFrozenRows(1);
    s.setRowHeight(1, 56);
    s.setColumnWidths(1, ENCABEZADOS.length, 150);
    s.setColumnWidth(COL.DOMICILIO, 260);
    s.setColumnWidth(COL.NOTAS, 260);
    [COL.PEDIDO, COL.CLIENTE, COL.TRACKING, COL.DOMICILIO, COL.NOTAS].forEach((c) => s.getRange(2, c, FILAS, 1).setNumberFormat('@'));
    s.getRange(2, COL.ESTIMADA, FILAS, 5).setNumberFormat('dd/mm/yyyy');
  });

  // Estatus automatico (formula en el encabezado: no se rompe al borrar filas)
  const f = (c) => `${colLetra(c)}2:${colLetra(c)}`;
  pedidos.getRange(1, COL.ESTATUS).setFormula(
    `={"${ENCABEZADOS[COL.ESTATUS - 1]}"; ARRAYFORMULA(IF(${f(COL.PEDIDO)}="","",` +
    `IF(${f(COL.ENTREGADO)}<>"","Entregado",IF(${f(COL.BODEGA_MX)}<>"","En bodega México",` +
    `IF(${f(COL.ADUANA)}<>"","En proceso aduanal",IF(${f(COL.LAREDO)}<>"","Recibido en bodega Laredo","Registrado"))))))}`);

  // Validaciones (solo Pedidos)
  const rangoPedido = pedidos.getRange(2, COL.PEDIDO, FILAS, 1);
  const ayudaPedido = '4 a 32 caracteres: letras, números y guiones. Sin espacios. No puede repetirse.';
  const reglasPedido = [
    `=AND(REGEXMATCH(TO_TEXT(A2),"^[A-Za-z0-9-]{4,32}$"),COUNTIF($A$2:$A$${FILAS + 1},A2)=1)`,
    `=COUNTIF($A$2:$A$${FILAS + 1},A2)=1`,
  ];
  const aplicada = reglasPedido.some((formula) => {
    try {
      rangoPedido.setDataValidation(SpreadsheetApp.newDataValidation().requireFormulaSatisfied(formula).setHelpText(ayudaPedido).setAllowInvalid(false).build());
      SpreadsheetApp.flush(); // Google valida al aplicar, no al crear: forzarlo aqui para poder atrapar el error
      return true;
    } catch (err) {
      try { rangoPedido.clearDataValidations(); SpreadsheetApp.flush(); } catch (e2) { /* nada que limpiar */ }
      return false;
    }
  });
  if (!aplicada) console.warn('No se pudo aplicar la validación del número de pedido; el resto quedó configurado.');
  pedidos.getRange(2, COL.ESTIMADA, FILAS, 5).setDataValidation(
    SpreadsheetApp.newDataValidation().requireDate().setHelpText('Escribe una fecha válida (dd/mm/aaaa) o usa el selector.').setAllowInvalid(false).build());

  // Colores por estado
  pedidos.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=$I2<>""').setBackground('#d9f2e3').setRanges([pedidos.getRange(2, 1, FILAS, ENCABEZADOS.length)]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=AND($A2<>"",$E2="")').setBackground('#fff3cd').setRanges([pedidos.getRange(2, COL.ESTIMADA, FILAS, 1)]).build(),
  ]);

  // Proteccion de la columna Estatus (solo aviso, para no bloquear al cliente)
  pedidos.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach((p) => p.remove());
  pedidos.getRange(1, COL.ESTATUS, FILAS, 1).protect().setWarningOnly(true).setDescription('Estatus automático');

  // Configuracion
  if (config.getLastRow() < 2) {
    config.getRange(1, 1, 4, 2).setValues([
      ['Texto', 'Valor (editable)'],
      ['Ubicación: Bodega Laredo', 'Laredo, Texas, EE. UU.'],
      ['Ubicación: Proceso aduanal', 'México'],
      ['Ubicación: Bodega México (ciudad)', 'POR DEFINIR'],
    ]);
    config.getRange(1, 1, 1, 2).setFontWeight('bold');
    config.setColumnWidths(1, 2, 280);
  }

  // Instrucciones
  ayuda.clear();
  ayuda.getRange(1, 1, 9, 1).setValues([
    ['CÓMO USAR ESTA BASE DE DATOS'],
    ['1. Pestaña "Pedidos": escribe una fila por envío. Solo el Número de pedido es obligatorio para empezar.'],
    ['2. A medida que el envío avanza, escribe la fecha en la etapa correspondiente (Laredo → Aduana → Bodega México → Entregado).'],
    ['3. El Estatus se llena solo. No lo escribas.'],
    ['4. Para cambiar la fecha estimada de entrega, edita la columna "Fecha estimada". La página lo muestra al instante.'],
    ['5. Los pedidos entregados hace más de 30 días se mueven solos a "Archivo". También puedes usar el menú VR Express.'],
    ['6. Los datos del cliente y las notas internas NUNCA se muestran en la página.'],
    ['7. No borres ni renombres las pestañas ni los encabezados.'],
    ['8. Para cambiar textos de ubicación, edita la pestaña "Configuración".'],
  ]);
  ayuda.getRange(1, 1).setFontWeight('bold');
  ayuda.setColumnWidth(1, 900);
  ss.setActiveSheet(pedidos);
}

function colLetra(n) {
  return String.fromCharCode(64 + n);
}

// ---- Archivado ----
function archivarEntregados() {
  const ss = SpreadsheetApp.getActive();
  const pedidos = ss.getSheetByName(HOJA_PEDIDOS);
  const archivo = ss.getSheetByName(HOJA_ARCHIVO);
  const limite = new Date(Date.now() - DIAS_PARA_ARCHIVAR * 86400000);
  const filas = pedidos.getRange(2, 1, Math.max(pedidos.getLastRow() - 1, 1), ENCABEZADOS.length).getValues();
  const mover = [];
  filas.forEach((fila, i) => {
    const entregado = fila[COL.ENTREGADO - 1];
    if (fila[COL.PEDIDO - 1] && entregado instanceof Date && entregado < limite) mover.push({ fila, num: i + 2 });
  });
  if (!mover.length) return;
  archivo.getRange(archivo.getLastRow() + 1, 1, mover.length, ENCABEZADOS.length).setValues(mover.map((m) => m.fila));
  mover.map((m) => m.num).reverse().forEach((n) => pedidos.deleteRow(n));
}

function activarArchivadoAutomatico() {
  ScriptApp.getProjectTriggers().filter((t) => t.getHandlerFunction() === 'archivarEntregados').forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('archivarEntregados').timeBased().everyDays(1).atHour(3).create();
  SpreadsheetApp.getUi().alert('Archivado automático activado: cada noche se mueven los pedidos entregados hace más de ' + DIAS_PARA_ARCHIVAR + ' días.');
}

// ---- API publica (Web App) ----
function doGet(e) {
  const numero = String((e && e.parameter && e.parameter.pedido) || '').trim().toUpperCase();
  if (!FORMATO_PEDIDO.test(numero)) return json({ ok: false, error: 'FORMATO' });
  if (!dentroDelLimite()) return json({ ok: false, error: 'LIMITE' });
  const pedido = buscar(numero);
  return json(pedido ? { ok: true, pedido } : { ok: false, error: 'NO_ENCONTRADO' });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function dentroDelLimite() {
  const cache = CacheService.getScriptCache();
  const key = 'rl_' + Math.floor(Date.now() / 60000);
  const n = Number(cache.get(key) || 0) + 1;
  cache.put(key, String(n), 120);
  return n <= LIMITE_CONSULTAS_POR_MINUTO;
}

function buscar(numero) {
  const ss = SpreadsheetApp.getActive();
  const cfg = ss.getSheetByName(HOJA_CONFIG).getRange('B2:B4').getValues().map((r) => String(r[0]).trim());
  for (const nombre of [HOJA_PEDIDOS, HOJA_ARCHIVO]) {
    const hoja = ss.getSheetByName(nombre);
    if (!hoja || hoja.getLastRow() < 2) continue;
    const filas = hoja.getRange(2, 1, hoja.getLastRow() - 1, ENCABEZADOS.length).getValues();
    const fila = filas.find((r) => String(r[COL.PEDIDO - 1]).trim().toUpperCase() === numero);
    if (fila) return armar(fila, cfg, ss.getSpreadsheetTimeZone());
  }
  return null;
}

// Solo estos campos salen a internet. Cliente (B) y Notas (K) nunca.
function armar(fila, cfg, tz) {
  const fecha = (v) => (v instanceof Date ? Utilities.formatDate(v, tz, 'yyyy-MM-dd') : null);
  const etapas = [
    { titulo: 'Recibido en bodega Laredo', fecha: fecha(fila[COL.LAREDO - 1]), ubicacion: cfg[0] },
    { titulo: 'Proceso aduanal', fecha: fecha(fila[COL.ADUANA - 1]), ubicacion: cfg[1] },
    { titulo: 'En bodega México', fecha: fecha(fila[COL.BODEGA_MX - 1]), ubicacion: cfg[2] },
    { titulo: 'Entrega', fecha: fecha(fila[COL.ENTREGADO - 1]), ubicacion: String(fila[COL.DOMICILIO - 1] || '').trim() },
  ];
  let actualAsignado = false;
  const ruta = etapas.map((et) => {
    let estado = 'completado';
    if (!et.fecha) {
      estado = actualAsignado ? 'pendiente' : 'actual';
      actualAsignado = true;
    }
    return { ...et, estado };
  });
  return {
    numeroPedido: String(fila[COL.PEDIDO - 1]).trim().toUpperCase(),
    estatus: String(fila[COL.ESTATUS - 1] || 'Registrado'),
    fechaEstimada: fecha(fila[COL.ESTIMADA - 1]),
    numeroSeguimiento: String(fila[COL.TRACKING - 1] || '').trim() || null,
    ruta,
  };
}
