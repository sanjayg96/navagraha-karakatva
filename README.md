# Navagraha Kārakatva

An interactive map of **kārakatva** — the classical doctrine that each graha is not
primarily a planet but a *principle*, and that the same principle recurs at every
scale of experience: in a part of the body, a kind of person, a place, a material, a
taste, a stretch of time, a way of speaking, a way of handling money.

Pick a lens. Forty-odd apparently unrelated things sort themselves into nine clusters
in front of you. Open a cluster to read the one sentence that explains why it holds
together, and what behaviourally strengthens or depletes that force.

**449 mapped items · 10 lenses · 9 grahas**

## Views

| Route | What it is |
| --- | --- |
| `#/` | the ten lenses |
| `#/lens/:domain` | the sorting mandala |
| `#/lens/:domain/:graha` | one cluster, in detail |
| `#/spine/:graha` | one graha across all ten lenses — the "it rhymes" view |
| `#/today` | the weekday ruler and the live planetary hour |
| `#/about` | sources, method, and what this is not |

Routing is hash-based on purpose: every view is a shareable link and GitHub Pages
needs no redirect configuration.

## Develop

```
npm install
npm run dev            # vite dev server
npm run check          # data integrity pass over the 10 domain files
npm run build          # production build into dist/
npm run build:artifact # single-file build for publishing as a Claude Artifact
node scripts/make-og.mjs   # regenerate the social card
```

## Sources

Kāraka lists are drawn from *Bṛhat Parāśara Horā Śāstra*, *Uttara Kālāmṛta*,
*Phaladeepikā* and *Prashna Marga*. Items marked `ext` are reasoned extensions —
not attested in the texts, placed by applying the stated principle. They are marked
so they can be discounted or argued with.

The behavioural sections are deliberately limited to actions, attitudes and habits:
no gemstones, mantras or ritual remedies. That is an editorial choice, so the
guidance stands without requiring any metaphysical commitment from the reader.

This is a symbolic correspondence system presented for pattern-recognition and
self-reflection. It is not prediction, not medical advice, and not financial advice.

## Stack

Vite · React · TypeScript · Framer Motion. No backend; all content is typed data
compiled into the bundle. Hand-written CSS, one canvas starfield, and a self-contained
NOAA solar calculation for the horā boundaries.
