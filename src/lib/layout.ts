import { GRAHA_ORDER, type GrahaId, type Item } from '../data/types';

/**
 * Fixed logical stage, scaled to fit whatever container it lands in. Solving the
 * layout at a constant size is what guarantees clusters never collide — a
 * viewport-relative solve would overlap at some widths and look accidental.
 */
export const STAGE = { w: 1300, h: 960, cx: 650, cy: 480 };

/** Radius of the ring the nine graha nodes sit on. */
export const NODE_RADIUS = 190;

/** Each graha owns a 40 degree sector, running clockwise from the top. */
export const SECTOR_DEG = 360 / GRAHA_ORDER.length;

/**
 * Cluster anchors sit on an ellipse rather than a circle (columns are wide and tall,
 * so they need more horizontal room than vertical), and alternate sectors are pushed
 * further out. Without that stagger, neighbouring sectors near the bottom-left and
 * bottom-right land at almost the same height and their columns overlap.
 */
const RX = 330, RY = 300;
const RX_OUT = 386, RY_OUT = 360;
const ROW_H = 28; // vertical pitch inside a cluster column

/** Deterministic jitter: the same domain always lays out identically. */
function seeded(seed: number): () => number {
  let s = (seed * 2654435761) % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

export interface NodePos { graha: GrahaId; angle: number; x: number; y: number }

export function grahaNodePositions(): NodePos[] {
  return GRAHA_ORDER.map((graha, i) => {
    const angle = -90 + i * SECTOR_DEG;
    const rad = (angle * Math.PI) / 180;
    return {
      graha,
      angle,
      x: STAGE.cx + Math.cos(rad) * NODE_RADIUS,
      y: STAGE.cy + Math.sin(rad) * NODE_RADIUS,
    };
  });
}

export type Align = 'left' | 'right' | 'center';

export interface ChipPos {
  item: Item;
  graha: GrahaId;
  x: number;
  y: number;
  align: Align;
  scatterX: number;
  scatterY: number;
  scatterRot: number;
  index: number;
}

/**
 * Each cluster is a short vertical column parked just outside its graha node,
 * growing away from the centre. Pills are wide and horizontal, so stacking them
 * radially (the obvious choice) makes neighbours collide at diagonal angles —
 * columns keep every cluster legible and guarantee clearance between sectors.
 */
export function solveChipPositions(items: Item[], seed: number): ChipPos[] {
  const rand = seeded(seed);
  const byGraha = new Map<GrahaId, Item[]>();
  for (const g of GRAHA_ORDER) byGraha.set(g, []);
  for (const it of items) byGraha.get(it.graha)!.push(it);

  const out: ChipPos[] = [];
  let index = 0;

  GRAHA_ORDER.forEach((graha, gi) => {
    const group = byGraha.get(graha)!;
    const angle = -90 + gi * SECTOR_DEG;
    const rad = (angle * Math.PI) / 180;
    const cos = Math.cos(rad);

    const out_ = gi % 2 === 1;
    const ax = STAGE.cx + cos * (out_ ? RX_OUT : RX);
    const ay = STAGE.cy + Math.sin(rad) * (out_ ? RY_OUT : RY);

    // Near-vertical sectors centre their column; the rest grow outward, away from centre.
    const align: Align = Math.abs(cos) < 0.2 ? 'center' : cos > 0 ? 'left' : 'right';

    group.forEach((item, ci) => {
      const offset = (ci - (group.length - 1) / 2) * ROW_H;
      // Small horizontal drift so a column reads as a cluster, not a menu.
      const drift = (rand() - 0.5) * 16;

      const sAng = rand() * Math.PI * 2;
      const sRad = 16 + rand() * 98;

      out.push({
        item,
        graha,
        x: ax + drift,
        y: ay + offset,
        align,
        scatterX: STAGE.cx + Math.cos(sAng) * sRad,
        scatterY: STAGE.cy + Math.sin(sAng) * sRad * 0.78,
        scatterRot: (rand() - 0.5) * 68,
        index: index++,
      });
    });
  });

  return out;
}

/** Stable numeric seed from a domain id, so jitter is reproducible across reloads. */
export function seedFrom(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (Math.abs(h) % 100000) + 1;
}
