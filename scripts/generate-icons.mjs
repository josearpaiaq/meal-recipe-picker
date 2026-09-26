// Generates the PWA icons in public/icons. Run: node scripts/generate-icons.mjs
import { writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";

const HERB = [0x2f, 0x6b, 0x3f];
const GROUND = [0xf6, 0xf2, 0xea];
const HERB_SOFT = [0xe3, 0xee, 0xdf];
const TOMATO = [0xc4, 0x51, 0x2d];

// A plate seen from above: cream plate, soft rim, one tomato-colored portion.
function colorAt(x, y, safe) {
  const scale = safe ? 0.8 : 1;
  const dx = (x - 0.5) / scale;
  const dy = (y - 0.5) / scale;
  const r = Math.hypot(dx, dy);
  const portion = Math.hypot(dx - 0.09, dy + 0.07);
  if (portion < 0.12) return TOMATO;
  if (r < 0.26) return GROUND;
  if (r < 0.34) return HERB_SOFT;
  return HERB;
}

function crc32(buf) {
  let c = ~0;
  for (const b of buf) {
    c ^= b;
    for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function png(size, safe) {
  const SS = 4; // supersampling for smooth edges
  const raw = Buffer.alloc(size * (size * 3 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 3 + 1)] = 0;
    for (let x = 0; x < size; x++) {
      const sum = [0, 0, 0];
      for (let sy = 0; sy < SS; sy++)
        for (let sx = 0; sx < SS; sx++) {
          const c = colorAt((x + (sx + 0.5) / SS) / size, (y + (sy + 0.5) / SS) / size, safe);
          for (let i = 0; i < 3; i++) sum[i] += c[i];
        }
      for (let i = 0; i < 3; i++)
        raw[y * (size * 3 + 1) + 1 + x * 3 + i] = Math.round(sum[i] / (SS * SS));
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // truecolor RGB
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

writeFileSync("public/icons/icon-192.png", png(192, false));
writeFileSync("public/icons/icon-512.png", png(512, false));
writeFileSync("public/icons/icon-maskable-512.png", png(512, true));
writeFileSync("public/icons/apple-touch-icon.png", png(180, true));
