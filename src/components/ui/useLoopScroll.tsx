'use client';
import { RefObject, useEffect } from 'react';

export function useLoopScroll(
  ref: RefObject<HTMLDivElement | null>,
  speed: number,
) {
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    let raf = 0;

    const updateDuration = () => {
      const half = el.scrollWidth / 2;
      const duration = half / Math.max(1, speed);
      el.style.setProperty('--loop-duration', `${duration}s`);
      el.style.animationDuration = `var(--loop-duration)`;
    };

    const ro = new ResizeObserver(() => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateDuration);
    });
    ro.observe(el);

    const onResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateDuration);
    };
    window.addEventListener('resize', onResize);

    raf = requestAnimationFrame(updateDuration);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [ref, speed]);
}
