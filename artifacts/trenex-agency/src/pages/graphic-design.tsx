import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/three/AmbientBackground";
import { GridBackground } from "@/components/GridBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CustomCursor } from "@/components/CustomCursor";
import { SectionAmbience } from "@/components/SectionAmbience";
import { contactInfo } from "@/data/site";
import { Palette, Layers, BookOpen, Monitor, Printer, Package, ChevronDown } from "lucide-react";

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};
const STAGGER = { show: { transition: { staggerChildren: 0.12 } } };

/* ── Design Capabilities ───────────────────────────────── */
const CAPABILITIES = [
  {
    icon: <Palette className="h-6 w-6" strokeWidth={1.5} />,
    title: "Logo Design",
    desc: "Wordmarks, lettermarks, and icons built on strategic intent. Every concept grounded in your brand story.",
  },
  {
    icon: <Layers className="h-6 w-6" strokeWidth={1.5} />,
    title: "Brand Identity",
    desc: "Complete visual systems — color, typography, imagery, and tone — that express who you are with clarity.",
  },
  {
    icon: <BookOpen className="h-6 w-6" strokeWidth={1.5} />,
    title: "Brand Guidelines",
    desc: "The definitive rulebook ensuring your brand always looks premium, consistent, and recognizable anywhere.",
  },
  {
    icon: <Monitor className="h-6 w-6" strokeWidth={1.5} />,
    title: "Digital Design",
    desc: "Social media graphics, advertising creatives, and digital collateral built for engagement and conversion.",
  },
  {
    icon: <Printer className="h-6 w-6" strokeWidth={1.5} />,
    title: "Print Design",
    desc: "Business cards, brochures, and physical brand touchpoints crafted for lasting impression.",
  },
  {
    icon: <Package className="h-6 w-6" strokeWidth={1.5} />,
    title: "Visual Systems",
    desc: "Scalable marketing asset suites, templates, and branded collateral that grow with your business.",
  },
];

/* ── Process steps ─────────────────────────────────────── */
const PROCESS = [
  {
    num: "01",
    title: "Discovery",
    desc: "We audit your current brand, analyze competitors, study your audience, and define the strategic territory your brand needs to own.",
  },
  {
    num: "02",
    title: "Concept",
    desc: "Multiple creative directions are explored through mood boards, visual references, and initial design concepts.",
  },
  {
    num: "03",
    title: "Refinement",
    desc: "We iterate based on your feedback, refining every detail until the design perfectly expresses your brand vision.",
  },
  {
    num: "04",
    title: "Delivery",
    desc: "Final production files, brand guidelines, and a complete asset library — everything you need to launch with confidence.",
  },
];

/* ── Tools ──────────────────────────────────────────────── */
const TOOLS = [
  { name: "Photoshop", role: "Compositing & retouching" },
  { name: "Illustrator", role: "Vector art & scalable identity" },
  { name: "Figma", role: "UI/UX & collaborative systems" },
  { name: "InDesign", role: "Layout & print production" },
];

/* ── Showcase cards (CSS-art portfolio preview) ────────── */
const SHOWCASE = [
  {
    label: "Brand Identity",
    tag: "01",
    bg: "from-[#1a0002] to-[#050505]",
    accent: "TRX",
    sub: "Wordmark System",
  },
  {
    label: "Logo Design",
    tag: "02",
    bg: "from-[#0d0002] to-[#050505]",
    accent: "◈",
    sub: "Symbol Mark",
  },
  {
    label: "Brand Guidelines",
    tag: "03",
    bg: "from-[#120002] to-[#050505]",
    accent: "Aa",
    sub: "Typography System",
  },
  {
    label: "Visual System",
    tag: "04",
    bg: "from-[#0a0001] to-[#050505]",
    accent: "■ ▲ ●",
    sub: "Design Language",
  },
];

/* ── Page ───────────────────────────────────────────────── */
export default function GraphicDesignPage() {
  return (
    <div className="relative min-h-screen w-full">
      <AmbientBackground />
      <GridBackground />
      <CustomCursor />

      <div className="relative z-10">
        <Header />

        {/* ══ 1. HERO ═════════════════════════════════════════ */}
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505]/70 px-5 pb-20 pt-32 text-center sm:px-6">
          {/* Radial glow behind text */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(235,27,36,0.13), transparent 62%)",
            }}
          />

          <motion.div
            variants={STAGGER}
            initial="hidden"
            animate="show"
            className="relative mx-auto max-w-4xl"
          >
            {/* Breadcrumb */}
            <motion.div variants={FADE_UP} className="mb-8 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
              <a href="/" className="transition-colors hover:text-[#FF1F1F]">Home</a>
              <span>/</span>
              <a href="/#services" className="transition-colors hover:text-[#FF1F1F]">Services</a>
              <span>/</span>
              <span className="text-[#FF1F1F]">Graphic Design</span>
            </motion.div>

            <motion.span variants={FADE_UP} className="mb-5 inline-block font-mono text-xs uppercase tracking-[0.45em] text-[#FF1F1F]">
              Service — 01
            </motion.span>

            <motion.h1
              variants={FADE_UP}
              className="text-5xl font-semibold uppercase leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Design That
              <br />
              <span className="text-[#FF1F1F]">Defines.</span>
            </motion.h1>

            <motion.p
              variants={FADE_UP}
              className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-white/50 md:text-lg"
            >
              We build visual identities that position brands as category leaders.
              Strategic, premium, and built to be remembered.
            </motion.p>

            <motion.div variants={FADE_UP} className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 border border-[#FF1F1F]/60 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#FF1F1F] hover:shadow-[0_0_30px_rgba(255,31,31,0.35)]"
              >
                Start Your Project
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#process"
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white/70"
              >
                Our Process
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="h-5 w-5 animate-bounce text-white/20" />
          </motion.div>
        </section>

        {/* ══ 2. CAPABILITIES ══════════════════════════════════ */}
        <section className="relative w-full overflow-hidden bg-[#050505]/75 px-5 py-20 sm:px-6 sm:py-28 md:py-32">
          <SectionAmbience variant="services" />

          <div className="relative z-10 mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="mb-16 flex flex-col items-start gap-4 sm:mb-20"
            >
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#FF1F1F]">What We Create</span>
              <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                Design Capabilities
              </h2>
              <p className="max-w-lg text-sm leading-relaxed text-white/45 md:text-base">
                From the first sketch to the final brand guideline — every deliverable is crafted with intent, precision, and premium quality.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {CAPABILITIES.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 transition-all duration-500 hover:border-[#FF1F1F]/40 hover:shadow-[0_20px_60px_-16px_rgba(255,31,31,0.28)] sm:p-8"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                    style={{ background: "radial-gradient(circle, rgba(255,31,31,0.25), transparent 70%)" }}
                  />
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#FF1F1F] transition-all duration-500 group-hover:border-[#FF1F1F]/40 group-hover:bg-[#FF1F1F]/10 group-hover:shadow-[0_0_24px_rgba(255,31,31,0.35)]">
                    {cap.icon}
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-white">{cap.title}</h3>
                  <p className="text-sm leading-relaxed text-white/45 group-hover:text-white/60 transition-colors duration-300">{cap.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 3. PROCESS ════════════════════════════════════════ */}
        <section id="process" className="relative w-full overflow-hidden bg-[#050505]/75 px-5 py-20 sm:px-6 sm:py-28 md:py-32">
          <SectionAmbience variant="stats" />

          <div className="relative z-10 mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="mb-16 flex flex-col items-start gap-4 sm:mb-20"
            >
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#FF1F1F]">How We Work</span>
              <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                The Creative Process
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="group relative border-l border-white/8 p-8 first:border-l-0 sm:first:border-l sm:odd:border-l-0 lg:first:border-l-0 lg:border-l-white/8 lg:odd:border-l lg:first:border-l-0 hover:bg-white/[0.02] transition-colors duration-500"
                >
                  <div className="mb-6">
                    <span className="font-mono text-4xl font-light text-[#FF1F1F]/20 transition-colors duration-500 group-hover:text-[#FF1F1F]/40">
                      {step.num}
                    </span>
                  </div>
                  <div className="mb-4 h-px w-10 bg-[#FF1F1F]/40 transition-all duration-500 group-hover:w-16 group-hover:bg-[#FF1F1F]" />
                  <h3 className="mb-4 text-lg font-semibold uppercase tracking-[0.06em] text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/40 group-hover:text-white/60 transition-colors duration-300">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 4. TOOLS ══════════════════════════════════════════ */}
        <section className="relative w-full overflow-hidden bg-[#050505]/75 px-5 py-20 sm:px-6 sm:py-28">
          <SectionAmbience variant="expertise" />

          <div className="relative z-10 mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="mb-16 flex flex-col items-start gap-4"
            >
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#FF1F1F]">Our Arsenal</span>
              <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                Tools & Expertise
              </h2>
              <p className="max-w-lg text-sm leading-relaxed text-white/45 md:text-base">
                Industry-leading software wielded by specialists who have spent years mastering every tool in the creative stack.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {TOOLS.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group flex flex-col gap-4 rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 transition-all duration-500 hover:border-[#FF1F1F]/40 hover:shadow-[0_16px_50px_-12px_rgba(255,31,31,0.25)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-all duration-500 group-hover:border-[#FF1F1F]/40 group-hover:bg-[#FF1F1F]/8">
                    <span className="font-mono text-xs font-semibold text-[#FF1F1F]">
                      {tool.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-semibold text-white">{tool.name}</h3>
                    <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300">{tool.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 5. SHOWCASE ═══════════════════════════════════════ */}
        <section className="relative w-full overflow-hidden bg-[#050505]/75 px-5 py-20 sm:px-6 sm:py-28">
          <SectionAmbience variant="expertise" />

          <div className="relative z-10 mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="mb-16 flex flex-col items-start gap-4"
            >
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#FF1F1F]">Our Work</span>
              <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                Design That Speaks
              </h2>
              <p className="max-w-lg text-sm leading-relaxed text-white/45 md:text-base">
                A glimpse into the visual worlds we create. Every project is a new opportunity to push the creative boundary.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SHOWCASE.map((item, i) => (
                <motion.div
                  key={item.tag}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b ${item.bg} p-6 transition-all duration-500 hover:border-[#FF1F1F]/40 hover:shadow-[0_20px_60px_-16px_rgba(255,31,31,0.30)] sm:p-8`}
                  style={{ minHeight: "220px" }}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(235,27,36,0.09), transparent 70%)" }}
                  />

                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25 group-hover:text-[#FF1F1F]/60 transition-colors duration-500">
                        {item.tag}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF1F1F]/30">
                        Trenex
                      </span>
                    </div>

                    <div className="mt-8">
                      <div className="mb-3 font-mono text-3xl font-semibold text-white/20 transition-colors duration-500 group-hover:text-[#FF1F1F]/50 sm:text-4xl">
                        {item.accent}
                      </div>
                      <div className="h-px w-8 bg-[#FF1F1F]/30 transition-all duration-500 group-hover:w-14 group-hover:bg-[#FF1F1F]/60" />
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-white">
                        {item.label}
                      </h3>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 6. CTA ════════════════════════════════════════════ */}
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#050505]/75 px-5 py-24 text-center sm:px-6 sm:py-32">
          <SectionAmbience variant="contact" />

          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(235,27,36,0.12), transparent 62%)" }}
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={STAGGER}
            className="relative mx-auto max-w-2xl"
          >
            <motion.span variants={FADE_UP} className="font-mono text-xs uppercase tracking-[0.4em] text-[#FF1F1F]">
              Let's Create
            </motion.span>

            <motion.h2
              variants={FADE_UP}
              className="mt-6 text-3xl font-semibold uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Ready to Build
              <br />
              <span className="text-[#FF1F1F]">Something Iconic?</span>
            </motion.h2>

            <motion.p variants={FADE_UP} className="mt-6 text-sm leading-relaxed text-white/50 md:text-base">
              Tell us about your brand and let's design something that earns attention, builds trust, and stands the test of time.
            </motion.p>

            <motion.div variants={FADE_UP} className="mt-10">
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-[#FF1F1F]/60 px-10 py-4 font-mono text-xs uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-[#FF1F1F] hover:shadow-[0_0_40px_rgba(255,31,31,0.38)]"
              >
                Message Us on WhatsApp
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>

            <motion.p variants={FADE_UP} className="mt-8 font-mono text-[10px] uppercase tracking-[0.35em] text-white/20">
              Response within 24 hours · All project sizes welcome
            </motion.p>
          </motion.div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
}
