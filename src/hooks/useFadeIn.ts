import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to the returned ref and adds the
 * "visible" class once the element scrolls into view. If the visitor
 * has prefers-reduced-motion on, skip the observer entirely and show
 * the element immediately — the CSS fade transition is also gated by
 * the same media query in global.css as a second line of defense.
 */
export function useFadeIn<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('visible');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
