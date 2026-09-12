import { useEffect, useState } from 'react';

/** Shared breakpoint hook — the mandala, the rail and the orrery all branch on it. */
export function useIsNarrow(px = 760): boolean {
  const [narrow, setNarrow] = useState(() => window.innerWidth < px);
  useEffect(() => {
    const on = () => setNarrow(window.innerWidth < px);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, [px]);
  return narrow;
}
