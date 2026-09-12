import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Starfield } from './components/Starfield';
import { Home } from './components/Home';
import { Mandala } from './components/Mandala';
import { Bands } from './components/Bands';
import { LensRail } from './components/LensRail';
import { GrahaPanel } from './components/GrahaPanel';
import { GrahaGateway } from './components/GrahaGateway';
import { SpineView } from './components/SpineView';
import { TodayPanel } from './components/TodayPanel';
import { About } from './components/About';
import { ShareButton } from './components/ShareButton';
import { DOMAIN_MAP } from './data/domains';
import { GRAHAS } from './data/grahas';
import { navigate, useRoute, usePrefersReducedMotion } from './router';
import type { GrahaId } from './data/types';
import { useIsNarrow } from './lib/useIsNarrow';

export function App() {
  const route = useRoute();
  const reduced = usePrefersReducedMotion();
  const narrow = useIsNarrow();
  const [resortKey, setResortKey] = useState(0);

  // Document views should start at the top when you arrive at them.
  useEffect(() => { window.scrollTo(0, 0); }, [route.view, route.view === 'spine' ? route.graha : '']);

  const domain = route.view === 'lens' ? DOMAIN_MAP[route.domain] : undefined;
  const panelGraha =
    route.view === 'lens' && route.graha && route.graha in GRAHAS
      ? (route.graha as GrahaId)
      : null;

  useEffect(() => {
    if (route.view === 'lens' && !DOMAIN_MAP[route.domain]) navigate({ view: 'home' });
    if (route.view === 'spine' && !(route.graha in GRAHAS)) navigate({ view: 'spine', graha: 'shani' });
    if (route.view === 'graha' && !(route.graha in GRAHAS)) navigate({ view: 'home' });
  }, [route]);

  return (
    <>
      <div className="sky" aria-hidden="true" />
      <Starfield />
      <div className="grain" aria-hidden="true" />

      <div className="shell">
        <header className="hdr">
          <span className="hdr-mark" onClick={() => navigate({ view: 'home' })} style={{ cursor: 'pointer' }}>
            Nava<b>graha</b>
          </span>
          <span className="hdr-sub">kārakatva · the map of significations</span>
          <nav className="hdr-nav">
            <button data-on={route.view === 'home' || route.view === 'graha'} onClick={() => navigate({ view: 'home' })}>Grahas</button>
            <button data-on={route.view === 'lens'} onClick={() => navigate({ view: 'lens', domain: 'body' })}>Lenses</button>
            <button data-on={route.view === 'spine'} onClick={() => navigate({ view: 'spine', graha: 'shani' })}>Spine</button>
            <button data-on={route.view === 'today'} onClick={() => navigate({ view: 'today' })}>Today</button>
            <button data-on={route.view === 'about'} onClick={() => navigate({ view: 'about' })}>About</button>
            <ShareButton />
          </nav>
        </header>

        {route.view === 'home' && <Home reduced={reduced} />}
        {route.view === 'graha' && route.graha in GRAHAS && (
          <GrahaGateway
            grahaId={route.graha as GrahaId}
            domainId={route.domain && DOMAIN_MAP[route.domain] ? route.domain : undefined}
            reduced={reduced}
          />
        )}
        {route.view === 'about' && <About />}
        {route.view === 'today' && <TodayPanel />}
        {route.view === 'spine' && route.graha in GRAHAS && (
          <SpineView grahaId={route.graha as GrahaId} reduced={reduced} />
        )}

        {route.view === 'lens' && domain && (
          <div className="lens-view">
            <div className="lens-bar">
              <button className="ghost-btn" onClick={() => navigate({ view: 'home' })}>← grahas</button>
              <span className="lens-bar-title">{domain.title}</span>
              <span className="lens-bar-q">{domain.question}</span>
              <span className="lens-bar-right">
                <span className="count"><b>{domain.items.length}</b> things · <b>9</b> clusters</span>
                <button className="ghost-btn" onClick={() => setResortKey((k) => k + 1)}>re-sort</button>
              </span>
            </div>
            <div className="lens-body">
              <LensRail current={domain.id} />
              {narrow ? (
                <Bands
                  domain={domain} resortKey={resortKey} reduced={reduced}
                  onPickGraha={(g) => navigate({ view: 'lens', domain: domain.id, graha: g })}
                />
              ) : (
                <Mandala
                  domain={domain} resortKey={resortKey} reduced={reduced}
                  onPickGraha={(g) => navigate({ view: 'lens', domain: domain.id, graha: g })}
                />
              )}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {domain && panelGraha && (
          <GrahaPanel
            key={panelGraha}
            domain={domain}
            grahaId={panelGraha}
            reduced={reduced}
            onClose={() => navigate({ view: 'lens', domain: domain.id })}
          />
        )}
      </AnimatePresence>
    </>
  );
}
