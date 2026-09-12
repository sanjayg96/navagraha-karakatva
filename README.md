# Navagraha Kārakatva

An interactive map of **kārakatva** — the classical doctrine that each graha is not
primarily a planet but a *principle*, and that the same principle recurs at every
scale of experience: in a part of the body, a kind of person, a place, a material, a
taste, a stretch of time, a way of speaking, a way of handling money.

There are two ways in.

**Graha-first.** The home page is an orrery. The headline says the grahas are not
planets and a solar system sits directly beneath it — deliberately. The diagram is
the misconception, shown on purpose; clicking any body dissolves the orbital
scaffolding and opens that graha's ten registers. The contradiction is the mechanism.

**Lens-first.** Pick a slice of ordinary life and forty-odd apparently unrelated
things sort themselves into nine clusters in front of you. Open a cluster to read the
one sentence that explains why it holds together.

**449 mapped items · 10 lenses · 9 grahas**

## Views

| Route | What it is |
| --- | --- |
| `#/` | the orrery (a 3x3 grid on narrow screens) |
| `#/graha/:id` | one graha: half-body left, its ten lenses right |
| `#/graha/:id/:domain` | one (graha x lens) cell, opened out of its row |
| `#/lens/:domain` | the sorting mandala, with a rail for moving between lenses |
| `#/lens/:domain/:graha` | one cluster, in detail |
| `#/spine/:graha` | one graha across all ten lenses — the "it rhymes" view |
| `#/today` | the weekday ruler and the live planetary hour |
| `#/about` | sources, method, and what this is not |

Routing is hash-based on purpose: every view is a shareable link and GitHub Pages
needs no redirect configuration.

## Layout notes

Both diagrams solve at a fixed logical size and scale to fit, which is what keeps
them from colliding at arbitrary viewport widths.

- **Mandala** (`src/lib/layout.ts`): the stage is wide and short because scale is
  bound by available *height*. Cluster anchors sit on an ellipse with a generous
  RX — at 30°/70° and their mirrors, neighbouring columns are closer together
  vertically than a column is tall, so they can only be separated horizontally.
- **Orrery** (`src/lib/orbits.ts`): the view is tilted, so orbits are ellipses. Each
  orbit's *minor* axis has to clear the Sun's disc or an inner planet passes through
  the Sun at the top and bottom of its path.

Geometry is verified by measuring bounding boxes in the browser rather than by
arithmetic — see the verification notes in the plan file.

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
*Phaladeepikā* and *Prashna Marga*. Names render as `Śani (Saturn)` throughout, via
`src/lib/names.ts`; the Devanagari is kept in the data as reference but is not
displayed. Items marked `ext` are reasoned extensions —
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
