import { motion } from "framer-motion";
import { Particles } from "@/components/Particles";
import logoUrl from "@assets/Trenex_Logo_1784485069340.svg";

/* ─── Fade-in variants ─────────────────────────────────────────── */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as const },
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
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-5 py-28 text-center sm:px-8 sm:py-32"
    >
      {/* ── Background: ambient red glow ─────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* Primary soft ambient behind hero content */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(255,31,31,0.35) 0%, transparent 70%)" }}
        />
        {/* Secondary wider ambient */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[900px] rounded-full opacity-15 blur-[160px]"
          style={{ background: "radial-gradient(circle, rgba(255,31,31,0.2) 0%, transparent 65%)" }}
        />
      </div>

      {/* ── Reduced-intensity particles (50%) ────────────────────── */}
      <Particles count={20} sizeRange={[1, 2.5]} drift={8} />

      {/* ── Content stack ────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center gap-0">

        {/* Top label */}
        <motion.p
          {...fadeIn(0.1)}
          className="mb-10 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-[#FF1F1F] sm:text-[0.65rem]"
        >
          Design&nbsp;&bull;&nbsp;Video Editing&nbsp;&bull;&nbsp;Web Development
        </motion.p>

        {/* ── Logo ─────────────────────────────────────────────────── */}
        <motion.div
          {...fadeIn(0.3)}
          className="mb-10 flex items-center justify-center"
        >
          {/* Floating wrapper — pure CSS, no JS per-frame cost */}
          <div
            className="logo-float relative flex items-center justify-center"
            style={{ width: "clamp(140px, 22vw, 240px)", height: "clamp(140px, 22vw, 240px)" }}
          >
            {/* Soft glow ring behind logo */}
            <div
              className="absolute inset-0 rounded-full opacity-60 blur-[50px]"
              style={{ background: "radial-gradient(circle, rgba(255,31,31,0.45) 0%, transparent 70%)" }}
            />
            <img
              src={logoUrl}
              alt="Trenex Agency"
              className="relative z-10 h-full w-full object-contain"
              style={{
                filter:
                  "drop-shadow(0 0 18px rgba(255,31,31,0.7)) drop-shadow(0 0 50px rgba(255,31,31,0.3))",
                imageRendering: "auto",
              }}
              loading="eager"
              decoding="async"
            />
          </div>
        </motion.div>

        {/* Brand name */}
        <motion.h1
          {...fadeUp(0.45)}
          className="mb-4 font-black uppercase leading-none tracking-[0.18em] text-white"
          style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)", letterSpacing: "0.18em" }}
        >
          TRENEX
        </motion.h1>

        {/* Primary tagline */}
        <motion.p
          {...fadeUp(0.6)}
          className="mb-5 max-w-xl font-light text-white/90"
          style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.35rem)", lineHeight: 1.45 }}
        >
          Building Brands That People Remember.
        </motion.p>

        {/* Description */}
        <motion.p
          {...fadeUp(0.72)}
          className="mb-10 max-w-md text-sm font-normal leading-relaxed text-white/45 sm:text-[0.9rem]"
        >
          Graphic Design, Video Editing and Web Development
          <br className="hidden sm:block" /> crafted to help businesses grow online.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(0.85)}
          className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#contact"
            data-testid="link-start-project"
            className="group inline-flex w-full items-center justify-center gap-2.5 bg-[#FF1F1F] px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#050505] transition-all duration-300 hover:bg-[#e61a1a] hover:shadow-[0_0_40px_rgba(255,31,31,0.55)] sm:w-auto"
          >
            <span>Start a Project</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>

          <a
            href="#services"
            data-testid="link-view-services"
            className="group inline-flex w-full items-center justify-center gap-2.5 border border-white/20 px-9 py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-[#FF1F1F]/60 hover:text-[#FF1F1F] hover:shadow-[0_0_24px_rgba(255,31,31,0.2)] sm:w-auto"
          >
            <span>View Services</span>
            <span className="transition-transform duration-300 group-hover:translate-y-0.5">&darr;</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...fadeIn(1.1)}
        className="absolute bottom-10 h-14 w-px bg-gradient-to-b from-white/30 to-transparent"
      />
    </section>
  );
}
