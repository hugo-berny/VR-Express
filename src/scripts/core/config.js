// Configuracion publica (solo claves anon). Nunca secretos.
export const config = {
  supabaseUrl: '',
  supabaseAnonKey: '',
  // Web App de Google Apps Script ligado al Google Sheet de pedidos (ver docs/tracking-database.md). Vacio = datos de prueba.
  trackingApiUrl: 'https://script.google.com/macros/s/AKfycbyYgR8td5nQHD7AebfIkg6Z9M4x7Njs77SXbicFvWM5UZDQVLWTUJWsxHZOrhpnf5Kcqg/exec',
  // Endpoint que envia el correo de contacto/cotizacion (PROVISIONAL: funcion serverless, probablemente Netlify)
  // Formato del numero de pedido (PROVISIONAL: aun sin definir). Se normaliza a mayusculas antes de validar
  trackingOrderFormat: /^[A-Z0-9-]{4,32}$/,
  contactEndpoint: '/.netlify/functions/send-contact',
};
