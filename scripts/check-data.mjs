/** Data integrity pass over the domain content. Not shipped — run with `npm run check`. */
import { readFileSync, readdirSync } from 'node:fs';

const IDS = ['surya','chandra','mangala','budha','guru','shukra','shani','rahu','ketu'];
const dir = 'src/data/domains';
const files = readdirSync(dir).filter((f) => f.endsWith('.ts') && f !== 'index.ts');

let errors = 0, warnings = 0;
const fail = (m) => { console.error('  ERROR  ' + m); errors++; };
const warn = (m) => { console.warn('  warn   ' + m); warnings++; };

let totalItems = 0;
for (const f of files) {
  const src = readFileSync(`${dir}/${f}`, 'utf8');
  const id = (src.match(/^\s*id:\s*'([^']+)'/m) || [])[1];
  console.log(`\n${f}  (${id})`);

  const items = [...src.matchAll(/\{\s*graha:\s*'(\w+)',\s*label:\s*'((?:[^'\\]|\\.)*)'/g)]
    .map((m) => ({ graha: m[1], label: m[2] }));
  totalItems += items.length;

  const notes = [...src.matchAll(/^\s{4}(\w+):\s*'/gm)].map((m) => m[1]).filter((k) => IDS.includes(k));

  // every graha appears, with a sane cluster size
  for (const g of IDS) {
    const n = items.filter((i) => i.graha === g).length;
    if (n === 0) fail(`${id}: no items for ${g}`);
    else if (n < 3) warn(`${id}: ${g} has only ${n} item(s)`);
    else if (n > 6) fail(`${id}: ${g} has ${n} items — layout supports at most 6`);
    if (!notes.includes(g)) fail(`${id}: missing clusterNote for ${g}`);
  }

  // unknown graha ids
  for (const it of items) if (!IDS.includes(it.graha)) fail(`${id}: unknown graha "${it.graha}" on "${it.label}"`);

  // duplicate labels within a domain
  const seen = new Set();
  for (const it of items) {
    if (seen.has(it.label)) fail(`${id}: duplicate label "${it.label}"`);
    seen.add(it.label);
  }

  // note coverage
  const withNote = (src.match(/note:\s*'/g) || []).length;
  if (withNote < items.length) warn(`${id}: ${items.length - withNote} item(s) have no note`);

  const counts = IDS.map((g) => items.filter((i) => i.graha === g).length).join(' ');
  console.log(`  ${items.length} items   per-graha: ${counts}`);
}

console.log(`\n${files.length} domains, ${totalItems} items total`);
console.log(errors ? `\nFAILED: ${errors} error(s), ${warnings} warning(s)` : `\nOK${warnings ? ` (${warnings} warning(s))` : ''}`);
process.exit(errors ? 1 : 0);
