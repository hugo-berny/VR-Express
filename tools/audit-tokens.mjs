// Falla si hay valores crudos fuera de 00-tokens, @media no permitidos, o recursos externos en src/.
// Uso: node tools/audit-tokens.mjs
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const src = resolve(fileURLToPath(new URL('../src', import.meta.url)));
const ALLOWED_MQ = ['48em', '64em', '90em'];
const problems = [];

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

for await (const file of walk(src)) {
  const rel = relative(src, file);
  const text = await readFile(file, 'utf8').catch(() => '');
  const report = (msg) => problems.push(`${rel}: ${msg}`);

  if (file.endsWith('.css')) {
    const code = text.replace(/\/\*[\s\S]*?\*\//g, '');
    if (!rel.startsWith('styles/00-tokens')) {
      if (/#[0-9a-f]{3,8}\b/i.test(code)) report('color hex crudo (usar var(--color-*))');
      if (/\b(rgb|hsl)a?\(/i.test(code)) report('color rgb/hsl crudo');
      // 1px (bordes finos / visually-hidden) esta permitido; 0 no lleva unidad.
      if (/(?<![\w-.])(?!1px\b)\d*\.?\d+(px|rem)\b/.test(code.replace(/var\([^)]*\)/g, ''))) report('tamaño crudo px/rem (usar token)');
      if (/!important/.test(code)) report('!important');
      if (/@media[^{]*max-width/.test(code)) report('max-width en @media (mobile-first: usar min-width)');
    }
    for (const m of code.matchAll(/@media[^{]*min-width:\s*([\w.]+)/g)) {
      if (!ALLOWED_MQ.includes(m[1])) report(`breakpoint no permitido ${m[1]}`);
    }
    if (/@import\s+url\(["']?https?:/.test(code)) report('import CSS externo');
  }
  if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
    if (/(src|href)=["']https?:\/\//.test(text) || /from\s+["']https?:\/\//.test(text) || /import\(["']https?:/.test(text))
      report('recurso externo/CDN');
  }
  if (file.endsWith('.html') && /\sstyle=["']/.test(text)) report('estilo inline');
  if (file.endsWith('.js') && /from\s+["'][^./]/.test(text)) report('import de paquete (solo rutas relativas)');
}

if (problems.length) {
  console.error(`FAIL (${problems.length})\n` + problems.map((p) => ' - ' + p).join('\n'));
  process.exit(1);
}
console.log('PASS: tokens/arquitectura OK');
