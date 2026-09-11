import { useEffect, useState } from 'react';
import { GRAHAS } from '../data/grahas';
import type { GrahaId } from '../data/types';
import { computeHoras, fmtTime, type HoraState } from '../lib/hora';
import { navigate } from '../router';

/** What each planetary hour is traditionally considered suitable for. */
const HORA_USE: Record<GrahaId, { good: string; weak: string }> = {
  surya: { good: 'authority, decisions that need your name on them, approaching superiors, anything public', weak: 'asking favours, delicate negotiation' },
  chandra: { good: 'domestic matters, travel over water, caring work, anything needing people to feel at ease', weak: 'firm commitments, confrontation' },
  mangala: { good: 'surgery and physical work, confrontation, competition, cutting something off', weak: 'diplomacy, first meetings, marriage talk' },
  budha: { good: 'correspondence, contracts, accounts, study, errands, any quick clear exchange', weak: 'anything requiring gravity or permanence' },
  guru: { good: 'teaching, counsel, finance, ceremonies, beginning anything you want to grow', weak: 'economising, cutting back, saying no' },
  shukra: { good: 'art, music, courtship, hospitality, purchases of beautiful things, reconciliation', weak: 'austerity, hard bargaining' },
  shani: { good: 'maintenance, repair, hard dull necessary work, endings, dealing with property and elders', weak: 'celebrations, launches, asking for something' },
  rahu: { good: '—', weak: '—' },
  ketu: { good: '—', weak: '—' },
};

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function TodayPanel() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [now, setNow] = useState(() => new Date());
  const [geoState, setGeoState] = useState<'idle' | 'asking' | 'denied'>('idle');

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(t);
  }, []);

  const askLocation = () => {
    setGeoState('asking');
    navigator.geolocation.getCurrentPosition(
      (p) => { setCoords({ lat: p.coords.latitude, lon: p.coords.longitude }); setGeoState('idle'); },
      () => setGeoState('denied'),
      { timeout: 8000 },
    );
  };

  const h: HoraState = computeHoras(now, coords);
  const vara = GRAHAS[h.vara];
  const cur = h.slots[h.currentIndex];
  const curG = GRAHAS[cur.graha];
  const use = HORA_USE[cur.graha];

  return (
    <div className="doc">
      <span className="eyebrow">vāra & horā</span>
      <h1>Today</h1>
      <p>
        The weekday itself is a graha — that is not a metaphor, it is where the names came
        from. Each day is then divided into twenty-four planetary hours, twelve between
        sunrise and sunset and twelve through the night, cycling the seven visible grahas
        in order of speed. The day’s own lord rules its first hour.
      </p>

      <div className="today-card">
        <span className="today-label">{DAY_NAMES[h.varaDate.getDay()]} — ruled by</span>
        <div className="today-big" style={{ marginTop: 8 }}>
          <span className="pn-sa" style={{ color: vara.color.core }}>{vara.sanskrit}</span>
          <span className="pn-iast">{vara.iast}</span>
          <span className="pn-en">{vara.english}</span>
        </div>
        <div className="pn-principle" style={{ color: vara.color.core, marginTop: 8 }}>{vara.principle}</div>

        <div style={{ marginTop: 26 }}>
          <span className="today-label">horā now — {fmtTime(cur.start)} to {fmtTime(cur.end)}{cur.night ? ' · night' : ''}</span>
          <div className="today-big" style={{ marginTop: 8 }}>
            <span className="pn-sa" style={{ color: curG.color.core, fontSize: 34 }}>{curG.sanskrit}</span>
            <span className="pn-iast" style={{ fontSize: 23 }}>{curG.iast}</span>
          </div>
          <ul className="pn-list" style={{ marginTop: 12 }}>
            <li><strong style={{ color: '#7fd9a8', fontWeight: 500 }}>good for</strong> — {use.good}</li>
            <li><strong style={{ color: '#e8836f', fontWeight: 500 }}>weak for</strong> — {use.weak}</li>
          </ul>
        </div>

        <div className="hora-strip" style={{ marginTop: 22 }}>
          {h.slots.map((s, i) => (
            <div className="hora-cell" key={i} data-now={i === h.currentIndex} title={`${GRAHAS[s.graha].iast} · ${fmtTime(s.start)}–${fmtTime(s.end)}`}>
              <span className="band-dot" style={{ background: GRAHAS[s.graha].color.core, color: GRAHAS[s.graha].color.core }} />
              {/* 24 labels do not fit; show the current horā plus a few anchors. */}
              <span>{i === h.currentIndex || i % 6 === 0 ? fmtTime(s.start).replace(/^0/, '') : '·'}</span>
            </div>
          ))}
        </div>

        <p className="note-small">
          Sunrise {fmtTime(h.sunrise)} · sunset {fmtTime(h.sunset)}.{' '}
          {h.fallback ? (
            <>
              Using a <strong>6am / 6pm fallback</strong> because this page has no location —
              horā boundaries will be off by however much your real sunrise differs.{' '}
              {geoState === 'denied'
                ? 'Location was declined, which is fine — the vāra above is still correct.'
                : <button className="ghost-btn" style={{ marginLeft: 4 }} onClick={askLocation}>
                    {geoState === 'asking' ? 'asking…' : 'use my location'}
                  </button>}
            </>
          ) : (
            <>Computed from your location, to within about five minutes. It never leaves your browser.</>
          )}
        </p>
      </div>

      <h2>Why Rāhu and Ketu are missing</h2>
      <p>
        They rule no weekday and no horā, and their absence here is correct rather than an
        oversight. The seven visible grahas are bodies with observable periods, and the horā
        cycle is built directly out of those periods. Rāhu and Ketu are not bodies at all —
        they are the two points where the Moon’s path crosses the Sun’s, which is why they
        cause eclipses and why they have no speed of their own to take a turn with.
      </p>

      <p style={{ marginTop: 26 }}>
        <button className="ghost-btn" onClick={() => navigate({ view: 'spine', graha: h.vara })}>
          see {vara.iast} across all ten lenses →
        </button>
      </p>
    </div>
  );
}
