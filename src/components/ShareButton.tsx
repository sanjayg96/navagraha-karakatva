import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/** Every view has its own hash, so sharing is just copying the address. */
export function ShareButton() {
  const [done, setDone] = useState(false);

  const copy = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard is unavailable in some embedded contexts; fall back to a prompt.
      window.prompt('Copy this link:', url);
      return;
    }
    setDone(true);
    window.setTimeout(() => setDone(false), 1800);
  };

  return (
    <>
      <button className="ghost-btn" onClick={copy}>share this view</button>
      <AnimatePresence>
        {done && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            link copied
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
