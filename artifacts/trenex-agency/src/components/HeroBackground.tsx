import { useMemo } from "react";

/**
 * Self-contained animated backdrop for the Graphic Design hero.
 * Pure CSS animation (no JS ticking) — safe to mount once and forget.
 * Layers, back to front:
 *  1. Deep black base + red glow blooms
 *  2. Subtle grid + a horizontal "timeline" scan line
 *  3. Animated binary code rain (0/1 glyphs, slow fade+drift)
 *  4. Light particles drifting upward
 */
const BINARY_CHARS = ["0", "1"];
const BINARY_COUNT = 46;
const PARTICLE_COUNT = 22;

interface BinaryGlyph {
  id: number;
  char: string;
  left: number;
  top: number;
  size: number;
  dur: number;
  delay: number;
  alpha: number;
}

interface LightParticle {
  id: number;
  left: number;
  top: number;
  size: number;
  dur: number;
  delay: number;
}

export function HeroBackground() {
  const glyphs = useMemo<BinaryGlyph[]>(
    () =>
      Array.from({ length: BINARY_COUNT }, (_, i) => ({
        id: i,
        char: BINARY_CHARS[Math.floor(Math.random() * BINARY_CHARS.length)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 10 + Math.random() * 4,
        dur: 7 + Math.random() * 6,
        delay: Math.random() * 6,
        alpha: 0.12 + Math.random() * 0.22,
      })),
    []
  );

  const particles = useMemo<LightParticle[]>(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: 20 + Math.random() * 70,
        size: 1.5 + Math.random() * 2,
        dur: 8 + Math.random() * 7,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 1. base + red blooms */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(235,27,36,0.16), transparent 68%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 42% 60% at 8% 20%, rgba(235,27,36,0.10), transparent 70%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 42% 60% at 92% 85%, rgba(235,27,36,0.09), transparent 70%)" }}
      />

      {/* 2. subtle grid */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255%2C255%2C255%2C0.05)' stroke-width='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 75% 70% at 50% 50%, black 30%, transparent 88%)",
        }}
      />

      {/* timeline scan line */}
      <div className="absolute inset-x-0 top-1/2 h-px overflow-hidden bg-white/[0.06]">
        <div className="hero-timeline-beam h-full w-1/3 bg-gradient-to-r from-transparent via-[#eb1b24]/70 to-transparent" />
      </div>

      {/* 3. binary code rain */}
      {glyphs.map((g) => (
        <span
          key={g.id}
          className="hero-binary-fade absolute select-none font-mono text-[#eb1b24]"
          style={{
            left: `${g.left}%`,
            top: `${g.top}%`,
            fontSize: `${g.size}px`,
            opacity: 0,
            "--hero-binary-alpha": g.alpha,
            animationDuration: `${g.dur}s`,
            animationDelay: `${g.delay}s`,
          } as React.CSSProperties}
        >
          {g.char}
        </span>
      ))}

      {/* 4. light particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="hero-particle-drift absolute rounded-full bg-white"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0,
            boxShadow: "0 0 6px rgba(255,255,255,0.55)",
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* vignette to keep edges dark */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 45%, rgba(5,5,5,0.75) 100%)" }}
      />
    </div>
  );
}
