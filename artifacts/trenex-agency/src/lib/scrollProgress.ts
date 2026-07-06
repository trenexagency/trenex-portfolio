/**
 * Lightweight singleton scroll-progress tracker shared between the DOM and
 * the R3F canvas. We deliberately avoid React state here — scroll fires far
 * too often to re-render a component tree with it. Instead we mutate a
 * plain object and let `useFrame` callbacks read `scrollProgress.value`
 * directly every frame, and rAF-throttle the DOM listener so we never do
 * more than one measurement per paint.
 */
export const scrollProgress = {
  /** Normalized scroll position, 0 (top) → 1 (bottom). */
  value: 0,
  /** Raw scrollY, exposed for effects that want absolute px offsets. */
  rawY: 0,
};

let initialized = false;

export function initScrollProgressTracking() {
  if (initialized || typeof window === "undefined") return () => {};
  initialized = true;

  let ticking = false;

  const measure = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    scrollProgress.rawY = window.scrollY;
    scrollProgress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    ticking = false;
  };

  const handleScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(measure);
  };

  measure();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll, { passive: true });

  return () => {
    initialized = false;
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScroll);
  };
}
