import { GRAHA_ORDER, type GrahaId, type Item } from '../data/types';

/**
 * Fixed logical stage, scaled to fit whatever container it lands in. Solving the
 * layout at a constant size is what guarantees clusters never collide — a
 * viewport-relative solve would overlap at some widths and look accidental.
 *
 * The stage is deliberately wide and short. Scale is bound by the *height* of the
 * available space, so spending the layout budget horizontally — which is the
 * dimension laptops actually have — is what keeps the type legible.
 */
export const STAGE = { w: 1500, h: 830, cx: 750, cy: 415 };

/** Radius of the ring the nine graha nodes sit on. */
export const NODE_RADIUS = 205;

/** Each graha owns a 40 degree sector, running clockwise from the top. */
export const SECTOR_DEG = 360 / GRAHA_ORDER.length;

/**
 * Cluster anchors sit on an ellipse. RX is generous on purpose: at 30°/70° (and
 * their mirrors) two neighbouring columns sit only ~130px apart vertically, which
 * is less than a five-row column is tall, so they can only be separated
 * horizontally. RX >= 458 is what makes those two pairs disjoint in x.
 */
const RX = 480;
const RY = 300;

/** Vertical pitch in a cluster column. Matches chip height, so rows stack tight. */
const ROW_H = 34;

/** Widest a chip is allowed to get; the collision budget is computed against it. */
export const CHIP_MAX_W = 240;

/** How far a node's label sits from the node, radially. */
const LABEL_OUT = 40;
const LABEL_IN = 48;

/** Deterministic jitter: the same domain always lays out identically. */
function seeded(seed: number): () => number {
  let s = (seed * 2654435761) % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

export type Align = 'left' | 'right' | 'center';

/** Near-vertical sectors centre their column; the rest grow outward, away from centre. */
const alignFor = (cos: number): Align => (Math.abs(cos) < 0.2 ? 'center' : cos > 0 ? 'left' : 'right');

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

export interface LabelPos { graha: GrahaId; x: number; y: number }

/**
 * Node labels sit just outside the ring, in the clear annulus between the nodes
 * and their clusters. The one exception is the sector at the top: its own column
 * is directly outward of it, so its label goes inward into the empty middle
 * instead. That is the only sector whose column is centre-aligned.
 */
export function grahaLabelPositions(): LabelPos[] {
  return grahaNodePositions().map(({ graha, angle }) => {
    const rad = (angle * Math.PI) / 180;
    const inward = alignFor(Math.cos(rad)) === 'center';
    const r = NODE_RADIUS + (inward ? -LABEL_IN : LABEL_OUT);
    return { graha, x: STAGE.cx + Math.cos(rad) * r, y: STAGE.cy + Math.sin(rad) * r };
  });
}

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
 * Each cluster is a short vertical column parked outside its graha node, growing
 * away from the centre. Pills are wide and horizontal, so stacking them radially
 * (the obvious choice) makes neighbours collide at diagonal angles — columns keep
 * every cluster legible and guarantee clearance between sectors.
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

    const ax = STAGE.cx + cos * RX;
    const ay = STAGE.cy + Math.sin(rad) * RY;
    const align = alignFor(cos);

    group.forEach((item, ci) => {
      const offset = (ci - (group.length - 1) / 2) * ROW_H;
      // Small horizontal drift so a column reads as a cluster, not a menu.
      const drift = (rand() - 0.5) * 14;

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
