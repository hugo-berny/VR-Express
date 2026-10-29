export function init(root) {
  const year = String(new Date().getFullYear());
  root.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = year;
  });
}
