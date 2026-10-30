// Configuracion publica (solo claves anon). Nunca secretos.
export const config = {
  supabaseUrl: '',
  supabaseAnonKey: '',
  // Endpoint que envia el correo de contacto/cotizacion (PROVISIONAL: funcion serverless, probablemente Netlify)
  // Formato del numero de pedido (PROVISIONAL: aun sin definir). Se normaliza a mayusculas antes de validar
  trackingOrderFormat: /^[A-Z0-9-]{4,32}$/,
  contactEndpoint: '/.netlify/functions/send-contact',
};
