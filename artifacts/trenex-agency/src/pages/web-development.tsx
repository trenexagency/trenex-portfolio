import { motion, type Variants } from "framer-motion";
import { Code2, Smartphone, Gauge, Layers } from "lucide-react";
import { AmbientBackground } from "@/components/three/AmbientBackground";
import { GridBackground } from "@/components/GridBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CustomCursor } from "@/components/CustomCursor";
import { FloatingTechBadges } from "@/components/FloatingTechBadges";
import { HeroBackground } from "@/components/HeroBackground";
import { WebDevelopmentIntro } from "@/components/WebDevelopmentIntro";

/* ── Animation presets ────────────────────────────────── */
const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.78, ease: "easeOut" } },
};
const STAGGER: Variants = { show: { transition: { staggerChildren: 0.13 } } };

const CAPABILITIES = [
  {
    icon: Code2,
    title: "Custom Web Apps",
    description: "Hand-built, high-performance sites and web applications engineered around your product, not a template.",
  },
  {
    icon: Layers,
    title: "Modern UI Systems",
    description: "Clean, consistent component design with premium motion — every screen feels considered, not assembled.",
  },
  {
    icon: Smartphone,
    title: "Responsive Experiences",
    description: "Pixel-accurate across mobile, tablet, and desktop, so every visitor gets the full experience.",
  },
  {
    icon: Gauge,
    title: "Performance & SEO",
    description: "Fast load times and technical SEO foundations built in from day one, not bolted on after launch.",
  },
];

/* ══════════════════════════════════════════════════════
   PAGE — Web Development
   Opened in its own browser tab from the homepage service
   card (see ServiceCard.tsx). Deliberately minimal: hero +
   capability grid + contact CTA.
══════════════════════════════════════════════════════ */
export default function WebDevelopmentPage() {
  return (
    <div className="relative min-h-screen w-full">
      <WebDevelopmentIntro />

      <AmbientBackground />
      <GridBackground />
      <CustomCursor />

      <div className="relative z-10">
        <Header />

        {/* ══ 1. HERO ═════════════════════════════════════════ */}
        <section className="relative flex h-[45vh] min-h-[380px] w-full flex-col items-center justify-center overflow-hidden bg-[#050505] px-5 text-center sm:px-6">
          <HeroBackground />
          <FloatingTechBadges />

          <motion.div
            variants={STAGGER}
            initial="hidden"
            animate="show"
            className="relative z-10 mx-auto flex max-w-2xl flex-col items-center"
          >
            <motion.h1
              variants={FADE_UP}
              className="text-6xl font-semibold uppercase leading-none tracking-tight text-white sm:text-7xl md:text-8xl"
            >
              TRENEX
            </motion.h1>

            <motion.p
              variants={FADE_UP}
              className="mt-4 text-xl font-medium uppercase tracking-[0.15em] text-[#eb1b24] sm:text-2xl"
            >
              Web Development
            </motion.p>

            <motion.p
              variants={FADE_UP}
              className="mt-5 font-mono text-[11px] uppercase tracking-[0.32em] text-white/40 sm:text-xs"
            >
              Modern Websites • Web Apps • UI/UX • Responsive Development
            </motion.p>
          </motion.div>
        </section>

        {/* ══ 2. CAPABILITIES ══════════════════════════════════ */}
        <section id="capabilities" className="relative w-full overflow-hidden bg-[#050505]/75 px-5 py-16 sm:px-6 sm:py-20">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(235,27,36,0.065), transparent 70%)", filter: "blur(90px)" }}
          />

          <div className="relative z-10 mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-12 flex flex-col items-start gap-4 sm:mb-16"
            >
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#eb1b24]">What We Build</span>
              <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                Engineering For Growth
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {CAPABILITIES.map(({ icon: Icon, title, description }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 transition-colors duration-500 hover:border-[#eb1b24]/40 sm:p-8"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#eb1b24] transition-all duration-500 group-hover:scale-110 group-hover:border-[#eb1b24]/40 group-hover:bg-[#eb1b24]/10">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white sm:text-2xl">{title}</h3>
                  <p className="text-sm leading-relaxed text-white/55 md:text-base md:leading-[1.65]">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 3. CONTACT CTA ═══════════════════════════════════ */}
        <section className="relative w-full overflow-hidden bg-[#050505] px-5 py-20 text-center sm:px-6 sm:py-24">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(235,27,36,0.14), transparent 70%)", filter: "blur(70px)" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 mx-auto flex max-w-xl flex-col items-center"
          >
            <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
              Need A High-Performance Website?
            </h2>

            <a
              href="/#contact"
              className="group mt-9 inline-flex items-center gap-3 bg-[#eb1b24] px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:shadow-[0_0_35px_rgba(235,27,36,0.55)]"
            >
              <span>Start a Project</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
}
