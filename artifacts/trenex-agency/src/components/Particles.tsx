import { useMemo } from "react";

interface ParticlesProps {
  count?: number;
  className?: string;
  sizeRange?: [number, number];
  blurPx?: number;
  drift?: number;
}

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  driftX: number;
}

/**
 * Lightweight ambient particle field — pure CSS animations.
 *
 * Performance vs previous (Framer Motion) version:
 * - Each particle was a `motion.span` with an infinite Framer Motion
 *   animation, requiring JS to compute and apply values every frame.
 * - Now each particle is a plain `<span>` driven by a CSS @keyframes
 *   animation; the browser compositor handles it with zero JS overhead.
 * - For 100 particles in the hero alone this eliminates ~100 Framer
 *   Motion animators running concurrently.
 */
export function Particles({
  count = 40,
  className = "",
  sizeRange = [1, 3.5],
  blurPx = 0,
  drift = 12,
}: ParticlesProps) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
        duration: 6 + Math.random() * 10,
        delay: Math.random() * 6,
        opacity: 0.2 + Math.random() * 0.5,
        driftX: (Math.random() - 0.5) * drift,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, sizeRange[0], sizeRange[1], drift],
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={blurPx ? { filter: `blur(${blurPx}px)` } : undefined}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-[#FF1F1F]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 6px 1px rgba(255,31,31,0.6)",
            // CSS custom properties feed the keyframe — per-particle values
            // without any JS involvement after mount.
            "--particle-opacity": p.opacity,
            "--particle-drift": `${p.driftX}px`,
            animationName: "particle-rise",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationFillMode: "both",
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
