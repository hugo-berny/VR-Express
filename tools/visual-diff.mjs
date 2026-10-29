// Diff de pixeles baseline (Figma) vs captura actual, sin dependencias (decoder PNG propio).
// Uso: node tools/visual-diff.mjs <pagina> [umbral%=2]   -> espera <pagina>-375|768|1440.png en
// tests/visual/figma/ y tests/visual/current/. Salida: tabla + tests/visual/current/<pagina>-<bp>-diff.png
import { readFile, writeFile } from 'node:fs/promises';
import { inflateSync, deflateSync } from 'node:zlib';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = resolve(fileURLToPath(new URL('../tests/visual', import.meta.url)));
const [page, threshold = '2'] = process.argv.slice(2);
if (!page) { console.error('Uso: node tools/visual-diff.mjs <pagina> [umbral%]'); process.exit(2); }

function decode(buf) {
  let pos = 8, w, h, bpp, idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos), type = buf.toString('latin1', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4);
      if (data[8] !== 8 || data[12] !== 0 || ![2, 6].includes(data[9])) throw new Error('PNG no soportado (usar 8-bit RGB/RGBA sin entrelazado)');
      bpp = data[9] === 6 ? 4 : 3;
    } else if (type === 'IDAT') idat.push(data);
    pos += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(idat)), stride = w * bpp, out = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)], line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? out[y * stride + x - bpp] : 0, b = y ? out[(y - 1) * stride + x] : 0, c = x >= bpp && y ? out[(y - 1) * stride + x - bpp] : 0;
      const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
      const pred = [0, a, b, (a + b) >> 1, pa <= pb && pa <= pc ? a : pb <= pc ? b : c][f];
      out[y * stride + x] = (line[x] + pred) & 255;
    }
  }
  return { w, h, bpp, px: out };
}

const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc = (b) => { let c = 0xffffffff; for (const v of b) c = crcTable[(c ^ v) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function encode(w, h, rgb) {
  const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2;
  const raw = Buffer.alloc(h * (w * 3 + 1));
  for (let y = 0; y < h; y++) rgb.copy(raw, y * (w * 3 + 1) + 1, y * w * 3, (y + 1) * w * 3);
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

let failed = false;
console.log('| bp | tamaño figma | tamaño actual | diff % | resultado |\n|---|---|---|---|---|');
for (const bp of [375, 768, 1440]) {
  try {
    const a = decode(await readFile(`${dir}/figma/${page}-${bp}.png`)), b = decode(await readFile(`${dir}/current/${page}-${bp}.png`));
    if (a.w !== b.w || a.h !== b.h) {
      console.log(`| ${bp} | ${a.w}x${a.h} | ${b.w}x${b.h} | - | FAIL (dimensiones distintas) |`); failed = true; continue;
    }
    const diff = Buffer.alloc(a.w * a.h * 3); let bad = 0;
    for (let i = 0; i < a.w * a.h; i++) {
      const dr = Math.abs(a.px[i * a.bpp] - b.px[i * b.bpp]), dg = Math.abs(a.px[i * a.bpp + 1] - b.px[i * b.bpp + 1]), db = Math.abs(a.px[i * a.bpp + 2] - b.px[i * b.bpp + 2]);
      const isBad = dr + dg + db > 48; if (isBad) bad++;
      diff[i * 3] = isBad ? 255 : a.px[i * a.bpp] >> 1; diff[i * 3 + 1] = isBad ? 0 : a.px[i * a.bpp + 1] >> 1; diff[i * 3 + 2] = isBad ? 0 : a.px[i * a.bpp + 2] >> 1;
    }
    const pct = (bad / (a.w * a.h)) * 100, ok = pct <= Number(threshold);
    if (!ok) failed = true;
    await writeFile(`${dir}/current/${page}-${bp}-diff.png`, encode(a.w, a.h, diff));
    console.log(`| ${bp} | ${a.w}x${a.h} | ${b.w}x${b.h} | ${pct.toFixed(2)} | ${ok ? 'PASS' : 'FAIL'} |`);
  } catch (e) {
    console.log(`| ${bp} | - | - | - | BLOQUEADO: ${e.code === 'ENOENT' ? 'falta PNG ' + e.path.split('/').slice(-2).join('/') : e.message} |`); failed = true;
  }
}
process.exit(failed ? 1 : 0);
