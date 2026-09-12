import { useEffect, useRef, useState } from 'react';
import { GRAHAS } from '../data/grahas';
import type { GrahaId } from '../data/types';
import { grahaName } from '../lib/names';
import { PlanetSphere } from './PlanetSphere';
import { TEXTURES } from '../lib/textures';
import {
  ORBIT_STAGE, TILT, BODIES, LUNAR, NODES, SATURN_RING, orbitPos, depthZ,
} from '../lib/orbits';

/** Minimum gap kept between a node marker and the Moon, in stage units. */
const NODE_CLEARANCE = 38;

/** Angle used for every body when motion is switched off — a pleasant spread. */
const FROZEN_T = 3.2;

interface Props {
  reduced: boolean;
  onPick: (g: GrahaId) => void;
  /** Set while a graha is departing to its gateway: the scaffolding dissolves. */
  dissolving?: boolean;
}

/**
 * The orrery. One rAF loop writes transforms for ~10 elements — cheaper than it
 * sounds, and it buys exact elliptical motion, correct front/back depth against
 * the Sun, and a retrograde node line, none of which CSS keyframes give you
 * without distorting the bodies.
 *
 * Hovering anywhere on the diagram pauses it, so the small fast movers (Mercury,
 * the Moon) are actually clickable.
 */
export function SolarSystem({ reduced, onPick, dissolving }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const refs = useRef(new Map<string, HTMLDivElement | null>());
  const pausedRef = useRef(false);
  const [scale, setScale] = useState(1);
  const [hover, setHover] = useState<string | null>(null);

  /* Scale the fixed logical stage into whatever room it is given. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const fit = () => {
      const r = el.getBoundingClientRect();
      // Allowed above 1 so large displays actually use their width.
      setScale(Math.min(r.width / ORBIT_STAGE.w, r.height / ORBIT_STAGE.h, 1.2));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const place = (t: number) => {
      const set = (key: string, x: number, y: number, z?: number) => {
        const el = refs.current.get(key);
        if (!el) return;
        el.style.transform = `translate(-50%, -50%) translate(${ORBIT_STAGE.cx + x}px, ${ORBIT_STAGE.cy + y}px)`;
        if (z !== undefined) el.style.zIndex = String(z);
      };

      let earth = { x: 0, y: 0, angle: 0 };
      for (const b of BODIES) {
        const p = b.rx === 0 ? { x: 0, y: 0, angle: 0 } : orbitPos(b, t);
        if (b.id === 'earth') earth = p;
        set(b.id, p.x, p.y, b.rx === 0 ? 100 : depthZ(p.angle));
      }

      // Moon and the two nodes ride on Earth.
      const moon = orbitPos(LUNAR, t);
      const moonX = earth.x + moon.x;
      const moonY = earth.y + moon.y;
      set('chandra', moonX, moonY, depthZ(earth.angle) + 6);

      const nodeA = NODES.phase - (2 * Math.PI * t) / NODES.period; // retrograde
      for (const [key, a] of [['rahu', nodeA], ['ketu', nodeA + Math.PI]] as const) {
        let nx = earth.x + LUNAR.rx * Math.cos(a);
        let ny = earth.y + LUNAR.rx * TILT * Math.sin(a);

        // A node is a point ON the Moon's orbit, so the Moon passes exactly through
        // one every half lunar cycle — correct, and the reason eclipses happen there,
        // but it leaves the marker completely covered and unclickable. Slide it out
        // along its own radius just far enough to stay separate.
        const d = Math.hypot(nx - moonX, ny - moonY);
        if (d < NODE_CLEARANCE) {
          const ux = nx - earth.x;
          const uy = ny - earth.y;
          const ul = Math.hypot(ux, uy) || 1;
          const push = NODE_CLEARANCE - d;
          nx += (ux / ul) * push;
          ny += (uy / ul) * push;
        }

        set(key, nx, ny, depthZ(earth.angle) + 5);
      }
      // The lunar orbit ring itself is centred on Earth.
      set('lunar-ring', earth.x, earth.y, depthZ(earth.angle) + 4);
    };

    if (reduced) { place(FROZEN_T); return; }

    let raf = 0;
    let clock = 0;
    let last = performance.now();
    const tick = (now: number) => {
      // Freezing the clock rather than the loop means it resumes without a jump.
      if (!pausedRef.current) clock += (now - last) / 1000;
      last = now;
      place(clock);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const reg = (key: string) => (el: HTMLDivElement | null) => { refs.current.set(key, el); };

  const body = (id: GrahaId, radius: number, opts: { ring?: boolean } = {}) => {
    const g = GRAHAS[id];
    const on = hover === id;
    return (
      <div
        className="orb"
        ref={reg(id)}
        key={id}
        data-on={on}
        onMouseEnter={() => setHover(id)}
        onMouseLeave={() => setHover(null)}
        onClick={() => onPick(id)}
        role="button"
        tabIndex={0}
        aria-label={grahaName(g)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(id); } }}
      >
        <span className="orb-hit" style={{ width: Math.max(radius * 2 + 26, 52), height: Math.max(radius * 2 + 26, 52) }} />
        <span
          className="orb-glow"
          style={{
            width: radius * 4.2, height: radius * 4.2,
            background: `radial-gradient(circle, ${g.color.glow} 0%, transparent 68%)`,
          }}
        />
        {opts.ring && (
          <span
            className="orb-ring"
            style={{ width: SATURN_RING.rx * 2, height: SATURN_RING.ry * 2, borderColor: g.color.core }}
          />
        )}
        {TEXTURES[id] ? (
          <PlanetSphere
            id={id}
            uid="orb"
            className="orb-body orb-sphere"
            style={{ width: radius * 2, height: radius * 2, boxShadow: `0 0 ${radius * 0.8}px ${g.color.glow}` }}
          />
        ) : (
          <span
            className="orb-body"
            style={{
              width: radius * 2, height: radius * 2,
              background: `radial-gradient(circle at 34% 30%, ${g.color.core}, ${g.color.glow} 72%, ${g.color.ink})`,
              boxShadow: `0 0 ${radius * 0.9}px ${g.color.glow}`,
            }}
          />
        )}
        <span className="orb-label">{grahaName(g)}</span>
      </div>
    );
  };

  return (
    <div className="orrery-wrap" ref={wrapRef}>
      <div
        className="orrery"
        data-dissolving={!!dissolving}
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; setHover(null); }}
      >
        {/* orbit rings — static, and the first thing to go when a graha is picked */}
        <svg className="orrery-rings" viewBox={`0 0 ${ORBIT_STAGE.w} ${ORBIT_STAGE.h}`} aria-hidden="true">
          {BODIES.filter((b) => b.rx > 0).map((b) => (
            <ellipse
              key={b.id}
              cx={ORBIT_STAGE.cx} cy={ORBIT_STAGE.cy}
              rx={b.rx} ry={b.rx * TILT}
              className="orbit-ring"
            />
          ))}
        </svg>

        {/* Sun */}
        {body('surya', 46)}

        {/* star-orbiting grahas */}
        {body('budha', 11)}
        {body('shukra', 15)}
        {body('mangala', 13)}
        {body('guru', 28)}
        {body('shani', 24, { ring: true })}

        {/* Earth — present, labelled, and deliberately not clickable */}
        <div className="orb orb-earth" ref={reg('earth')}>
          <PlanetSphere
            id="earth"
            uid="orb"
            className="orb-body orb-sphere"
            style={{ width: 38, height: 38, boxShadow: '0 0 15px rgba(90, 150, 220, 0.5)' }}
          />
          {/* Above the body on purpose: Chandra's label sits below, so the two
              can never collide however the Moon happens to be placed. */}
          <span className="orb-label orb-label-muted orb-label-above">Earth · not a graha</span>
        </div>

        {/* the Moon's orbit, drawn around Earth */}
        <div className="orb lunar-ring" ref={reg('lunar-ring')} aria-hidden="true">
          <span style={{ width: LUNAR.rx * 2, height: LUNAR.rx * 2 * TILT }} />
        </div>

        {/* Chandra */}
        {body('chandra', LUNAR.radius)}

        {/* the nodes */}
        {(['rahu', 'ketu'] as const).map((id) => {
          const g = GRAHAS[id];
          const on = hover === id;
          return (
            <div
              className="orb orb-node"
              ref={reg(id)}
              key={id}
              data-on={on}
              onMouseEnter={() => setHover(id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onPick(id)}
              role="button"
              tabIndex={0}
              aria-label={grahaName(g)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(id); } }}
            >
              <span className="orb-hit" style={{ width: 56, height: 56 }} />
              <span
                className="orb-glow"
                style={{
                  width: 58, height: 58,
                  background: `radial-gradient(circle, ${g.color.glow} 0%, transparent 66%)`,
                }}
              />
              {/* drawn, not typed: the node glyphs have unreliable font coverage */}
              <svg className="node-glyph" viewBox="0 0 24 24" style={{ color: g.color.core }} aria-hidden="true">
                {id === 'rahu' ? (
                  <path d="M7 19v-5a5 5 0 0 1 10 0v5M7 19a2.2 2.2 0 1 0 0-.1M17 19a2.2 2.2 0 1 0 0-.1"
                        fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                ) : (
                  <path d="M7 5v5a5 5 0 0 0 10 0V5M7 5a2.2 2.2 0 1 1 0 .1M17 5a2.2 2.2 0 1 1 0 .1"
                        fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                )}
              </svg>
              <span className="orb-label">{grahaName(g)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
