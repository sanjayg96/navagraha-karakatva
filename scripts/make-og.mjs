/**
 * Generates public/og-image.png with no image libraries: the nine grahas as a
 * glowing ring on the same cosmic-night ground the app uses. Text is left out
 * deliberately — social cards render og:title beside the image anyway, and
 * there is no font rasteriser available here.
 */
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';

const W = 1200, H = 630, CX = 600, CY = 315;

const GRAHAS = [
  { core: [255, 180, 84]  }, { core: [216, 230, 245] }, { core: [255, 92, 82]  },
  { core: [95, 217, 154]  }, { core: [255, 212, 121] }, { core: [255, 217, 232] },
  { core: [143, 160, 200] }, { core: [169, 140, 255] }, { core: [207, 201, 192] },
];

const lerp = (a, b, t) => a + (b - a) * t;
const clamp255 = (v) => (v < 0 ? 0 : v > 255 ? 255 : v | 0);

// Deterministic starfield.
let seed = 20260911;
const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const stars = Array.from({ length: 260 }, () => ({
  x: rnd() * W, y: rnd() * H, r: 0.6 + rnd() * 1.3, a: 0.15 + rnd() * 0.5,
}));

const nodes = GRAHAS.map((g, i) => {
  const ang = (-90 + i * 40) * (Math.PI / 180);
  return { ...g, x: CX + Math.cos(ang) * 186, y: CY + Math.sin(ang) * 186 };
});

const px = Buffer.alloc(W * H * 3);

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    // Ground: elliptical indigo falloff to near-black.
    const dx = (x - CX) / 640, dy = (y - CY) / 400;
    const d = Math.min(1, Math.sqrt(dx * dx + dy * dy));
    let r = lerp(18, 5, d ** 0.85);
    let g = lerp(23, 6, d ** 0.85);
    let b = lerp(54, 13, d ** 0.85);

    for (const s of stars) {
      const sd = Math.hypot(x - s.x, y - s.y);
      if (sd < s.r + 1) {
        const k = Math.max(0, 1 - sd / (s.r + 1)) * s.a * 255;
        r += k; g += k; b += k * 1.05;
      }
    }

    for (const n of nodes) {
      const nd = Math.hypot(x - n.x, y - n.y);
      // Wide soft bloom plus a small hot core.
      const bloom = Math.exp(-(nd * nd) / (2 * 34 * 34)) * 0.85;
      const core = nd < 5.5 ? 1 : Math.exp(-((nd - 5.5) ** 2) / (2 * 3 * 3));
      const k = bloom + core * 0.9;
      if (k > 0.002) {
        r += n.core[0] * k; g += n.core[1] * k; b += n.core[2] * k;
      }
    }

    // Faint ring connecting the nine.
    const ringD = Math.abs(Math.hypot(x - CX, y - CY) - 186);
    if (ringD < 1.4) { const k = (1 - ringD / 1.4) * 40; r += k; g += k * 0.86; b += k * 0.5; }

    const o = (y * W + x) * 3;
    px[o] = clamp255(r); px[o + 1] = clamp255(g); px[o + 2] = clamp255(b);
  }
}

// --- minimal PNG writer ---
const CRC = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return (buf) => {
    let c = -1;
    for (const byte of buf) c = t[(c ^ byte) & 0xff] ^ (c >>> 8);
    return (c ^ -1) >>> 0;
  };
})();

const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(CRC(td));
  return Buffer.concat([len, td, crc]);
};

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; ihdr[9] = 2; // 8-bit, truecolour RGB

// Each scanline is prefixed with filter type 0.
const raw = Buffer.alloc(H * (1 + W * 3));
for (let y = 0; y < H; y++) {
  raw[y * (1 + W * 3)] = 0;
  px.copy(raw, y * (1 + W * 3) + 1, y * W * 3, (y + 1) * W * 3);
}

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);

mkdirSync('public', { recursive: true });
writeFileSync('public/og-image.png', png);
console.log(`public/og-image.png  ${W}x${H}  ${(png.length / 1024).toFixed(0)} kB`);
