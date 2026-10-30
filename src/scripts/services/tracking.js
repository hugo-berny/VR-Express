// Consulta de pedido para /rastreo. La UI solo conoce buscarPedido(); de donde salen los datos se decide aqui.
// Contrato (PROVISIONAL, a ajustar con la base de datos). buscarPedido devuelve:
//   { numeroPedido, estatus, fechaEstimada: 'AAAA-MM-DD', numeroSeguimiento: string|null,
//     ruta: [{ titulo, fecha: 'AAAA-MM-DD'|null, ubicacion, estado: 'completado'|'actual'|'pendiente' }] }
// o lanza TrackingError con code: VACIO | FORMATO | NO_ENCONTRADO | RED.
// Sin config.supabaseUrl usa datos de prueba. Con Supabase: funcion RPC `rastrear_pedido(p_numero)` que devuelve
// ese mismo JSON (o null si no existe) y solo expone esos campos, nunca datos personales.
import { config } from '../core/config.js';

export class TrackingError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

const MOCK_ORDERS = {
  VR09324: {
    numeroPedido: 'VR09324',
    estatus: 'En tránsito',
    fechaEstimada: '2025-11-01',
    numeroSeguimiento: '1zv245768570901',
    ruta: [
      { titulo: 'Envío recibido en almacén', fecha: '2025-10-23', ubicacion: 'Laredo, Texas, EE. UU.', estado: 'completado' },
      { titulo: 'Proceso Aduanal completado', fecha: '2025-10-26', ubicacion: 'México', estado: 'completado' },
      { titulo: 'En tránsito', fecha: '2025-10-29', ubicacion: 'Mérida, Yucatán, Mx.', estado: 'actual' },
      { titulo: 'Entrega', fecha: null, ubicacion: 'Calle 58 num. 26A', estado: 'pendiente' },
    ],
  },
};

const fromMock = async (numero) => MOCK_ORDERS[numero] ?? null;

async function fromSupabase(numero) {
  const { rpc } = await import('./supabase.js');
  return rpc('rastrear_pedido', { p_numero: numero });
}

export async function buscarPedido(entrada) {
  const numero = entrada.trim().toUpperCase();
  if (!numero) throw new TrackingError('VACIO');
  if (!config.trackingOrderFormat.test(numero)) throw new TrackingError('FORMATO');

  let pedido;
  try {
    pedido = await (config.supabaseUrl ? fromSupabase(numero) : fromMock(numero));
  } catch (err) {
    console.error('[tracking]', err);
    throw new TrackingError('RED');
  }
  if (!pedido) throw new TrackingError('NO_ENCONTRADO');
  return pedido;
}
