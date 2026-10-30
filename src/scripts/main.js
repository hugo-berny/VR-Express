// Entrada unica. Solo carga modulos de componentes presentes en el DOM.
import { initComponents } from './core/dom.js';

// Al abrir o refrescar la home siempre se empieza arriba (sin restaurar el scroll previo ni saltar a un ancla)
if (document.body.hasAttribute('data-scroll-top') && !location.hash) {
  history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
}

initComponents();
