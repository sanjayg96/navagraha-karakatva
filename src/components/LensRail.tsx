import { DOMAINS } from '../data/domains';
import { navigate } from '../router';

/**
 * Sideways navigation between lenses. Without this the only route from one lens
 * to another is back to the home page and a scroll, which made comparing two
 * lenses — the whole point of the thing — needlessly expensive.
 *
 * Becomes a horizontally scrolling strip on narrow screens.
 */
export function LensRail({ current }: { current: string }) {
  return (
    <nav className="rail" aria-label="Lenses">
      <span className="rail-hd eyebrow">lenses</span>
      <div className="rail-list">
        {DOMAINS.map((d, i) => (
          <button
            key={d.id}
            className="rail-item"
            data-on={d.id === current}
            onClick={() => navigate({ view: 'lens', domain: d.id })}
          >
            <span className="rail-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="rail-name">{d.title}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
