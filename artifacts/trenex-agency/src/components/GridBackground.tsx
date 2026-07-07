import { useEffect, useRef } from "react";

/**
 * Full-page futuristic background grid.
 * – Pure CSS SVG patterns (no canvas, zero JS per frame beyond one RAF translateY)
 * – Two layers: subtle white grid lines + red glowing intersection dots
 * – Slow parallax: grid scrolls at ~12 % of page scroll speed
 * – Breathing animation on glow dots via CSS keyframe
 * – Fixed, pointer-events-none, z-[2] (above Three.js canvas at z-0, below content at z-10)
 */
export function GridBackground() {
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      // Lerp toward target for a buttery-smooth parallax feel
      currentY.current += (scrollRef.current * 0.12 - currentY.current) * 0.08;
      if (innerRef.current) {
        innerRef.current.style.transform = `translateY(${currentY.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
      aria-hidden="true"
    >
      {/* Inner div extends beyond viewport so parallax movement doesn't clip edges */}
      <div
        ref={innerRef}
        className="absolute"
        style={{
          inset: "-15% 0",
          willChange: "transform",
        }}
      >
        {/* Layer 1: grid lines — white, ~6 % opacity */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255%2C255%2C255%2C0.07)' stroke-width='0.6'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Layer 2: red glowing intersection dots — breathe via CSS animation */}
        <div
          className="grid-glow-dots absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='0' cy='0' r='6' fill='rgba(220%2C38%2C38%2C0.06)'/%3E%3Ccircle cx='0' cy='0' r='3.5' fill='rgba(220%2C38%2C38%2C0.15)'/%3E%3Ccircle cx='0' cy='0' r='1.4' fill='rgba(220%2C38%2C38%2C0.75)'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
    </div>
  );
}
