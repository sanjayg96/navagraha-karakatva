import { GRAHAS } from '../data/grahas';
import { hexA } from '../lib/color';
import type { Item } from '../data/types';

interface Props {
  item: Item;
  onEnter?: (e: React.MouseEvent, item: Item) => void;
  onLeave?: () => void;
  onClick?: () => void;
  dim?: boolean;
}

/** One mapped thing. The same pill is reused on the mandala, the mobile bands and in the panels. */
export function ChipPill({ item, onEnter, onLeave, onClick, dim }: Props) {
  const g = GRAHAS[item.graha];
  return (
    <span
      className="chip"
      style={{
        background: hexA(g.color.core, dim ? 0.05 : 0.1),
        borderColor: hexA(g.color.core, dim ? 0.16 : 0.34),
        color: dim ? 'var(--ink-faint)' : g.color.core,
      }}
      onMouseEnter={onEnter ? (e) => onEnter(e, item) : undefined}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {item.label}
      {item.extension && <sup className="chip-ext" title="reasoned extension, not attested in the texts">ext</sup>}
    </span>
  );
}
