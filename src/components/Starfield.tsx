import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../router';

interface Star { x: number; y: number; r: number; a: number; depth: number; tw: number }

/**
 * Two parallax depth layers of drifting stars. Canvas is the only thing in the app
 * running a rAF loop — everything else is CSS transform/opacity.
 */
export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(340, Math.round((w * h) / 4200));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random() < 0.62 ? 0 : 1; // far layer is denser and dimmer
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: depth === 0 ? 0.45 + Math.random() * 0.55 : 0.7 + Math.random() * 1.0,
          a: depth === 0 ? 0.18 + Math.random() * 0.34 : 0.3 + Math.random() * 0.5,
          depth,
          tw: Math.random() * Math.PI * 2,
        };
      });
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        // Near layer drifts faster. Slow enough to read as depth, not motion.
        const speed = s.depth === 0 ? 0.0035 : 0.0095;
        const x = (s.x + t * speed) % (w + 4) - 2;
        const twinkle = reduced ? 1 : 0.72 + 0.28 * Math.sin(t * 0.0012 + s.tw);
        ctx.globalAlpha = s.a * twinkle;
        ctx.fillStyle = s.depth === 0 ? '#b9c4e8' : '#ffffff';
        ctx.beginPath();
        ctx.arc(x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    build();
    draw(0);
    const ro = new ResizeObserver(() => { build(); if (reduced) draw(0); });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [reduced]);

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}
