import { motion } from "framer-motion";
import { Particles } from "@/components/Particles";
import logoUrl from "@assets/Trenex_Logo_2-01_1784485748872.svg";

/* ─── Animation helpers ────────────────────────────────────────── */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.1, delay, ease: "easeOut" as const },
});

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-5 py-28 text-center sm:px-8 sm:py-32"
    >
      {/* ── Ambient red glow behind logo ─────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full opacity-25 blur-[130px]"
          style={{ background: "radial-gradient(circle, rgba(255,31,31,0.4) 0%, transparent 70%)" }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[1100px] w-[1100px] rounded-full opacity-10 blur-[180px]"
          style={{ background: "radial-gradient(circle, rgba(255,31,31,0.25) 0%, transparent 65%)" }}
        />
      </div>

      {/* ── Reduced particles ────────────────────────────────────── */}
      <Particles count={18} sizeRange={[1, 2]} drift={6} />

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Service label */}
        <motion.p
          {...fadeIn(0.1)}
          className="mb-12 text-[0.58rem] font-semibold uppercase tracking-[0.38em] text-[#FF1F1F] sm:text-[0.62rem]"
        >
          Design&nbsp;&nbsp;•&nbsp;&nbsp;Editing&nbsp;&nbsp;•&nbsp;&nbsp;Development
        </motion.p>

        {/* ── Hero logo — main focal point ──────────────────────── */}
        <motion.div {...fadeIn(0.25)} className="mb-10 flex items-center justify-center">
          <div
            className="logo-float-gentle relative flex items-center justify-center"
            style={{
              width: "clamp(280px, 48vw, 560px)",
              height: "clamp(280px, 48vw, 560px)",
            }}
          >
            {/* Soft glow bloom */}
            <div
              className="absolute inset-[-15%] rounded-full opacity-50 blur-[70px]"
              style={{ background: "radial-gradient(circle, rgba(255,31,31,0.5) 0%, transparent 65%)" }}
            />
            <img
              src={logoUrl}
              alt="Trenex Agency"
              className="relative z-10 h-full w-full object-contain"
              style={{
                filter:
                  "drop-shadow(0 0 20px rgba(255,31,31,0.65)) drop-shadow(0 0 60px rgba(255,31,31,0.25))",
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
          className="mb-5 font-black uppercase leading-none tracking-[0.2em] text-white"
          style={{ fontSize: "clamp(1.9rem, 5.5vw, 4rem)" }}
        >
          TRENEX
        </motion.h1>

        {/* Tagline */}
        <motion.p
          {...fadeUp(0.58)}
          className="mb-4 font-light text-white/85"
          style={{ fontSize: "clamp(0.95rem, 1.9vw, 1.2rem)", lineHeight: 1.5 }}
        >
          Building Brands That People Remember.
        </motion.p>

        {/* Description */}
        <motion.p
          {...fadeUp(0.7)}
          className="mb-11 max-w-sm text-sm leading-relaxed text-white/40 sm:max-w-md sm:text-[0.88rem]"
        >
          Graphic Design, Video Editing and Web Development
          <br className="hidden sm:block" />
          crafted to help businesses grow online.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(0.82)}
          className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#contact"
            data-testid="link-start-project"
            className="group inline-flex w-full min-w-[180px] items-center justify-center gap-2.5 bg-[#FF1F1F] px-8 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#050505] transition-all duration-300 hover:bg-[#e41c1c] hover:shadow-[0_0_40px_rgba(255,31,31,0.5)] sm:w-auto"
          >
            <span>Start a Project</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>

          <a
            href="#services"
            data-testid="link-view-services"
            className="group inline-flex w-full min-w-[180px] items-center justify-center gap-2.5 border border-white/18 px-8 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-[#FF1F1F]/50 hover:text-[#FF1F1F] hover:shadow-[0_0_20px_rgba(255,31,31,0.18)] sm:w-auto"
          >
            <span>View Services</span>
            <span className="transition-transform duration-300 group-hover:translate-y-0.5">&darr;</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll line */}
      <motion.div
        {...fadeIn(1.1)}
        className="absolute bottom-10 h-14 w-px bg-gradient-to-b from-white/25 to-transparent"
      />
    </section>
  );
}
