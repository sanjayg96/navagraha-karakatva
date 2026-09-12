import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GrahaId } from '../data/types';
import { navigate } from '../router';
import { SolarSystem } from './SolarSystem';
import { GrahaGrid } from './GrahaGrid';
import { useIsNarrow } from '../lib/useIsNarrow';

/**
 * The front door.
 *
 * The claim is additive rather than a denial: the grahas *are* these nine bodies,
 * and the doctrine layers a great deal more on top. So the orrery below the
 * headline is not a contradiction to be explained away — it is the starting point.
 * Clicking a body dissolves the orbital scaffolding and opens everything else that
 * the same force is held to be.
 */
export function Home({ reduced }: { reduced: boolean }) {
  const narrow = useIsNarrow();
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState<GrahaId | null>(null);

  const pick = (g: GrahaId) => {
    if (reduced) { navigate({ view: 'graha', graha: g }); return; }
    // Let the scaffolding fall away before the gateway takes over.
    setLeaving(g);
    window.setTimeout(() => navigate({ view: 'graha', graha: g }), 430);
  };

  return (
    <div className="home-v2">
      <div className="hero">
        <span className="eyebrow">jyotiṣa · kārakatva</span>
        <h1>The grahas are <em>more than</em> planets.</h1>
        <p className="hero-sub">
          You have met them as nine bodies in the sky. That is the least interesting
          true thing about them.
        </p>

        <button className="disclose" data-open={open} onClick={() => setOpen((v) => !v)}>
          what they actually are <span>▾</span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className="disclosed"
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: reduced ? 0.15 : 0.45, ease: [0.25, 0.8, 0.3, 1] }}
            >
              <div className="disclosed-in">
                <p>
                  Almost everyone meets astrology as a birth chart — a diagram of where
                  some planets were when you were born, which is both the shallowest part
                  of the system and the easiest to dismiss. The older idea underneath is
                  stranger and much more interesting. Each graha is a{' '}
                  <strong>kind of force</strong>, and that same force is held to recur at
                  every scale of experience: in a part of the body, a type of person, a
                  place, a material, a taste, a stretch of time, a way of speaking, a way
                  of handling money.
                </p>
                <p>
                  Bones. An elderly watchman. A mine. Bitter taste. Pre-dawn. Delay. Iron.
                  Patience. — <strong>One cluster.</strong> Not by superstition: they are
                  all things that time has already worked on.
                </p>
                <p>
                  The nine bodies below are where the names came from — they are the part
                  everyone already knows. Pick one and see what else it is held to be.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hero-cta">
          <b>Click any graha below to begin</b>
          <span className="sep">·</span>
          <button onClick={() => navigate({ view: 'lens', domain: 'body' })}>
            or start from a slice of life instead →
          </button>
        </div>
      </div>

      {narrow ? (
        <GrahaGrid reduced={reduced} onPick={pick} />
      ) : (
        <SolarSystem reduced={reduced} onPick={pick} dissolving={!!leaving} />
      )}

      <p className="orrery-caption">
        {narrow
          ? 'the nine, in the canonical order — tap one'
          : 'the familiar picture — click one for everything else it carries'}
      </p>
      {!narrow && (
        <p className="orrery-note">
          Earth is on the diagram but is not a graha — this system was built by people
          standing on it. Rāhu and Ketu are not bodies at all: they are the two points
          where the Moon’s path crosses the Sun’s, which is why they cause eclipses.
          Sizes and the Moon’s orbit are exaggerated so that everything stays clickable.
        </p>
      )}

      <p className="home-foot">
        449 mapped items across 10 lenses, drawn from the classical kārakatva literature —{' '}
        <cite>Bṛhat Parāśara Horā Śāstra</cite>, <cite>Uttara Kālāmṛta</cite>,{' '}
        <cite>Phaladeepikā</cite>, <cite>Prashna Marga</cite>. A few entries are reasoned
        from the principle rather than attested in the texts; those are marked{' '}
        <sup className="chip-ext">ext</sup>. This is a map of a symbolic system, offered for
        pattern-recognition and self-reflection. It is not prediction, and it is not medical
        or financial advice. <a href="#/about">More on what this is and isn’t →</a>
      </p>
    </div>
  );
}
