import type { GrahaId } from '../data/types';

/**
 * Surface descriptions for the rendered spheres.
 *
 * These are *astronomical* appearances, deliberately unrelated to the classical
 * graha colours used for the UI accents — Budha's accent is green because the
 * texts assign Mercury the colour of dūrvā grass, while the planet itself is grey
 * rock. Both are shown, and the About page explains why they differ.
 *
 * Textures are procedural SVG rather than images: they have to look right at 26px
 * on the orrery and at 800px on the gateway disc, and they must not cost a network
 * request inside a published artifact.
 */
export interface PlanetTexture {
  /** Ground colour of the surface. */
  base: string;
  /** Mottle / band highlight colour. */
  mid: string;
  /** Darker blotches — maria, shadowed terrain, belt gaps. */
  dark: string;
  kind: 'star' | 'rocky' | 'cloudy' | 'banded' | 'terran';
  /** feTurbulence base frequency; higher = finer grain. */
  freq: number;
  seed: number;
  /** Belts, for the gas giants. */
  bands?: number;
  /** Jupiter gets its spot. */
  spot?: boolean;
}

export const TEXTURES: Partial<Record<GrahaId | 'earth', PlanetTexture>> = {
  surya:   { kind: 'star',   base: '#FF9D21', mid: '#FFE39A', dark: '#D94E0A', freq: 0.09, seed: 7 },
  budha:   { kind: 'rocky',  base: '#8A8681', mid: '#C0BAB0', dark: '#46443F', freq: 0.14, seed: 23 },
  shukra:  { kind: 'cloudy', base: '#D8B673', mid: '#F6E7BE', dark: '#94733C', freq: 0.05, seed: 41 },
  earth:   { kind: 'terran', base: '#2A6CA8', mid: '#3E9159', dark: '#10304E', freq: 0.07, seed: 11 },
  chandra: { kind: 'rocky',  base: '#9B978E', mid: '#CFCAC0', dark: '#575349', freq: 0.12, seed: 57 },
  mangala: { kind: 'rocky',  base: '#B44F2C', mid: '#E09263', dark: '#672814', freq: 0.10, seed: 31 },
  guru:    { kind: 'banded', base: '#C7A074', mid: '#F2DDBC', dark: '#87603C', freq: 0.06, seed: 5,  bands: 9, spot: true },
  shani:   { kind: 'banded', base: '#D6BE88', mid: '#F4E7C2', dark: '#9A7F4C', freq: 0.05, seed: 19, bands: 7 },
};

/** Classical colour assigned to each graha in the texts — the app's accent palette. */
export const CLASSICAL_COLOUR: Record<GrahaId, string> = {
  surya: 'copper-red',
  chandra: 'white',
  mangala: 'blood red',
  budha: 'green, the colour of dūrvā grass',
  guru: 'yellow, tawny gold',
  shukra: 'bright white, variegated',
  shani: 'black, dark blue',
  rahu: 'smoke',
  ketu: 'grey, many-coloured',
};
