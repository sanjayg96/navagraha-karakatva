import { motion } from 'framer-motion';
import type { Graha } from '../data/types';
import { SIGNATURES } from '../lib/motionSignatures';

interface Props {
  graha: Graha;
  x: number;
  y: number;
  landed: boolean;
  reduced: boolean;
  onClick: () => void;
}

/**
 * The glow carries each graha's motion signature — Saturn contracts slowly, Mars
 * holds then spikes. The personality is meant to be legible before you read a word.
 */
export function GrahaNode({ graha, x, y, landed, reduced, onClick }: Props) {
  const sig = SIGNATURES[graha.motion];
  return (
    <div className="node" style={{ left: x, top: y, color: graha.color.core }} onClick={onClick}>
      <div className="node-hit" />
      <motion.div
        className="node-glow"
        style={{ background: `radial-gradient(circle, ${graha.color.glow} 0%, transparent 68%)` }}
        animate={reduced ? { opacity: 0.7, scale: 1 } : { scale: sig.scale, opacity: sig.opacity }}
        transition={reduced ? { duration: 0.4 } : {
          duration: sig.duration,
          repeat: Infinity,
          ease: sig.ease ?? 'easeInOut',
          times: sig.scale.map((_, i) => i / (sig.scale.length - 1)),
        }}
      />
      {/* one-shot bloom as this graha's cluster arrives */}
      <motion.div
        className="node-glow"
        style={{ background: `radial-gradient(circle, ${graha.color.core} 0%, transparent 62%)` }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={landed ? { opacity: [0, 0.55, 0], scale: [0.4, 1.5, 1.9] } : { opacity: 0, scale: 0.4 }}
        transition={{ duration: reduced ? 0.01 : 1.1, ease: 'easeOut' }}
      />
      <motion.div
        className="node-core"
        style={{ background: graha.color.core }}
        animate={landed ? { scale: [1, 1.6, 1] } : { scale: 1 }}
        transition={{ duration: reduced ? 0.01 : 0.7, ease: 'easeOut' }}
      />
    </div>
  );
}
