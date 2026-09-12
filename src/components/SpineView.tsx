import { motion } from 'framer-motion';
import { GRAHAS } from '../data/grahas';
import { DOMAINS } from '../data/domains';
import { GRAHA_ORDER, type GrahaId } from '../data/types';
import { navigate } from '../router';
import { ChipPill } from './Chip';
import { grahaName, grahaShort } from '../lib/names';

/**
 * One graha, restated in ten different materials. Scanning down this column is
 * the second aha: it is not ten facts about Saturn, it is one fact ten times.
 */
export function SpineView({ grahaId, reduced }: { grahaId: GrahaId; reduced: boolean }) {
  const g = GRAHAS[grahaId];

  return (
    <div className="spine">
      <div className="spine-hd">
        <span className="eyebrow">one principle · ten materials</span>
        <div className="pn-name" style={{ marginTop: 10 }}>
          <span className="pn-iast" style={{ color: g.color.core }}>{grahaName(g)}</span>
        </div>
        <div className="pn-principle" style={{ color: g.color.core, marginTop: 8 }}>{g.principle}</div>
        <div className="spine-switch">
          {GRAHA_ORDER.map((id) => {
            const o = GRAHAS[id];
            return (
              <button
                key={id}
                className="gsw"
                data-on={id === grahaId}
                style={id === grahaId ? { color: o.color.core } : undefined}
                onClick={() => navigate({ view: 'spine', graha: id })}
              >
                <span className="band-dot" style={{ background: o.color.core, color: o.color.core }} />
                {grahaShort(o)}
              </button>
            );
          })}
        </div>
      </div>

      <p style={{ color: 'var(--ink-dim)', lineHeight: 1.74, maxWidth: '64ch', marginTop: 4 }}>
        {g.essence}
      </p>

      {DOMAINS.map((d, i) => {
        const items = d.items.filter((it) => it.graha === grahaId);
        const note = d.clusterNotes[grahaId];
        return (
          <motion.div
            className="spine-row"
            key={d.id}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: Math.min(i, 4) * 0.04 }}
          >
            <div className="spine-dom">
              <div className="spine-dom-t">{d.title}</div>
              <div className="spine-dom-n">{String(i + 1).padStart(2, '0')}</div>
              <button
                className="ghost-btn"
                style={{ marginTop: 10, fontSize: 9 }}
                onClick={() => navigate({ view: 'lens', domain: d.id, graha: grahaId })}
              >
                open lens
              </button>
            </div>
            <div className="spine-body">
              {note && <div className="spine-note">{note}</div>}
              <div className="spine-chips">
                {items.map((it) => <ChipPill key={it.label} item={it} />)}
              </div>
            </div>
          </motion.div>
        );
      })}

      <div className="spine-row" style={{ display: 'block' }}>
        <div className="pn-two" style={{ marginTop: 6 }}>
          <div>
            <h4 className="h-good">strengthened by</h4>
            <ul className="pn-list good">{g.strengthenedBy.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div>
            <h4 className="h-bad">depleted by</h4>
            <ul className="pn-list bad">{g.depletedBy.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}
