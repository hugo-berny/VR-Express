// Menu hamburguesa del header (solo visible bajo 48em).
export function init(root) {
  const toggle = root.querySelector('.c-header__toggle');
  if (!toggle) return;
  const desktop = window.matchMedia('(min-width: 48em)');

  const setOpen = (open) => {
    root.classList.toggle('c-header--open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('c-header--open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) setOpen(false);
  });
  desktop.addEventListener('change', () => setOpen(false));
}
