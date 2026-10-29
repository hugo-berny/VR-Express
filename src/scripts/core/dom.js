// Carga perezosa: <div data-component="nav"> => components/nav.js con export init(root)
export function initComponents(scope = document) {
  scope.querySelectorAll('[data-component]').forEach(async (root) => {
    const name = root.dataset.component;
    try {
      const mod = await import(`../components/${name}.js`);
      mod.init(root);
    } catch (err) {
      console.error(`[component:${name}]`, err);
    }
  });
}
