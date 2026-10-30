// Envio del formulario de contacto / Cotizador Express. Una sola funcion; el correo lo envia el endpoint.
// Contrato (PROVISIONAL, a ajustar con la funcion serverless):
//   POST config.contactEndpoint, JSON:
//   { origen: 'contacto' | 'cotizacion', nombre, contacto, mensaje,
//     cotizador: null | { tipoCompra, pesoKg, dimensionesCm, linkProducto } }
//   Respuesta: 2xx = enviado; cualquier otro estado = error.
import { config } from '../core/config.js';

export async function sendContact(payload) {
  const res = await fetch(config.contactEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Contacto ${res.status}`);
}
