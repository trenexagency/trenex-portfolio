import { useEffect, useMemo, useRef } from "react";
import logoUrl from "@assets/Trenex_Logo_1783248099260.svg";
import { siteConfig } from "@/data/site";
import { gsap } from "@/lib/gsap";

interface LoadingScreenProps {
  onEnter: () => void;
}

const BINARY_PARTICLE_COUNT = 34;

interface BinaryParticle {
  id: number;
  left: string;
  top: string;
  char: "0" | "1";
  delay: number;
}

/**
 * Fully automatic cinematic loading sequence (~3.5s), orchestrated by a
 * single GSAP timeline — no progress bar, no spinner, no click gate:
 *
 * Phase 1 (0 → ~1s):    dark environment fades in, logo "assembles" from a
 *                       rotated/scaled/blurred state into place, digital
 *                       scan lines sweep across the frame.
 * Phase 2 (~1 → ~2s):   binary particles flicker in around the mark, a red
 *                       energy ring pulses outward, the logo's glow builds.
 * Phase 3 (~2 → ~2.9s): "TRENEX AGENCY" reveals letter by letter beneath
 *                       the mark.
 * Phase 4 (~2.9 → ~3.6s): the whole frame pushes forward (zoom) and fades,
 *                       simulating a camera push into the hero section,
 *                       then `onEnter` fires and this component unmounts.
 */
export function LoadingScreen({ onEnter }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scanlinesRef = useRef<HTMLDivElement>(null);
  const scanBeamRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pulseRingRef = useRef<HTMLDivElement>(null);
  const binaryRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<Array<HTMLSpanElement | null>>([]);

  const binaryParticles = useMemo<BinaryParticle[]>(
    () =>
      Array.from({ length: BINARY_PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        char: Math.random() > 0.5 ? "1" : "0",
        delay: Math.random() * 0.6,
      })),
    [],
  );

  const nameLetters = useMemo(() => siteConfig.name.split(""), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.05,
            onComplete: onEnter,
          });
        },
      });

      gsap.set(logoWrapRef.current, { opacity: 0, scale: 0.4, rotate: -25, filter: "blur(16px)" });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.6 });
      gsap.set(pulseRingRef.current, { opacity: 0, scale: 0.5 });
      gsap.set(scanBeamRef.current, { top: "-10%" });
      gsap.set(binaryRef.current, { opacity: 0 });
      gsap.set(lettersRef.current, { opacity: 0, y: 14 });

      // Phase 1 — dark environment + logo assembly + scan lines
      tl.to(containerRef.current, { opacity: 1, duration: 0.35, ease: "power1.out" }, 0);
      tl.to(scanlinesRef.current, { opacity: 1, duration: 0.3 }, 0.05);
      tl.to(
        scanBeamRef.current,
        { top: "110%", duration: 1.1, ease: "power2.inOut" },
        0.05,
      );
      tl.to(
        logoWrapRef.current,
        { opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)", duration: 0.85, ease: "power4.out" },
        0.15,
      );

      // Phase 2 — binary particles, red energy pulse, glow build-up
      tl.to(binaryRef.current, { opacity: 1, duration: 0.2 }, 0.9);
      tl.to(
        glowRef.current,
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        0.95,
      );
      tl.fromTo(
        pulseRingRef.current,
        { opacity: 0.9, scale: 0.5 },
        { opacity: 0, scale: 2.2, duration: 1.1, ease: "power2.out" },
        1.0,
      );
      tl.to(
        logoImgRef.current,
        {
          filter:
            "drop-shadow(0 0 24px rgba(255,31,31,0.75)) drop-shadow(0 0 55px rgba(255,31,31,0.45))",
          duration: 0.9,
          ease: "power2.out",
        },
        1.0,
      );

      // Phase 3 — TRENEX AGENCY letter reveal
      tl.to(
        lettersRef.current,
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.035, ease: "power3.out" },
        1.95,
      );

      // Phase 4 — camera push / zoom into hero, seamless fade
      tl.to(
        containerRef.current,
        { scale: 1.35, duration: 0.65, ease: "power2.in" },
        2.95,
      );
      tl.to(
        [logoWrapRef.current, binaryRef.current, scanlinesRef.current, glowRef.current],
        { opacity: 0, duration: 0.4, ease: "power1.in" },
        2.95,
      );
      tl.to(
        lettersRef.current,
        { opacity: 0, y: -10, duration: 0.35, stagger: 0.01, ease: "power1.in" },
        2.95,
      );
      tl.to(containerRef.current, { opacity: 0, duration: 0.35, ease: "power1.in" }, 3.25);
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
      style={{ opacity: 0 }}
    >
      {/* ambient base wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 45%, rgba(255,31,31,0.14), transparent 60%)",
        }}
      />

      {/* digital scan lines texture */}
      <div
        ref={scanlinesRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* sweeping scan beam */}
      <div
        ref={scanBeamRef}
        className="pointer-events-none absolute left-0 h-24 w-full"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,31,31,0.18), transparent)",
        }}
      />

      {/* binary particle field */}
      <div ref={binaryRef} className="pointer-events-none absolute inset-0">
        {binaryParticles.map((p) => (
          <span
            key={p.id}
            className="absolute select-none font-mono text-[10px] text-[#FF1F1F]/60 animate-bit-fade"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: `${p.delay}s`,
              animationDuration: "1.8s",
              animationIterationCount: "infinite",
              textShadow: "0 0 6px rgba(255,31,31,0.5)",
            }}
          >
            {p.char}
          </span>
        ))}
      </div>

      <div className="relative flex flex-col items-center">
        <div className="relative mb-9 flex items-center justify-center">
          {/* red energy pulse ring */}
          <div
            ref={pulseRingRef}
            className="absolute h-40 w-40 rounded-full border border-[#FF1F1F]/70 sm:h-48 sm:w-48 md:h-56 md:w-56"
          />

          {/* soft ambient glow behind mark */}
          <div
            ref={glowRef}
            className="absolute h-32 w-32 rounded-full sm:h-36 sm:w-36 md:h-40 md:w-40"
            style={{
              background:
                "radial-gradient(circle, rgba(255,31,31,0.5), transparent 70%)",
              filter: "blur(6px)",
            }}
          />

          <div ref={logoWrapRef} className="relative flex items-center justify-center">
            <img
              ref={logoImgRef}
              src={logoUrl}
              alt="Trenex Agency"
              className="relative h-40 w-40 object-contain sm:h-48 sm:w-48 md:h-52 md:w-52"
              style={{
                filter: "drop-shadow(0 0 14px rgba(255,31,31,0.5))",
                imageRendering: "auto",
              }}
              decoding="async"
              loading="eager"
              data-testid="img-logo-loading"
            />
          </div>
        </div>

        <h1 className="flex flex-wrap items-center justify-center text-2xl font-semibold uppercase tracking-[0.35em] text-white sm:text-3xl md:text-4xl">
          {nameLetters.map((letter, i) => (
            <span
              key={i}
              ref={(el) => {
                lettersRef.current[i] = el;
              }}
              className="inline-block"
              style={letter === " " ? { width: "0.4em" } : undefined}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
