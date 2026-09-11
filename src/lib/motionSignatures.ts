import type { MotionSignature } from '../data/types';

/**
 * Idle personality per graha. These run forever at low amplitude — the point is
 * that the character of each force becomes legible before you read a word.
 */
export const SIGNATURES: Record<MotionSignature, { scale: number[]; opacity: number[]; duration: number; ease?: string }> = {
  // Sun: steady, unhurried radiance. Never stops, never surges.
  radiate: { scale: [1, 1.07, 1], opacity: [0.85, 1, 0.85], duration: 4.2, ease: 'easeInOut' },
  // Moon: waxing and waning — a long breath with an uneven return.
  breathe: { scale: [0.93, 1.06, 0.93], opacity: [0.6, 1, 0.6], duration: 7.5, ease: 'easeInOut' },
  // Mars: long hold, then a sharp spike. Aggression is mostly waiting.
  spike: { scale: [1, 1, 1.16, 0.98, 1], opacity: [0.8, 0.8, 1, 0.85, 0.8], duration: 3.1 },
  // Mercury: quick nervous darting, never settled.
  dart: { scale: [1, 1.05, 0.97, 1.04, 1], opacity: [0.8, 1, 0.85, 1, 0.8], duration: 2.3 },
  // Jupiter: slow generous expansion, reluctant contraction.
  expand: { scale: [0.96, 1.12, 0.96], opacity: [0.75, 1, 0.75], duration: 8.4, ease: 'easeInOut' },
  // Venus: smooth symmetrical bloom.
  bloom: { scale: [0.97, 1.09, 0.97], opacity: [0.8, 1, 0.8], duration: 5.6, ease: 'easeInOut' },
  // Saturn: heavy, slow, reluctant. Contracts more than it expands.
  contract: { scale: [1.02, 0.92, 1.02], opacity: [0.7, 0.95, 0.7], duration: 11, ease: 'easeInOut' },
  // Rahu: a swirl that keeps growing and never resolves.
  swirl: { scale: [0.94, 1.14, 1.02, 1.18, 0.94], opacity: [0.65, 1, 0.8, 1, 0.65], duration: 6.8 },
  // Ketu: flickering, intermittent, nearly going out.
  flicker: { scale: [1, 1.03, 0.95, 1.05, 0.98, 1], opacity: [0.45, 0.95, 0.35, 1, 0.5, 0.45], duration: 4.7 },
};
