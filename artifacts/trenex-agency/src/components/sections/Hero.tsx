import { motion } from "framer-motion";
import { Particles } from "@/components/Particles";
import signatureUrl from "@assets/Signature_1784486516004.svg";

/* ─── Animation helpers ─────────────────────────────────────────── */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1, delay, ease: "easeOut" as const },
});

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden px-6 py-28 sm:px-10 sm:py-32 lg:px-16"
    >
      {/* ── Ambient glow — shifted right to sit behind the T ──────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute right-[10%] top-1/2 -translate-y-1/2 h-[640px] w-[640px] rounded-full opacity-20 blur-[140px]"
          style={{ background: "radial-gradient(circle, rgba(255,31,31,0.45) 0%, transparent 70%)" }}
        />
        <div
          className="absolute right-[5%] top-1/2 -translate-y-1/2 h-[900px] w-[900px] rounded-full opacity-10 blur-[200px]"
          style={{ background: "radial-gradient(circle, rgba(255,31,31,0.3) 0%, transparent 65%)" }}
        />
      </div>

      {/* ── Subtle particles ─────────────────────────────────────── */}
      <Particles count={16} sizeRange={[1, 2]} drift={5} />

      {/* ── Two-column grid ──────────────────────────────────────── */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">

        {/* ── LEFT: copy ───────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

          {/* Agency label */}
          <motion.p
            {...fadeIn(0.1)}
            className="mb-7 text-[0.58rem] font-semibold uppercase tracking-[0.4em] text-[#FF1F1F] sm:text-[0.62rem]"
          >
            Creative Digital Agency
          </motion.p>

          {/* Brand name */}
          <motion.h1
            {...fadeUp(0.22)}
            className="mb-6 font-black uppercase leading-[0.9] tracking-[0.12em] text-white"
            style={{ fontSize: "clamp(3.2rem, 8vw, 7rem)" }}
          >
            TRENEX
          </motion.h1>

          {/* Service lines */}
          <motion.div
            {...fadeUp(0.36)}
            className="mb-7 flex flex-col gap-1"
          >
            {["Graphic Design", "Video Editing", "Web Development"].map((s, i) => (
              <div key={s} className="flex items-center gap-3 justify-center lg:justify-start">
                <span
                  className="inline-block h-px w-5 bg-[#FF1F1F]"
                  style={{ opacity: 1 - i * 0.2 }}
                />
                <span className="text-sm font-medium uppercase tracking-[0.22em] text-white/70 sm:text-[0.82rem]">
                  {s}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            {...fadeUp(0.48)}
            className="mb-10 max-w-sm text-[0.85rem] leading-relaxed text-white/38 sm:text-sm"
          >
            We help brands grow through design, content and modern web experiences.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            {...fadeUp(0.6)}
            className="flex flex-col items-center gap-3 sm:flex-row lg:items-start sm:gap-4"
          >
            <a
              href="#contact"
              data-testid="link-start-project"
              className="group inline-flex w-full min-w-[180px] items-center justify-center gap-2.5 bg-[#FF1F1F] px-8 py-3.5 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#050505] transition-all duration-300 hover:bg-[#e41c1c] hover:shadow-[0_0_40px_rgba(255,31,31,0.45)] sm:w-auto"
            >
              <span>Start a Project</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>

            <a
              href="#services"
              data-testid="link-view-services"
              className="group inline-flex w-full min-w-[180px] items-center justify-center gap-2.5 border border-white/15 px-8 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-white/80 transition-all duration-300 hover:border-[#FF1F1F]/50 hover:text-[#FF1F1F] hover:shadow-[0_0_20px_rgba(255,31,31,0.15)] sm:w-auto"
            >
              <span>View Services</span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT: Signature T ───────────────────────────────── */}
        <motion.div
          {...fadeIn(0.3)}
          className="flex items-center justify-center lg:justify-end"
        >
          {/* 3D-styled container */}
          <div
            className="logo-float-gentle relative flex items-center justify-center"
            style={{
              width: "clamp(280px, 42vw, 520px)",
              height: "clamp(280px, 42vw, 520px)",
              /* Subtle perspective tilt for depth feel */
              transform: "perspective(900px) rotateY(-6deg) rotateX(2deg)",
            }}
          >
            {/* Layered glow — gives the 3D "lit from left" effect */}
            <div
              className="absolute inset-[-10%] rounded-full opacity-55 blur-[80px]"
              style={{ background: "radial-gradient(ellipse at 40% 50%, rgba(255,31,31,0.55) 0%, transparent 65%)" }}
            />
            {/* Tighter bright core */}
            <div
              className="absolute inset-[20%] rounded-full opacity-40 blur-[40px]"
              style={{ background: "radial-gradient(circle, rgba(255,80,80,0.6) 0%, transparent 70%)" }}
            />

            {/* The T — SVG with premium drop-shadow stack */}
            <img
              src={signatureUrl}
              alt="Trenex"
              className="relative z-10 h-full w-full object-contain"
              style={{
                filter: [
                  "drop-shadow(0 0 12px rgba(255,31,31,0.9))",
                  "drop-shadow(0 0 40px rgba(255,31,31,0.5))",
                  "drop-shadow(0 4px 32px rgba(255,31,31,0.25))",
                  "drop-shadow(0 24px 60px rgba(0,0,0,0.6))",
                ].join(" "),
                imageRendering: "auto",
              }}
              loading="eager"
              decoding="async"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...fadeIn(1.05)}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 h-14 w-px bg-gradient-to-b from-white/20 to-transparent"
      />
    </section>
  );
}
