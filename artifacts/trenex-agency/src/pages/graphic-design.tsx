import { motion, type Variants } from "framer-motion";
import { AmbientBackground } from "@/components/three/AmbientBackground";
import { GridBackground } from "@/components/GridBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CustomCursor } from "@/components/CustomCursor";
import { FloatingSoftwareBadges } from "@/components/FloatingSoftwareBadges";
import { HeroBackground } from "@/components/HeroBackground";
import { PORTFOLIO_CATEGORIES } from "@/data/portfolio";

/* ── Animation presets ────────────────────────────────── */
const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.78, ease: "easeOut" } },
};
const STAGGER: Variants = { show: { transition: { staggerChildren: 0.13 } } };

/* ══════════════════════════════════════════════════════
   PORTFOLIO SHOWCASE
   Four fixed categories, each a pure image gallery.
   To add work: edit src/data/portfolio.ts only.
══════════════════════════════════════════════════════ */
function CategoryGallery({ title, images }: { title: string; images: string[] }) {
  return (
    <div className="mb-14 last:mb-0 sm:mb-16">
      {/* Category title + divider */}
      <div className="mb-6 flex items-center gap-4 sm:mb-7">
        <h3 className="whitespace-nowrap text-xl font-semibold uppercase tracking-tight text-white sm:text-2xl">
          {title}
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-[#eb1b24]/50 to-transparent" />
      </div>

      {/* Image gallery */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {images.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
            className="group relative aspect-square overflow-hidden rounded-xl border border-white/8 bg-[#0a0a0a] transition-all duration-500 hover:border-[#eb1b24]/45 hover:shadow-[0_18px_48px_-16px_rgba(235,27,36,0.35)]"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/25 via-transparent to-transparent" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function GraphicDesignPage() {
  return (
    <div className="relative min-h-screen w-full">
      <AmbientBackground />
      <GridBackground />
      <CustomCursor />

      <div className="relative z-10">
        <Header />

        {/* ══ 1. HERO ═════════════════════════════════════════ */}
        <section className="relative flex h-[45vh] min-h-[380px] w-full flex-col items-center justify-center overflow-hidden bg-[#050505] px-5 text-center sm:px-6">
          <HeroBackground />

          <FloatingSoftwareBadges />

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
              Graphic Design Portfolio
            </motion.p>

            <motion.p
              variants={FADE_UP}
              className="mt-5 font-mono text-[11px] uppercase tracking-[0.32em] text-white/40 sm:text-xs"
            >
              Thumbnails • Social Media • Logos
            </motion.p>
          </motion.div>
        </section>

        {/* ══ 2. PORTFOLIO SHOWCASE ════════════════════════════ */}
        <section id="featured-work" className="relative w-full overflow-hidden bg-[#050505]/75 px-5 py-16 sm:px-6 sm:py-20">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(235,27,36,0.065), transparent 70%)", filter: "blur(90px)" }}
          />

          <div className="relative z-10 mx-auto max-w-6xl">
            {PORTFOLIO_CATEGORIES.map((category) => (
              <CategoryGallery key={category.id} title={category.title} images={category.images} />
            ))}

            {/* View More Work */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-4 flex justify-center"
            >
              <a
                href="https://www.behance.net/trenex"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[#eb1b24] px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:shadow-[0_0_35px_rgba(235,27,36,0.55)]"
              >
                <span>View More Work</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
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
              Need Professional Graphic Design?
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
