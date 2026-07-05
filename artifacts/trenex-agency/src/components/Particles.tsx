import { useMemo } from "react";
import { motion } from "framer-motion";

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
 * Lightweight ambient particle field. Purely decorative — pointer-events
 * disabled so it never interferes with interactive content above it.
 * Supports optional size range / blur / drift to compose multiple depth
 * layers (e.g. small sharp far particles + larger soft-focus near embers).
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
    [count, sizeRange, drift],
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={blurPx ? { filter: `blur(${blurPx}px)` } : undefined}
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[#FF1F1F]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 6px 1px rgba(255,31,31,0.6)",
          }}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{
            opacity: [0, p.opacity, 0],
            y: [-10, -60],
            x: [0, p.driftX],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
