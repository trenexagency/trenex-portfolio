import { useMemo } from "react";
import { motion } from "framer-motion";

interface ParticlesProps {
  count?: number;
  className?: string;
}

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

/**
 * Lightweight ambient particle field. Purely decorative — pointer-events
 * disabled so it never interferes with interactive content above it.
 */
export function Particles({ count = 40, className = "" }: ParticlesProps) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2.5,
        duration: 6 + Math.random() * 10,
        delay: Math.random() * 6,
        opacity: 0.2 + Math.random() * 0.5,
      })),
    [count],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
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
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, p.opacity, 0],
            y: [-10, -60],
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
