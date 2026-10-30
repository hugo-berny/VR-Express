// OPCIONAL. Solo se importa dinamicamente cuando una pagina necesita datos.
// Llamadas REST directas (sin SDK) para no sumar peso. Una funcion fina por operacion.
import { config } from '../core/config.js';

async function request(path, options = {}) {
  const res = await fetch(`${config.supabaseUrl}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: config.supabaseAnonKey,
      Authorization: `Bearer ${config.supabaseAnonKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
  return res.json();
}

export const select = (table, query = '') => request(`${table}?select=*${query}`);
export const insert = (table, row) =>
  request(table, { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(row) });
export const rpc = (fn, args) => request(`rpc/${fn}`, { method: 'POST', body: JSON.stringify(args) });
