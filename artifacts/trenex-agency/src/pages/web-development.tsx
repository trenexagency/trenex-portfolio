import { motion, type Variants } from "framer-motion";
import { AmbientBackground } from "@/components/three/AmbientBackground";
import { GridBackground } from "@/components/GridBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CustomCursor } from "@/components/CustomCursor";
import { FloatingTechBadges } from "@/components/FloatingTechBadges";
import { HeroBackground } from "@/components/HeroBackground";
import { WebDevelopmentIntro } from "@/components/WebDevelopmentIntro";
import { TechShowcase } from "@/components/sections/TechShowcase";
import { WebProjectsPortfolio } from "@/components/sections/WebProjectsPortfolio";

/* ── Animation presets ────────────────────────────────── */
const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.78, ease: "easeOut" } },
};
const STAGGER: Variants = { show: { transition: { staggerChildren: 0.13 } } };

const DEVELOPMENT_SERVICES = [
  {
    title: "Web Development",
    description:
      "We build modern, responsive websites that match your brand and help your business grow",
  },
  {
    title: "Application Development",
    description:
      "We create user-friendly mobile and web apps designed around your business needs.",
  },
  {
    title: "Software Development",
    description:
      "We develop custom software to simplify your work and solve your business challenges.",
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
        <section id="hero" className="relative flex h-[45vh] min-h-[380px] w-full scroll-mt-24 flex-col items-center justify-center overflow-hidden bg-[#050505] px-5 text-center sm:scroll-mt-28 sm:px-6">
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

        {/* ══ 2. TECH SHOWCASE ═════════════════════════════════ */}
        <TechShowcase />

        {/* ══ DEVELOPMENT SERVICES ════════════════════════════ */}
        <section
          id="services"
          aria-label="Development services"
          className="relative w-full bg-[#050505] px-5 py-14 sm:px-6 sm:py-16 md:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {DEVELOPMENT_SERVICES.map(({ title, description }) => (
                <article key={title} className="flex flex-col items-start">
                  <span aria-hidden="true" className="mb-5 h-px w-10 bg-[#eb1b24]/75" />
                  <h2 className="mb-3 text-xl font-semibold text-white sm:text-2xl">
                    {title}
                  </h2>
                  <p className="max-w-sm text-sm leading-relaxed text-white/55 md:text-base md:leading-[1.65]">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <WebProjectsPortfolio />

        {/* ══ 4. CONTACT CTA ═══════════════════════════════════ */}
        <section id="contact" className="relative w-full scroll-mt-24 overflow-hidden bg-[#050505] px-5 py-20 text-center sm:scroll-mt-28 sm:px-6 sm:py-24">
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
              href="https://wa.me/923323848135?text=Hi%20Trenex%20Agency,%20I%20visited%20your%20Web%20Development%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-cta-whatsapp"
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
