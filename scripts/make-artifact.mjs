/**
 * Turns the single-file Vite build into an artifact-ready fragment.
 * The Artifact host injects its own <!doctype>/<html>/<head>/<body>, so this
 * strips that wrapper and keeps only the title, font link, styles and scripts.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const src = readFileSync('dist-artifact/index.html', 'utf8');

const head = (src.match(/<head>([\s\S]*?)<\/head>/i) || [, ''])[1];
const body = (src.match(/<body[^>]*>([\s\S]*?)<\/body>/i) || [, ''])[1];

const keep = [];
const title = head.match(/<title>[\s\S]*?<\/title>/i);
if (title) keep.push(title[0]);

// Google Fonts is on the artifact CSP allowlist; every other head tag is either
// supplied by the host (charset, viewport) or meaningless there (og/twitter).
for (const m of head.matchAll(/<link\b[^>]*>/gi)) {
  if (/fonts\.(googleapis|gstatic)\.com/.test(m[0])) keep.push(m[0]);
}
for (const m of head.matchAll(/<style[^>]*>[\s\S]*?<\/style>/gi)) keep.push(m[0]);
for (const m of head.matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/gi)) keep.push(m[0]);

const out = keep.join('\n') + '\n' + body.trim() + '\n';

for (const tag of ['<!doctype', '<html', '<head', '<body']) {
  if (out.toLowerCase().includes(tag)) throw new Error(`artifact output still contains ${tag}`);
}
if (!/<div id="root">/.test(out)) throw new Error('artifact output is missing the react root');
if (!/<script/.test(out)) throw new Error('artifact output has no script — the bundle was not inlined');

mkdirSync('artifact', { recursive: true });
writeFileSync('artifact/navagraha.html', out);
console.log(`artifact/navagraha.html  ${(Buffer.byteLength(out) / 1024).toFixed(0)} kB`);
