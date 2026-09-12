import { motion } from 'framer-motion';
import { GRAHAS } from '../data/grahas';
import type { Domain, GrahaId } from '../data/types';
import { hexA } from '../lib/color';
import { navigate } from '../router';
import { ChipPill } from './Chip';
import { grahaName, grahaShort } from '../lib/names';

interface Props {
  domain: Domain;
  grahaId: GrahaId;
  reduced: boolean;
  onClose: () => void;
}

export function GrahaPanel({ domain, grahaId, reduced, onClose }: Props) {
  const g = GRAHAS[grahaId];
  const items = domain.items.filter((i) => i.graha === grahaId);
  const thread = domain.clusterNotes[grahaId];

  return (
    <>
      <motion.div
        className="panel-scrim"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0.01 : 0.3 }}
        onClick={onClose}
      />
      <motion.aside
        className="panel"
        initial={{ x: reduced ? 0 : '100%', opacity: reduced ? 0 : 1 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: reduced ? 0 : '100%', opacity: reduced ? 0 : 1 }}
        transition={reduced ? { duration: 0.2 } : { type: 'spring', stiffness: 260, damping: 32 }}
      >
        <div className="panel-in">
          <button className="panel-x" onClick={onClose} aria-label="Close">✕</button>

          <div className="pn-name">
            <span className="pn-iast" style={{ color: g.color.core }}>{grahaName(g)}</span>
          </div>
          <div className="pn-principle" style={{ color: g.color.core }}>{g.principle}</div>
          <p className="pn-essence">{g.essence}</p>

          {thread && (
            <div className="pn-thread" style={{ borderColor: hexA(g.color.core, 0.5) }}>
              <span className="eyebrow">why these belong together — in {domain.title.toLowerCase()}</span>
              {thread}
            </div>
          )}

          <div className="pn-sec">
            <span className="eyebrow">{items.length} in this lens</span>
            <div className="pn-items">
              {items.map((it) => <ChipPill key={it.label} item={it} />)}
            </div>
            <ul className="pn-list" style={{ marginTop: 14 }}>
              {items.filter((i) => i.note).map((it) => (
                <li key={it.label}>
                  <strong style={{ color: g.color.core, fontWeight: 500 }}>{it.label}</strong>
                  {' — '}{it.note}
                </li>
              ))}
            </ul>
          </div>

          <div className="pn-sec pn-two">
            <div>
              <h4 className="h-good">when it is flowing</h4>
              <ul className="pn-list good">{g.flowing.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
            <div>
              <h4 className="h-bad">when it is strained</h4>
              <ul className="pn-list bad">{g.strained.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          </div>

          <div className="pn-sec">
            <span className="eyebrow">the practical part</span>
            <div className="pn-two" style={{ marginTop: 10 }}>
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

          <div className="pn-cta">
            <button className="ghost-btn" onClick={() => navigate({ view: 'graha', graha: g.id })}>
              see {grahaShort(g)} across all ten lenses →
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
