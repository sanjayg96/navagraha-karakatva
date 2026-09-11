import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GRAHAS } from '../data/grahas';
import { GRAHA_ORDER, type Domain, type GrahaId, type Item } from '../data/types';
import { STAGE, NODE_RADIUS, grahaNodePositions, solveChipPositions, seedFrom } from '../lib/layout';
import { hexA } from '../lib/color';
import { GrahaNode } from './GrahaNode';
import { ChipPill } from './Chip';

/* Timing of the three beats. Tuned by eye — see notes in the readme. */
const HOLD_MS = 520;        // how long the mess is held before it resolves
const GRAHA_STAGGER = 46;   // ms between one cluster starting and the next
const CHIP_STAGGER = 17;    // ms between chips inside a cluster

interface Props {
  domain: Domain;
  resortKey: number;
  reduced: boolean;
  onPickGraha: (g: GrahaId) => void;
}

export function Mandala({ domain, resortKey, reduced, onPickGraha }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [sorted, setSorted] = useState(reduced);
  const [tip, setTip] = useState<{ x: number; y: number; item: Item } | null>(null);

  const chips = useMemo(
    () => solveChipPositions(domain.items, seedFrom(domain.id)),
    [domain.id, domain.items],
  );
  const nodes = useMemo(() => grahaNodePositions(), []);
  const counts = useMemo(() => {
    const m = {} as Record<GrahaId, number>;
    for (const g of GRAHA_ORDER) m[g] = 0;
    for (const it of domain.items) m[it.graha]++;
    return m;
  }, [domain.items]);

  /* Beat 1+2: mount scattered, hold the mess, then release the sort. */
  useEffect(() => {
    if (reduced) { setSorted(true); return; }
    setSorted(false);
    const t = window.setTimeout(() => setSorted(true), HOLD_MS);
    return () => window.clearTimeout(t);
  }, [domain.id, resortKey, reduced]);

  /* Scale the fixed logical stage down to whatever space we actually have. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const fit = () => {
      const r = el.getBoundingClientRect();
      setScale(Math.min(r.width / STAGE.w, r.height / STAGE.h, 1));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const delayOf = (c: { graha: GrahaId; item: Item }, chipIdx: number) =>
    (GRAHA_ORDER.indexOf(c.graha) * GRAHA_STAGGER + chipIdx * CHIP_STAGGER) / 1000;

  // per-cluster index, for stagger inside a cluster
  const withinCluster = useMemo(() => {
    const seen = {} as Record<GrahaId, number>;
    for (const g of GRAHA_ORDER) seen[g] = 0;
    return chips.map((c) => seen[c.graha]++);
  }, [chips]);

  return (
    <div className="stage-wrap" ref={wrapRef}>
      <div className="stage" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        <svg className="stage-svg" viewBox={`0 0 ${STAGE.w} ${STAGE.h}`}>
          <circle className="ring" cx={STAGE.cx} cy={STAGE.cy} r={NODE_RADIUS} />
          {chips.map((c, i) => {
            const n = nodes.find((nn) => nn.graha === c.graha)!;
            return (
              <motion.path
                key={`ln-${c.item.label}`}
                className="connector"
                d={`M ${n.x} ${n.y} L ${c.x} ${c.y}`}
                stroke={hexA(GRAHAS[c.graha].color.core, 0.18)}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={sorted ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{
                  duration: reduced ? 0.01 : 0.55,
                  delay: reduced ? 0 : delayOf(c, withinCluster[i]) + 0.26,
                  ease: 'easeOut',
                }}
              />
            );
          })}
        </svg>

        {nodes.map((n) => (
          <GrahaNode
            key={n.graha}
            graha={GRAHAS[n.graha]}
            x={n.x}
            y={n.y}
            landed={sorted}
            reduced={reduced}
            onClick={() => onPickGraha(n.graha)}
          />
        ))}

        {/* Labels sit inward of the ring so they never collide with the clusters. */}
        {nodes.map((n) => {
          const rad = (n.angle * Math.PI) / 180;
          const lx = STAGE.cx + Math.cos(rad) * (NODE_RADIUS - 52);
          const ly = STAGE.cy + Math.sin(rad) * (NODE_RADIUS - 52);
          const g = GRAHAS[n.graha];
          return (
            <div
              key={`lb-${n.graha}`}
              className="node-label"
              style={{ left: lx, top: ly, transform: 'translate(-50%, -50%)', color: g.color.core }}
            >
              <div className="node-label-sa">{g.sanskrit}</div>
              <div className="node-label-en">{g.iast}</div>
              <div className="node-count">{counts[n.graha]}</div>
            </div>
          );
        })}

        {chips.map((c, i) => (
          <motion.div
            key={`${domain.id}-${c.item.label}`}
            className="chip-anchor"
            data-align={c.align}
            initial={
              // Reduced motion gets no scatter and no travel: chips simply appear in place.
              reduced
                ? { x: c.x, y: c.y, rotate: 0, opacity: 0, scale: 1 }
                : { x: c.scatterX, y: c.scatterY, rotate: c.scatterRot, opacity: 0, scale: 0.82 }
            }
            animate={
              sorted
                ? { x: c.x, y: c.y, rotate: 0, opacity: 1, scale: 1 }
                : { x: c.scatterX, y: c.scatterY, rotate: c.scatterRot, opacity: 0.42, scale: 0.86 }
            }
            transition={
              reduced
                ? { duration: 0.3, delay: i * 0.003 }
                : sorted
                  ? {
                      type: 'spring', stiffness: 120, damping: 18, mass: 0.8,
                      delay: delayOf(c, withinCluster[i]),
                      opacity: { duration: 0.4, delay: delayOf(c, withinCluster[i]) },
                    }
                  : { duration: 0.22, delay: i * 0.008 }
            }
          >
            <ChipPill
              item={c.item}
              onEnter={(e, item) => setTip({ x: e.clientX, y: e.clientY, item })}
              onLeave={() => setTip(null)}
              onClick={() => onPickGraha(c.graha)}
            />
          </motion.div>
        ))}
      </div>

      {tip?.item.note && (
        <div
          className="tip"
          style={{
            left: Math.min(tip.x + 16, window.innerWidth - 306),
            top: Math.min(tip.y + 16, window.innerHeight - 140),
          }}
        >
          <b>{tip.item.label}</b>
          {tip.item.note}
          <i>
            {GRAHAS[tip.item.graha].iast}
            {tip.item.extension ? ' · reasoned extension' : ''}
          </i>
        </div>
      )}
    </div>
  );
}
