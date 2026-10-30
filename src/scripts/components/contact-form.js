// Formulario de contacto con Cotizador Express opcional. Activado con data-component="contact-form" en el <form>.
import { sendContact } from '../services/contact.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PHONE_DIGITS = 10;

const isUrl = (value) => {
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
};

// Cada regla devuelve el mensaje de error o '' si es valida.
const rules = {
  nombre: (v) => (v.length < 2 ? 'Escribe tu nombre.' : ''),
  contacto: (v) =>
    EMAIL.test(v) || v.replace(/\D/g, '').length >= MIN_PHONE_DIGITS
      ? ''
      : 'Escribe un correo válido o un número de WhatsApp de 10 dígitos o más.',
  mensaje: (v, form) => (!form.cotizador.checked && v.length < 10 ? 'Cuéntanos brevemente cómo podemos ayudarte.' : ''),
  tipoCompra: (v) => (['Personal', 'Comercial'].includes(v) ? '' : 'Elige el tipo de compra.'),
  pesoKg: (v) => (Number(v) > 0 ? '' : 'Escribe el peso en kilogramos (mayor a 0).'),
  dimensionesCm: (v) => (v.length < 3 ? 'Escribe las dimensiones, por ejemplo 30 x 20 x 15.' : ''),
  linkProducto: (v) => (isUrl(v) ? '' : 'Escribe un enlace válido que empiece con https://'),
};

export function init(form) {
  const status = form.querySelector('[data-status]');
  const quote = form.querySelector('[data-quote]');
  const submit = form.querySelector('[type="submit"]');

  const setStatus = (text, state = '') => {
    status.textContent = text;
    status.dataset.state = state;
  };

  const setError = (control, message) => {
    const error = form.querySelector(`#${control.id}-error`);
    error.textContent = message;
    error.hidden = !message;
    control.setAttribute('aria-invalid', String(Boolean(message)));
    if (message) control.setAttribute('aria-describedby', error.id);
    else control.removeAttribute('aria-describedby');
  };

  const syncQuote = () => {
    const on = form.cotizador.checked;
    quote.hidden = !on;
    quote.disabled = !on; // deshabilitado = no se valida ni se envia
    if (!on) quote.querySelectorAll('.c-form__control').forEach((c) => setError(c, ''));
  };

  const openFromUrl = () => {
    if (location.hash === '#cotizador' || new URLSearchParams(location.search).has('cotizador')) {
      form.cotizador.checked = true;
      syncQuote();
    }
  };

  const validate = () => {
    let first = null;
    form.querySelectorAll('.c-form__control').forEach((control) => {
      if (control.disabled || control.closest('fieldset:disabled')) return;
      const message = rules[control.name]?.(control.value.trim(), form) ?? '';
      setError(control, message);
      if (message && !first) first = control;
    });
    return first;
  };

  const buildPayload = () => {
    const value = (name) => form.elements[name].value.trim();
    const withQuote = form.cotizador.checked;
    return {
      origen: withQuote ? 'cotizacion' : 'contacto',
      nombre: value('nombre'),
      contacto: value('contacto'),
      mensaje: value('mensaje'),
      cotizador: withQuote
        ? {
            tipoCompra: value('tipoCompra'),
            pesoKg: Number(value('pesoKg')),
            dimensionesCm: value('dimensionesCm'),
            linkProducto: value('linkProducto'),
          }
        : null,
    };
  };

  form.cotizador.addEventListener('change', syncQuote);
  window.addEventListener('hashchange', openFromUrl);
  form.addEventListener('input', (e) => {
    if (e.target.getAttribute?.('aria-invalid') === 'true') setError(e.target, rules[e.target.name]?.(e.target.value.trim(), form) ?? '');
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus('');
    const invalid = validate();
    if (invalid) {
      invalid.focus();
      setStatus('Revisa los campos marcados.', 'error');
      return;
    }
    // Campo trampa anti-spam: si lo llena un bot, se finge exito sin enviar
    if (form.elements.website.value) {
      setStatus('¡Gracias! Recibimos tu mensaje.');
      return;
    }
    submit.disabled = true;
    setStatus('Enviando…');
    try {
      await sendContact(buildPayload());
      form.reset();
      syncQuote();
      setStatus('¡Gracias! Recibimos tu mensaje y te responderemos pronto.');
    } catch (err) {
      console.error('[contact-form]', err);
      setStatus('No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos a admin@vr-expresslogistics.com.', 'error');
    } finally {
      submit.disabled = false;
    }
  });

  syncQuote();
  openFromUrl();
}
