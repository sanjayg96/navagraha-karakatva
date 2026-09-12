import { motion, AnimatePresence } from 'framer-motion';
import { GRAHAS } from '../data/grahas';
import { DOMAINS, DOMAIN_MAP } from '../data/domains';
import type { GrahaId } from '../data/types';
import { grahaName, grahaShort } from '../lib/names';
import { hexA } from '../lib/color';
import { navigate } from '../router';
import { ChipPill } from './Chip';
import { PlanetSphere } from './PlanetSphere';
import { TEXTURES, CLASSICAL_COLOUR } from '../lib/textures';

interface Props {
  grahaId: GrahaId;
  domainId?: string;
  reduced: boolean;
}

/**
 * The graha-first half of the app. The body arrives from the orrery, parks at the
 * left edge showing only its inner half, and — crucially — is no longer drawn as a
 * planet. It is the same bloom used for a node on the mandala. That is the whole
 * argument of the home page, performed: the thing stops being a planet the moment
 * you engage with it.
 */
export function GrahaGateway({ grahaId, domainId, reduced }: Props) {
  const g = GRAHAS[grahaId];
  const open = domainId ? DOMAIN_MAP[domainId] : undefined;

  return (
    <div className="gate">
      <div className="gate-orb" aria-hidden="true">
        <div className="gate-layer">
        <motion.div
          className="gate-disc"
          initial={reduced ? false : { x: '-14%', scale: 0.72, opacity: 0 }}
          animate={{ x: '0%', scale: 1, opacity: 1 }}
          transition={reduced ? { duration: 0.2 } : { type: 'spring', stiffness: 62, damping: 18 }}
        >
          {/* Same procedural surface as the orrery, so the body you clicked is
              recognisably the body that arrived. */}
          {TEXTURES[grahaId]
            ? <PlanetSphere id={grahaId} uid="gate" className="gate-sphere" />
            : <span
                className="gate-sphere"
                style={{
                  display: 'block', borderRadius: '50%',
                  background: `radial-gradient(circle at 62% 44%, ${g.color.core} 0%, ${g.color.glow} 42%, ${g.color.ink} 78%, transparent 82%)`,
                }}
              />}
        </motion.div>
        </div>
        <div className="gate-layer">
          <motion.div
            className="gate-bloom"
            style={{ background: `radial-gradient(circle, ${g.color.glow} 0%, transparent 64%)` }}
            initial={reduced ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.85, scale: 1 }}
            transition={{ duration: reduced ? 0.2 : 1.1, ease: 'easeOut' }}
          />
        </div>
      </div>

      <motion.div
        className="gate-panel"
        initial={reduced ? false : { opacity: 0, x: 26 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: reduced ? 0.2 : 0.55, delay: reduced ? 0 : 0.22, ease: 'easeOut' }}
      >
        <button className="ghost-btn gate-back" onClick={() => navigate({ view: 'home' })}>
          ← all grahas
        </button>

        <h1 className="gate-name" style={{ color: g.color.core }}>{grahaName(g)}</h1>
        <div className="pn-principle" style={{ color: g.color.core }}>{g.principle}</div>
        <p className="gate-essence">{g.essence}</p>

        <div className="gate-lenses-hd">
          <span className="eyebrow">the same force, in ten registers</span>
          <hr className="rule" />
        </div>

        <div className="gate-lenses">
          {DOMAINS.map((d, i) => {
            const n = d.items.filter((it) => it.graha === grahaId).length;
            return (
              <motion.button
                key={d.id}
                layoutId={`cell-${grahaId}-${d.id}`}
                className="gate-lens"
                style={{ borderColor: hexA(g.color.core, 0.18) }}
                onClick={() => navigate({ view: 'graha', graha: grahaId, domain: d.id })}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: reduced ? 0 : 0.3 + i * 0.035 }}
              >
                <span className="gate-lens-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="gate-lens-title">{d.title}</span>
                <span className="gate-lens-n" style={{ color: g.color.core }}>{n}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="gate-levers">
          <div>
            <h4 className="h-good">strengthened by</h4>
            <ul className="pn-list good">{g.strengthenedBy.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div>
            <h4 className="h-bad">depleted by</h4>
            <ul className="pn-list bad">{g.depletedBy.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>

        <div className="gate-two" style={{ marginTop: 30 }}>
          <div>
            <h4 className="h-plain">when it is flowing</h4>
            <ul className="pn-list">{g.flowing.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div>
            <h4 className="h-plain">when it is strained</h4>
            <ul className="pn-list">{g.strained.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>

        <p className="gate-colour">
          <span className="eyebrow">on the two colours</span>
          The sphere is {g.english.replace('north lunar node', 'Rāhu').replace('south lunar node', 'Ketu')} as it
          actually looks. The accent colour used for {grahaShort(g)} throughout this app is the
          one the texts assign it — <strong style={{ color: g.color.core }}>{CLASSICAL_COLOUR[grahaId]}</strong>.
          The two are unrelated, and the classical colour is the one that carries meaning.
        </p>
      </motion.div>

      <AnimatePresence>
        {open && (
          <ExplodedCell
            key={open.id}
            grahaId={grahaId}
            domainId={open.id}
            reduced={reduced}
            onClose={() => navigate({ view: 'graha', graha: grahaId })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/** One (graha × lens) cell, opened out of its row. */
function ExplodedCell({ grahaId, domainId, reduced, onClose }: {
  grahaId: GrahaId; domainId: string; reduced: boolean; onClose: () => void;
}) {
  const g = GRAHAS[grahaId];
  const d = DOMAIN_MAP[domainId];
  const items = d.items.filter((it) => it.graha === grahaId);
  const note = d.clusterNotes[grahaId];

  return (
    <>
      <motion.div
        className="cell-scrim"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0.01 : 0.25 }}
        onClick={onClose}
      />
      {/* Centred by flexbox, never by a transform: framer owns `transform` during a
          layoutId morph and would cancel a translate(-50%,-50%). */}
      <div className="cell-wrap">
        <motion.div
          className="cell"
          layoutId={`cell-${grahaId}-${domainId}`}
          style={{ borderColor: hexA(g.color.core, 0.32) }}
          transition={reduced ? { duration: 0.2 } : { type: 'spring', stiffness: 240, damping: 30 }}
        >
          <div className="cell-in">
          <button className="panel-x" onClick={onClose} aria-label="Close">✕</button>

          <span className="eyebrow">
            {grahaShort(g)} · {d.title}
          </span>
          <h2 className="cell-title">{d.title}</h2>

          {note && (
            <div className="pn-thread" style={{ borderColor: hexA(g.color.core, 0.5) }}>
              <span className="eyebrow">why these belong together</span>
              {note}
            </div>
          )}

          <motion.div
            className="pn-items"
            style={{ marginTop: 22 }}
            initial="hide"
            animate="show"
            variants={{ show: { transition: { staggerChildren: reduced ? 0 : 0.035, delayChildren: reduced ? 0 : 0.12 } } }}
          >
            {items.map((it) => (
              <motion.span
                key={it.label}
                variants={{
                  hide: { opacity: 0, scale: 0.7 },
                  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 420, damping: 20 } },
                }}
                style={{ display: 'inline-block' }}
              >
                <ChipPill item={it} />
              </motion.span>
            ))}
          </motion.div>

          <ul className="pn-list" style={{ marginTop: 18 }}>
            {items.filter((i) => i.note).map((it) => (
              <li key={it.label}>
                <strong style={{ color: g.color.core, fontWeight: 500 }}>{it.label}</strong>
                {' — '}{it.note}
              </li>
            ))}
          </ul>

          <div className="cell-cta">
            <button className="ghost-btn" onClick={() => navigate({ view: 'lens', domain: domainId, graha: grahaId })}>
              see all nine clusters in {d.title.toLowerCase()} →
            </button>
          </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
