import { motion } from 'framer-motion';
import { GRAHAS } from '../data/grahas';
import { GRAHA_ORDER, type GrahaId } from '../data/types';
import { grahaName } from '../lib/names';

/**
 * The narrow-screen stand-in for the orrery.
 *
 * A phone cannot hold six orbits plus the Earth-Moon system: scaled to 375px the
 * diagram gives 14px tap targets, which is simply broken. So on mobile the nine
 * are laid out as a 3x3 in the canonical order instead — big, tappable, and still
 * unmistakably the same nine bodies.
 */
export function GrahaGrid({ reduced, onPick }: { reduced: boolean; onPick: (g: GrahaId) => void }) {
  return (
    <div className="ggrid">
      {GRAHA_ORDER.map((id, i) => {
        const g = GRAHAS[id];
        return (
          <motion.button
            key={id}
            className="ggrid-cell"
            onClick={() => onPick(id)}
            initial={reduced ? false : { opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: reduced ? 0 : i * 0.05, ease: 'easeOut' }}
          >
            <span
              className="ggrid-glow"
              style={{ background: `radial-gradient(circle, ${g.color.glow} 0%, transparent 68%)` }}
            />
            <span
              className="ggrid-body"
              style={{
                background: `radial-gradient(circle at 34% 30%, ${g.color.core}, ${g.color.glow} 72%, ${g.color.ink})`,
                boxShadow: `0 0 16px ${g.color.glow}`,
              }}
            />
            <span className="ggrid-name">{grahaName(g)}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
