import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrophyScene } from "@/components/three/TrophyScene";

/**
 * "THE TRENEX SIGNATURE" section — extruded 3D T trophy as brand centrepiece.
 * Canvas lazy-mounts when the section enters the viewport (IntersectionObserver)
 * so it doesn't consume GPU resources until the user scrolls to it.
 */
export function TrophySection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setMounted(true); io.disconnect(); } },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="signature"
      className="relative w-full overflow-hidden bg-[#050505]/90 px-5 py-20 sm:px-6 sm:py-28 md:py-36"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
    >
      {/* top separator */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="mx-auto max-w-6xl">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="mb-4 flex flex-col items-center gap-4 text-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#FF1F1F]">
            Brand Identity
          </span>
          <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            The Trenex Signature
          </h2>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-white/45 md:text-base">
            A symbol of creativity, innovation, and digital excellence.
          </p>
        </motion.div>

        {/* ── Interaction hint ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-6 flex items-center justify-center gap-6"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
            Drag · Scroll · Double-click to reset
          </span>
        </motion.div>

        {/* ── 3D Canvas ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto"
          style={{ maxWidth: 860 }}
        >
          {/* glow halo behind canvas */}
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255,31,31,0.12), transparent 70%)",
            }}
          />

          {/* canvas */}
          {mounted ? (
            <TrophyScene className="relative z-10 h-[420px] w-full cursor-grab active:cursor-grabbing sm:h-[520px] md:h-[620px]" />
          ) : (
            /* Skeleton placeholder while lazy-loading */
            <div className="relative z-10 flex h-[420px] w-full items-center justify-center sm:h-[520px] md:h-[620px]">
              <div
                className="h-24 w-24 animate-spin rounded-full border border-[#FF1F1F]/30 border-t-[#FF1F1F]"
                style={{ animationDuration: "2s" }}
              />
            </div>
          )}

          {/* bottom fade fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-[#050505] to-transparent" />
        </motion.div>

        {/* ── Footer tagline ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-white/20"
        >
          Est. 2022 &nbsp;·&nbsp; Creativity Without Limits
        </motion.p>
      </div>

      {/* bottom separator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </motion.section>
  );
}
