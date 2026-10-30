// Configuracion publica (solo claves anon). Nunca secretos.
export const config = {
  supabaseUrl: '',
  supabaseAnonKey: '',
  // Endpoint que envia el correo de contacto/cotizacion (PROVISIONAL: funcion serverless, probablemente Netlify)
  contactEndpoint: '/.netlify/functions/send-contact',
};
