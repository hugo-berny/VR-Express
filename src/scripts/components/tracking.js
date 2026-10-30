// Buscador de pedido + tarjeta de resultado con la ruta. Activado con data-component="tracking" en la seccion.
import { buscarPedido } from '../services/tracking.js';

const MESSAGES = {
  VACIO: 'Escribe tu número de pedido para consultar el estado de tu envío.',
  FORMATO: 'El número de pedido solo puede llevar letras, números y guiones (de 4 a 32 caracteres). Revisa que no tenga espacios ni símbolos.',
  NO_ENCONTRADO: 'No encontramos un pedido con ese número. Revisa que esté completo y bien escrito, o contáctanos si crees que es un error.',
  RED: 'No pudimos consultar tu pedido en este momento. Revisa tu conexión e inténtalo de nuevo en unos minutos.',
};

// Estatus -> variante de color. Un estatus que no esta aqui se muestra neutro (la lista aun no esta definida).
const STATUS_VARIANT = {
  'en tránsito': 'success',
};

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function formatDate(iso, withYear = false) {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return iso;
  return `${day} ${MONTHS[month - 1]}${withYear ? ` ${year}` : ''}`;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text) node.textContent = text;
  return node;
}

function renderStep({ titulo, fecha, ubicacion, estado }) {
  const step = el('li', 'c-track-route__step');
  step.dataset.state = estado;
  step.append(
    el('p', 'c-track-route__title', titulo),
    el('p', 'c-track-route__meta', fecha ? formatDate(fecha) : 'Pendiente'),
    el('p', 'c-track-route__meta', ubicacion),
  );
  return step;
}

export function init(root) {
  const form = root.querySelector('[data-form]');
  const input = form.elements.pedido;
  const submit = form.querySelector('[type="submit"]');
  const error = root.querySelector('[data-error]');
  const card = root.querySelector('[data-card]');
  const route = root.querySelector('[data-route]');
  const field = (name) => card.querySelector(`[data-field="${name}"]`);

  const setError = (message) => {
    error.textContent = message;
    error.hidden = !message;
    input.setAttribute('aria-invalid', String(Boolean(message)));
  };

  const render = (pedido) => {
    field('numeroPedido').textContent = pedido.numeroPedido;
    const status = field('estatus');
    status.textContent = pedido.estatus;
    status.dataset.variant = STATUS_VARIANT[pedido.estatus.toLowerCase()] ?? 'neutral';
    field('fechaEstimada').textContent = pedido.fechaEstimada ? formatDate(pedido.fechaEstimada, true) : 'Por confirmar';
    field('numeroSeguimiento').textContent = pedido.numeroSeguimiento || 'Pendiente';
    route.replaceChildren(...pedido.ruta.map(renderStep));
    card.hidden = false;
  };

  form.addEventListener('input', () => {
    if (!error.hidden) setError('');
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setError('');
    submit.disabled = true;
    try {
      render(await buscarPedido(input.value));
    } catch (err) {
      card.hidden = true;
      setError(MESSAGES[err.code] ?? MESSAGES.RED);
      if (!MESSAGES[err.code]) console.error('[tracking]', err);
      input.focus();
    } finally {
      submit.disabled = false;
    }
  });
}
