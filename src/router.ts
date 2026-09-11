import { useEffect, useState } from 'react';

export type Route =
  | { view: 'home' }
  | { view: 'lens'; domain: string; graha?: string }
  | { view: 'spine'; graha: string }
  | { view: 'today' }
  | { view: 'about' };

export function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (parts[0] === 'lens' && parts[1]) return { view: 'lens', domain: parts[1], graha: parts[2] };
  if (parts[0] === 'spine' && parts[1]) return { view: 'spine', graha: parts[1] };
  if (parts[0] === 'today') return { view: 'today' };
  if (parts[0] === 'about') return { view: 'about' };
  return { view: 'home' };
}

export function toHash(r: Route): string {
  switch (r.view) {
    case 'lens': return `#/lens/${r.domain}${r.graha ? `/${r.graha}` : ''}`;
    case 'spine': return `#/spine/${r.graha}`;
    case 'today': return '#/today';
    case 'about': return '#/about';
    default: return '#/';
  }
}

export function navigate(r: Route) {
  const h = toHash(r);
  if (window.location.hash !== h) window.location.hash = h;
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  useEffect(() => {
    const on = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

/** Single source of truth for the reduced-motion branch. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}
