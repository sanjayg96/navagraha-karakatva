import type { Graha } from '../data/types';

/**
 * The single display form for a graha, everywhere in the app: "Śani (Saturn)".
 *
 * The Devanagari is deliberately not rendered anywhere — it is kept in the data
 * as reference only. Routing every label through here means the naming style is
 * one edit away from changing (e.g. dropping diacritics to plain "Sani").
 */
export const grahaName = (g: Graha) => `${g.iast} (${g.englishShort ?? g.english})`;

/** Just the Sanskrit-derived name, for places already showing the English gloss. */
export const grahaShort = (g: Graha) => g.iast;
