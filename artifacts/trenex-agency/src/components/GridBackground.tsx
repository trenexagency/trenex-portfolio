import { useEffect, useRef } from "react";

/**
 * Full-page premium background grid.
 * – Three CSS layers: fine micro-grid + main grid lines + glowing intersection dots
 * – Slow parallax at ~12% scroll speed
 * – Breathing animation on glow dots via CSS keyframe
 * – Fixed, pointer-events-none, z-[2]
 */
export function GridBackground() {
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);
  const scrollRef = useRef(0);
  const currentY  = useRef(0);

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      const next = currentY.current + (scrollRef.current * 0.12 - currentY.current) * 0.08;
      // Skip DOM write when the change is sub-pixel — avoids unnecessary
      // style mutations and compositor layer invalidation while idle.
      if (Math.abs(next - currentY.current) > 0.05) {
        currentY.current = next;
        if (innerRef.current) {
          innerRef.current.style.transform = `translateY(${next.toFixed(2)}px)`;
        }
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
      <div
        ref={innerRef}
        className="absolute"
        style={{ inset: "-15% 0", willChange: "transform" }}
      >
        {/* Layer 0: micro fine grid — very subtle texture at 30px */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 30 0 L 0 0 0 30' fill='none' stroke='rgba(255%2C255%2C255%2C0.025)' stroke-width='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Layer 1: main grid lines — white, ~8% opacity */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255%2C255%2C255%2C0.08)' stroke-width='0.6'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Layer 2: red glowing intersection dots — breathe via CSS animation */}
        <div
          className="grid-glow-dots absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='0' cy='0' r='7' fill='rgba(235%2C27%2C36%2C0.07)'/%3E%3Ccircle cx='0' cy='0' r='4' fill='rgba(235%2C27%2C36%2C0.18)'/%3E%3Ccircle cx='0' cy='0' r='1.5' fill='rgba(235%2C27%2C36%2C0.80)'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Layer 3: accent dots on secondary 120px grid — larger rare glows */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='0' cy='0' r='14' fill='rgba(235%2C27%2C36%2C0.04)'/%3E%3Ccircle cx='0' cy='0' r='7' fill='rgba(235%2C27%2C36%2C0.09)'/%3E%3C/svg%3E")`,
            backgroundSize: "120px 120px",
          }}
        />
      </div>
    </div>
  );
}
