// Optimiza imagenes de src/assets/_inbox para web y las registra en manifest.json.
// Uso: node tools/optimize-images.mjs [--dry] [--budget=150]   (budget en KB, por variante WebP)
// Requiere `npm install` (sharp es devDependency; no se publica con el sitio).
import { readdir, readFile, writeFile, mkdir, copyFile, rm } from 'node:fs/promises';
import { basename, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('Falta "sharp". Ejecuta una vez: npm install');
  process.exit(2);
}

const assets = resolve(fileURLToPath(new URL('../src/assets', import.meta.url)));
const inbox = join(assets, '_inbox');
const rawDir = join(assets, 'images/raw');
const outDir = join(assets, 'images/optimized');
const manifestPath = join(assets, 'manifest.json');

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const budgetKB = Number(args.find((a) => a.startsWith('--budget='))?.split('=')[1]) || 150;

const WIDTHS = [400, 800, 1200, 1920];
const QUALITY = { avif: 55, webp: 78, jpeg: 80 };
const INPUT_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff']);

const slug = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const kb = (n) => `${(n / 1024).toFixed(1)}KB`;

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const files = (await readdir(inbox, { withFileTypes: true })).filter((e) => e.isFile() && !e.name.startsWith('.'));
const summary = [];
const skipped = [];

for (const f of files) {
  const ext = extname(f.name).toLowerCase();
  const name = slug(basename(f.name, extname(f.name)));
  const src = join(inbox, f.name);

  if (ext === '.svg') {
    const svg = (await readFile(src, 'utf8'))
      .replace(/<\?xml[\s\S]*?\?>|<!--[\s\S]*?-->|<metadata[\s\S]*?<\/metadata>/g, '')
      .replace(/>\s+</g, '><').trim();
    const rel = `images/optimized/${name}.svg`;
    if (!dry) {
      await mkdir(outDir, { recursive: true }); await mkdir(rawDir, { recursive: true });
      await copyFile(src, join(rawDir, `${name}.svg`));
      await writeFile(join(assets, rel), svg);
      await rm(src);
      manifest.assets[`images/optimized/${name}`] = { type: 'svg', raw: `images/raw/${name}.svg`, variants: [{ format: 'svg', path: rel, bytes: Buffer.byteLength(svg) }] };
    }
    summary.push(`${f.name} -> ${rel} (${kb(Buffer.byteLength(svg))})`);
    continue;
  }

  if (!INPUT_EXT.has(ext)) { skipped.push(`${f.name} (tipo no gestionado aqui: mover con asset-manager)`); continue; }

  const base = sharp(src, { failOn: 'none' }).rotate();
  const meta = await sharp(src).rotate().metadata();
  const { width: ow, height: oh } = await base.clone().toBuffer({ resolveWithObject: true }).then((r) => r.info);
  const alpha = Boolean(meta.hasAlpha);
  const fallback = alpha ? 'png' : 'jpeg';
  const fallbackExt = alpha ? 'png' : 'jpg';

  // Nunca ampliar: solo anchos menores al original; si el original es chico, solo su ancho.
  const widths = [...new Set([...WIDTHS.filter((w) => w < ow), ow > WIDTHS.at(-1) ? WIDTHS.at(-1) : ow])].sort((a, b) => a - b);
  const variants = [];

  for (const w of widths) {
    const resized = base.clone().resize({ width: w, withoutEnlargement: true });
    const jobs = [
      ['avif', resized.clone().avif({ quality: QUALITY.avif, effort: 4 }), 'avif'],
      ['webp', resized.clone().webp({ quality: QUALITY.webp, effort: 5 }), 'webp'],
      [fallback, fallback === 'jpeg'
        ? resized.clone().jpeg({ quality: QUALITY.jpeg, mozjpeg: true })
        : resized.clone().png({ compressionLevel: 9, palette: true }), fallbackExt],
    ];
    for (const [format, pipeline, e] of jobs) {
      const buf = await pipeline.toBuffer();
      const rel = `images/optimized/${name}-${w}.${e}`;
      if (!dry) { await mkdir(outDir, { recursive: true }); await writeFile(join(assets, rel), buf); }
      variants.push({ format: e, width: w, path: rel, bytes: buf.length });
    }
  }

  const overBudget = variants.filter((v) => v.format === 'webp' && v.bytes > budgetKB * 1024);
  const srcset = (e) => variants.filter((v) => v.format === e).map((v) => `${v.path} ${v.width}w`).join(', ');

  if (!dry) {
    await mkdir(rawDir, { recursive: true });
    await copyFile(src, join(rawDir, `${name}${ext}`)); // mismo nombre = reemplaza el anterior
    await rm(src);
    manifest.assets[`images/optimized/${name}`] = {
      type: 'image', raw: `images/raw/${name}${ext}`, width: ow, height: oh, alpha,
      srcset: { avif: srcset('avif'), webp: srcset('webp'), [fallbackExt]: srcset(fallbackExt) },
      variants,
    };
  }
  const big = variants.filter((v) => v.format === 'webp').at(-1);
  summary.push(`${f.name} (${ow}x${oh}) -> ${name}-{${widths.join(',')}}.{avif,webp,${fallbackExt}} · mayor webp ${kb(big.bytes)}${overBudget.length ? `  ⚠ supera ${budgetKB}KB: ${overBudget.map((v) => v.width + 'w').join(',')}` : ''}`);
}

if (!dry && summary.length) await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(summary.length ? `${dry ? '[dry-run] ' : ''}Procesadas ${summary.length}:\n - ` + summary.join('\n - ') : 'Inbox sin imagenes para procesar.');
if (skipped.length) console.log('Omitidas:\n - ' + skipped.join('\n - '));
