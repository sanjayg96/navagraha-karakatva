export type GrahaId =
  | 'surya' | 'chandra' | 'mangala' | 'budha' | 'guru'
  | 'shukra' | 'shani' | 'rahu' | 'ketu';

/** Idle animation personality — how this force behaves when nothing is happening. */
export type MotionSignature =
  | 'radiate' | 'breathe' | 'spike' | 'dart' | 'expand'
  | 'bloom' | 'contract' | 'swirl' | 'flicker';

export interface Graha {
  id: GrahaId;
  sanskrit: string;
  iast: string;
  english: string;
  /** Compact gloss for tight labels — only the nodes need one. */
  englishShort?: string;
  /** Four words. The force itself, stripped of personality. */
  principle: string;
  /** What this force actually is, before it becomes any particular thing. */
  essence: string;
  color: { core: string; glow: string; ink: string };
  motion: MotionSignature;
  flowing: string[];
  strained: string[];
  strengthenedBy: string[];
  depletedBy: string[];
  /** 0 = Sunday. null for Rahu/Ketu: shadow grahas rule no vara and no hora. */
  weekday: number | null;
}

export interface Item {
  label: string;
  graha: GrahaId;
  /** The one-line why. Shown on hover; this is what converts a list into a reason. */
  note?: string;
  /** true when reasoned from the principle rather than attested in the texts. */
  extension?: boolean;
}

export interface Domain {
  id: string;
  title: string;
  subtitle: string;
  /** Framing line held on screen while the items are still unsorted. */
  question: string;
  items: Item[];
  /** Why THIS cluster coheres in THIS domain. The payoff sentence. */
  clusterNotes: Partial<Record<GrahaId, string>>;
}

export const GRAHA_ORDER: GrahaId[] = [
  'surya', 'chandra', 'mangala', 'budha', 'guru', 'shukra', 'shani', 'rahu', 'ketu',
];
