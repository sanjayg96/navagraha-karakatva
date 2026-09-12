import type { GrahaId } from '../data/types';

/**
 * Geometry for the orrery on the home page.
 *
 * The view is tilted rather than face-on: every orbit is an ellipse with
 * ry = rx * TILT. That is partly because it looks like a real orrery, and partly
 * practical — a face-on diagram needs a square, and the space under the headline
 * is wide and short. Tilting spends the budget where the room actually is.
 *
 * Nothing here is to scale. The constraint that matters is that Mercury and the
 * Moon must be comfortably visible and clickable, so sizes are compressed into a
 * range where the *ordering* is honest but the ratios are not.
 */
export const ORBIT_STAGE = { w: 1180, h: 600, cx: 590, cy: 300 };

export const TILT = 0.45;

export interface OrbitBody {
  id: GrahaId | 'earth';
  /** Semi-major axis of the orbit. 0 for the Sun, which sits at the centre. */
  rx: number;
  /** Seconds per revolution in the animation. Ordering is real; durations are not. */
  period: number;
  /** Starting angle in radians, chosen so the bodies never start in a line. */
  phase: number;
  /** Drawn radius of the body itself. */
  radius: number;
  ring?: boolean;
}

/**
 * The Sun, the five star-orbiting grahas, and Earth as the vantage point.
 *
 * Orbit sizes are floored by a hard constraint: the *minor* axis of each ellipse
 * (rx * TILT) has to clear the Sun's disc, or an inner planet passes straight
 * through the Sun at the top and bottom of its orbit. Mercury needs rx >= ~150.
 */
export const BODIES: OrbitBody[] = [
  { id: 'surya',   rx: 0,   period: 1,  phase: 0,   radius: 46 },
  { id: 'budha',   rx: 160, period: 16, phase: 0.6, radius: 11 },
  { id: 'shukra',  rx: 215, period: 24, phase: 2.4, radius: 15 },
  { id: 'earth',   rx: 278, period: 32, phase: 4.1, radius: 16 },
  { id: 'mangala', rx: 340, period: 44, phase: 5.6, radius: 13 },
  { id: 'guru',    rx: 415, period: 70, phase: 1.3, radius: 28 },
  { id: 'shani',   rx: 490, period: 96, phase: 3.3, radius: 24, ring: true },
];

/**
 * The Moon's orbit around Earth, drawn far larger than it should be so that
 * Chandra is clickable and the two nodes are placeable at all.
 */
export const LUNAR = { rx: 84, period: 18, phase: 1.1, radius: 10 };

/**
 * Rāhu and Ketu are the two points where the Moon's orbit crosses the ecliptic —
 * which is exactly why they cause eclipses and why they are bodiless. The node
 * line regresses slowly, and retrograde, as the real one does over 18.6 years.
 */
export const NODES = { period: 150, phase: 0.4 };

export const SATURN_RING = { rx: 42, ry: 15 };

/** Elliptical position at time t (seconds). */
export function orbitPos(b: { rx: number; period: number; phase: number }, t: number) {
  const a = b.phase + (2 * Math.PI * t) / b.period;
  return { x: b.rx * Math.cos(a), y: b.rx * TILT * Math.sin(a), angle: a };
}

/**
 * Bodies on the near half of an orbit (lower on screen) must paint in front of
 * the Sun; bodies on the far half must paint behind it.
 */
export const depthZ = (angle: number) => 100 + Math.round(Math.sin(angle) * 40);
