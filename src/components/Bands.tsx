import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { GRAHAS } from '../data/grahas';
import { GRAHA_ORDER, type Domain, type GrahaId } from '../data/types';
import { ChipPill } from './Chip';

/**
 * Narrow-screen form of the sort. Same three beats — scatter, hold, resolve —
 * expressed as bands that fill left to right rather than a ring.
 */
export function Bands({ domain, resortKey, reduced, onPickGraha }: {
  domain: Domain; resortKey: number; reduced: boolean; onPickGraha: (g: GrahaId) => void;
}) {
  const [sorted, setSorted] = useState(reduced);

  useEffect(() => {
    if (reduced) { setSorted(true); return; }
    setSorted(false);
    const t = window.setTimeout(() => setSorted(true), 480);
    return () => window.clearTimeout(t);
  }, [domain.id, resortKey, reduced]);

  const grouped = useMemo(
    () => GRAHA_ORDER.map((g) => ({ g, items: domain.items.filter((i) => i.graha === g) })),
    [domain.items],
  );

  return (
    <div className="bands">
      {grouped.map(({ g, items }, gi) => {
        const gr = GRAHAS[g];
        return (
          <div className="band" key={g}>
            <div className="band-hd" onClick={() => onPickGraha(g)}>
              <span className="band-dot" style={{ background: gr.color.core, color: gr.color.core }} />
              <span className="band-name" style={{ color: gr.color.core }}>{gr.sanskrit}</span>
              <span className="band-en">{gr.iast}</span>
              <span className="band-n">{items.length}</span>
            </div>
            <div className="band-chips">
              {items.map((it, ci) => (
                <motion.div
                  key={it.label}
                  initial={{ opacity: 0, x: -22 }}
                  animate={sorted ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -22 }}
                  transition={
                    reduced
                      ? { duration: 0.3 }
                      : { type: 'spring', stiffness: 170, damping: 20, delay: gi * 0.055 + ci * 0.028 }
                  }
                >
                  <ChipPill item={it} onClick={() => onPickGraha(g)} />
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
