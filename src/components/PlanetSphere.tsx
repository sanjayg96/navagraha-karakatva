import { TEXTURES, type PlanetTexture } from '../lib/textures';
import type { GrahaId } from '../data/types';

/**
 * A procedurally textured sphere.
 *
 * Everything is drawn with SVG filters rather than bitmaps, for three reasons: it
 * stays sharp from 26px on the orrery up to 800px on the gateway disc, it costs no
 * network request inside a published artifact, and the same description can drive
 * both sizes. feTurbulence supplies the mottling; a displacement map warps the gas
 * giants' belts so they swirl instead of sitting as flat stripes.
 */
export function PlanetSphere({ id, uid, className, style }: {
  id: GrahaId | 'earth';
  /** Filter ids must be unique per instance — the same body renders twice. */
  uid: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const t = TEXTURES[id];
  if (!t) return null;

  const k = `${id}-${uid}`;
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <defs>
        <clipPath id={`clip-${k}`}>
          <circle cx="50" cy="50" r="50" />
        </clipPath>

        {/* Mottling: noise turned into a single tint with noise-driven alpha. */}
        <filter id={`mottle-${k}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency={t.freq} numOctaves={3} seed={t.seed} result="n" />
          <feColorMatrix
            in="n"
            type="matrix"
            values={`0 0 0 0 ${hx(t.dark).r}
                     0 0 0 0 ${hx(t.dark).g}
                     0 0 0 0 ${hx(t.dark).b}
                     0.9 0 0 0 -0.28`}
          />
        </filter>

        {/* A second, lighter pass so the surface is not uniformly dark. */}
        <filter id={`light-${k}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency={t.freq * 1.7} numOctaves={2} seed={t.seed + 13} result="n" />
          <feColorMatrix
            in="n"
            type="matrix"
            values={`0 0 0 0 ${hx(t.mid).r}
                     0 0 0 0 ${hx(t.mid).g}
                     0 0 0 0 ${hx(t.mid).b}
                     0.8 0 0 0 -0.34`}
          />
        </filter>

        {/* Warps the belts into something that looks like weather. */}
        <filter id={`warp-${k}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.06" numOctaves={3} seed={t.seed + 3} result="w" />
          <feDisplacementMap in="SourceGraphic" in2="w" scale="11" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Sphere shading: highlight upper-left, terminator falling to the lower-right limb. */}
        <radialGradient id={`shade-${k}`} cx="33%" cy="27%" r="82%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.40" />
          <stop offset="34%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="62%" stopColor="#000000" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.80" />
        </radialGradient>

        {/* The Sun is lit from within rather than from outside. */}
        <radialGradient id={`star-${k}`} cx="50%" cy="50%" r="52%">
          <stop offset="0%" stopColor={t.mid} stopOpacity="0.95" />
          <stop offset="58%" stopColor={t.base} stopOpacity="0.25" />
          <stop offset="92%" stopColor={t.dark} stopOpacity="0.55" />
          <stop offset="100%" stopColor={t.dark} stopOpacity="0.9" />
        </radialGradient>
      </defs>

      <g clipPath={`url(#clip-${k})`}>
        <circle cx="50" cy="50" r="50" fill={t.base} />
        <rect width="100" height="100" filter={`url(#mottle-${k})`} opacity={t.kind === 'star' ? 0.5 : 0.72} />
        <rect width="100" height="100" filter={`url(#light-${k})`} opacity={t.kind === 'star' ? 0.6 : 0.5} />

        {t.kind === 'terran' && <Continents t={t} k={k} />}
        {t.kind === 'banded' && <Belts t={t} k={k} />}

        <circle
          cx="50" cy="50" r="50"
          fill={t.kind === 'star' ? `url(#star-${k})` : `url(#shade-${k})`}
        />
      </g>
    </svg>
  );
}

/** Rough landmasses — enough to read as Earth at a glance, not a real map. */
function Continents({ t, k }: { t: PlanetTexture; k: string }) {
  return (
    <g filter={`url(#warp-${k})`} opacity="0.9">
      <path d="M18 30 q14 -9 26 -2 t20 6 q-6 10 -18 9 T22 44 Q12 38 18 30Z" fill={t.mid} />
      <path d="M56 56 q13 -6 22 2 t8 14 q-12 8 -24 3 T52 66 Q49 59 56 56Z" fill={t.mid} />
      <path d="M26 66 q9 -5 15 1 t4 10 q-9 5 -16 0 T26 66Z" fill={t.mid} opacity="0.8" />
      <ellipse cx="50" cy="96" rx="30" ry="9" fill="#eaf2f8" opacity="0.55" />
      <ellipse cx="50" cy="4" rx="26" ry="8" fill="#eaf2f8" opacity="0.45" />
    </g>
  );
}

/** Latitude belts for the gas giants, warped so they swirl. */
function Belts({ t, k }: { t: PlanetTexture; k: string }) {
  const n = t.bands ?? 8;
  return (
    <g filter={`url(#warp-${k})`}>
      {Array.from({ length: n }).map((_, i) => {
        const y = (100 / (n + 1)) * (i + 1);
        // Belts are widest at the equator and pinch toward the poles.
        const h = 3.2 + 4.6 * Math.sin((Math.PI * y) / 100);
        return (
          <ellipse
            key={i}
            cx="50"
            cy={y}
            rx={52 * Math.sin(Math.acos(Math.min(0.99, Math.abs(y - 50) / 50)))}
            ry={h / 2}
            fill={i % 2 === 0 ? t.mid : t.dark}
            opacity={i % 2 === 0 ? 0.55 : 0.38}
          />
        );
      })}
      {t.spot && <ellipse cx="66" cy="62" rx="11" ry="6.4" fill="#C2542F" opacity="0.72" />}
    </g>
  );
}

/** #rrggbb -> 0..1 channel floats, which is what feColorMatrix wants. */
function hx(hex: string) {
  const n = parseInt(hex.replace('#', ''), 16);
  return {
    r: (((n >> 16) & 255) / 255).toFixed(3),
    g: (((n >> 8) & 255) / 255).toFixed(3),
    b: ((n & 255) / 255).toFixed(3),
  };
}
