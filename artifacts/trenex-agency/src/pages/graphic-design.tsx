import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { AmbientBackground } from "@/components/three/AmbientBackground";
import { GridBackground } from "@/components/GridBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CustomCursor } from "@/components/CustomCursor";
import { SectionAmbience } from "@/components/SectionAmbience";
import { Particles } from "@/components/Particles";
import { contactInfo } from "@/data/site";
import { Palette, Layers, BookOpen, Monitor, Printer, Package, ChevronDown } from "lucide-react";

/* ── Animation presets ────────────────────────────────── */
const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] } },
};
const STAGGER = { show: { transition: { staggerChildren: 0.13 } } };

/* ── Capabilities ──────────────────────────────────────── */
const CAPABILITIES = [
  { icon: <Palette className="h-6 w-6" strokeWidth={1.5} />, title: "Logo Design",      desc: "Wordmarks, lettermarks, and icons built on strategic intent. Every concept grounded in your brand story." },
  { icon: <Layers className="h-6 w-6"  strokeWidth={1.5} />, title: "Brand Identity",   desc: "Complete visual systems — color, typography, imagery, and tone — that express who you are with clarity." },
  { icon: <BookOpen className="h-6 w-6" strokeWidth={1.5} />, title: "Brand Guidelines", desc: "The definitive rulebook ensuring your brand always looks premium, consistent, and recognizable anywhere." },
  { icon: <Monitor className="h-6 w-6"  strokeWidth={1.5} />, title: "Digital Design",   desc: "Social media graphics, advertising creatives, and digital collateral built for engagement and conversion." },
  { icon: <Printer className="h-6 w-6"  strokeWidth={1.5} />, title: "Print Design",     desc: "Business cards, brochures, and physical brand touchpoints crafted for lasting impression." },
  { icon: <Package className="h-6 w-6"  strokeWidth={1.5} />, title: "Visual Systems",   desc: "Scalable marketing asset suites, templates, and branded collateral that grow with your business." },
];

/* ── Process ──────────────────────────────────────────── */
const PROCESS = [
  { num: "01", title: "Discovery",   desc: "We audit your current brand, analyze competitors, study your audience, and define the strategic territory your brand needs to own." },
  { num: "02", title: "Concept",     desc: "Multiple creative directions are explored through mood boards, visual references, and initial design concepts." },
  { num: "03", title: "Refinement",  desc: "We iterate based on your feedback, refining every detail until the design perfectly expresses your brand vision." },
  { num: "04", title: "Delivery",    desc: "Final production files, brand guidelines, and a complete asset library — everything you need to launch with confidence." },
];

/* ── Tools ────────────────────────────────────────────── */
const TOOLS = [
  { abbr: "Ps", name: "Photoshop",   role: "Pixel-perfect compositing & retouching",  shade: "from-[#1a0002]" },
  { abbr: "Ai", name: "Illustrator", role: "Vector art & scalable identity systems",   shade: "from-[#120001]" },
  { abbr: "Fg", name: "Figma",       role: "Collaborative UI/UX & design systems",     shade: "from-[#160002]" },
  { abbr: "Lr", name: "Lightroom",   role: "Photo editing & cinematic color grading",  shade: "from-[#0e0001]" },
  { abbr: "Id", name: "InDesign",    role: "Layout design & print production",         shade: "from-[#1a0002]" },
  { abbr: "XD", name: "Adobe XD",    role: "Prototyping & interactive design",         shade: "from-[#120001]" },
];

/* ── Showcase ─────────────────────────────────────────── */
const SHOWCASE = [
  { label: "Brand Identity",    tag: "01", bg: "from-[#1a0002] to-[#050505]", accent: "TRX",    sub: "Wordmark System"   },
  { label: "Logo Design",       tag: "02", bg: "from-[#0d0002] to-[#050505]", accent: "◈",      sub: "Symbol Mark"       },
  { label: "Brand Guidelines",  tag: "03", bg: "from-[#120002] to-[#050505]", accent: "Aa",     sub: "Typography System" },
  { label: "Visual System",     tag: "04", bg: "from-[#0a0001] to-[#050505]", accent: "■ ▲ ●", sub: "Design Language"   },
];

/* ══════════════════════════════════════════════════════
   ENTRY SPLASH SCREEN
══════════════════════════════════════════════════════ */
function GDEntryScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1700);
    return () => clearTimeout(t);
  }, [onDone]);

  /* Mini particle dots */
  const dots = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    dur: 2.5 + Math.random() * 3,
    delay: Math.random() * 2,
    size: 1 + Math.random() * 2,
  }));

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
    >
      {/* Ambient radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(235,27,36,0.18), transparent 65%)" }}
      />

      {/* Particles */}
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-[#eb1b24]"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size }}
          animate={{ opacity: [0, 0.6, 0], y: [0, -18, 0] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Content */}
      <motion.div
        className="relative flex flex-col items-center gap-5 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
      >
        {/* Trenex "T" mark */}
        <div className="relative mb-2 flex h-14 w-14 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(235,27,36,0.35), transparent 70%)", filter: "blur(12px)" }}
          />
          <span className="relative font-mono text-4xl font-bold text-[#eb1b24]">T</span>
        </div>

        <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-[#eb1b24]">
          Graphic Design
        </span>

        <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/35">
          Designs That Build Brands
        </p>

        {/* Animated red line */}
        <motion.div
          className="h-px bg-[#eb1b24]/60"
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   FLOATING GEOMETRY (hero background layer)
══════════════════════════════════════════════════════ */
function FloatingGeometry() {
  const shapes = [
    { type: "square",   size: 64,  x: "8%",  y: "18%", rot: 22,  dur: 8,  delay: 0,    opacity: 0.07 },
    { type: "circle",   size: 48,  x: "88%", y: "14%", rot: 0,   dur: 11, delay: 0.5,  opacity: 0.06 },
    { type: "triangle", size: 40,  x: "15%", y: "72%", rot: 15,  dur: 9,  delay: 1,    opacity: 0.08 },
    { type: "square",   size: 28,  x: "80%", y: "68%", rot: 45,  dur: 7,  delay: 0.8,  opacity: 0.10 },
    { type: "ring",     size: 90,  x: "5%",  y: "45%", rot: 0,   dur: 14, delay: 0,    opacity: 0.05 },
    { type: "ring",     size: 120, x: "82%", y: "42%", rot: 0,   dur: 18, delay: 1.2,  opacity: 0.04 },
    { type: "square",   size: 20,  x: "50%", y: "12%", rot: 12,  dur: 6,  delay: 0.4,  opacity: 0.09 },
    { type: "triangle", size: 30,  x: "70%", y: "82%", rot: 30,  dur: 10, delay: 1.5,  opacity: 0.07 },
    { type: "circle",   size: 16,  x: "35%", y: "88%", rot: 0,   dur: 7,  delay: 0.9,  opacity: 0.10 },
    { type: "ring",     size: 55,  x: "62%", y: "22%", rot: 0,   dur: 12, delay: 0.2,  opacity: 0.06 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: s.x, top: s.y, opacity: s.opacity }}
          animate={{ y: [0, -14, 0], rotate: [s.rot, s.rot + 8, s.rot] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {s.type === "square" && (
            <div
              className="border border-[#eb1b24]"
              style={{ width: s.size, height: s.size, borderRadius: 4 }}
            />
          )}
          {s.type === "circle" && (
            <div
              className="rounded-full bg-[#eb1b24]"
              style={{ width: s.size, height: s.size }}
            />
          )}
          {s.type === "triangle" && (
            <div
              style={{
                width: 0, height: 0,
                borderLeft: `${s.size / 2}px solid transparent`,
                borderRight: `${s.size / 2}px solid transparent`,
                borderBottom: `${s.size}px solid rgba(235,27,36,1)`,
              }}
            />
          )}
          {s.type === "ring" && (
            <div
              className="rounded-full border border-[#eb1b24]"
              style={{ width: s.size, height: s.size }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PREMIUM TOOL CARD
══════════════════════════════════════════════════════ */
function ToolCard({ tool, delay }: { tool: typeof TOOLS[0]; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX  = useMotionValue(0.5);
  const mouseY  = useMotionValue(0.5);
  const gX = useSpring(mouseX, { stiffness: 100, damping: 18 });
  const gY = useSpring(mouseY, { stiffness: 100, damping: 18 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top)  / r.height);
  }
  function onLeave() { mouseX.set(0.5); mouseY.set(0.5); }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <motion.div
        ref={cardRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        whileHover={{ scale: 1.025, y: -4 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b ${tool.shade} to-[#080808] p-7 backdrop-blur-sm transition-[border-color,box-shadow] duration-500 group-hover:border-[#eb1b24]/50 group-hover:shadow-[0_24px_70px_-14px_rgba(235,27,36,0.35)] sm:p-8`}
      >
        {/* Glassmorphism overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white/[0.018]" />

        {/* Mouse-tracking spotlight glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
          style={{
            background: `radial-gradient(280px circle at ${gX.get() * 100}% ${gY.get() * 100}%, rgba(235,27,36,0.17), transparent 60%)`,
          }}
        />

        {/* Bloom behind the monogram */}
        <div
          className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: "radial-gradient(circle, rgba(235,27,36,0.22), transparent 70%)", filter: "blur(28px)" }}
        />

        {/* Top shimmer line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#eb1b24]/0 to-transparent transition-all duration-600 group-hover:via-[#eb1b24]/55" />
        {/* Bottom shimmer line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/0 to-transparent transition-all duration-600 group-hover:via-white/[0.04]" />

        {/* Header row */}
        <div className="relative flex items-start justify-between">
          {/* Large monogram */}
          <span className="font-mono text-[3.25rem] font-bold leading-none tracking-tight text-[#eb1b24]/15 transition-colors duration-500 group-hover:text-[#eb1b24]/55 sm:text-[3.75rem]">
            {tool.abbr}
          </span>

          {/* Status dot */}
          <div className="mt-1.5 flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-[#eb1b24]/25 transition-all duration-500 group-hover:bg-[#eb1b24] group-hover:shadow-[0_0_8px_rgba(235,27,36,0.8)]" />
          </div>
        </div>

        {/* Info block */}
        <div className="relative mt-auto space-y-3">
          {/* Animated accent line */}
          <div className="h-px w-8 bg-[#eb1b24]/30 transition-all duration-500 group-hover:w-16 group-hover:bg-[#eb1b24]" />

          <div>
            <h3 className="text-lg font-semibold leading-tight tracking-tight text-white">{tool.name}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/38 transition-colors duration-300 group-hover:text-white/65">{tool.role}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   HERO PARALLAX LAYER
══════════════════════════════════════════════════════ */
function HeroParallaxGlow() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -80]);
  const y2 = useTransform(scrollY, [0, 600], [0, -40]);
  const op = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          y: y1, opacity: op,
          background: "radial-gradient(ellipse 75% 65% at 50% 42%, rgba(235,27,36,0.15), transparent 65%)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          y: y2, opacity: op,
          background: "radial-gradient(ellipse 45% 40% at 50% 35%, rgba(235,27,36,0.08), transparent 60%)",
        }}
      />
    </>
  );
}

/* ══════════════════════════════════════════════════════
   AMBIENT SECTION PARTICLES (CSS only, no canvas)
══════════════════════════════════════════════════════ */
function AmbientDots({ count = 16 }: { count?: number }) {
  const dots = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    y: 5 + Math.random() * 90,
    dur: 4 + Math.random() * 6,
    delay: Math.random() * 3,
    size: 1.5 + Math.random() * 2,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-[#eb1b24]"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size, opacity: 0 }}
          animate={{ opacity: [0, 0.45, 0], y: [0, -20, 0] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function GraphicDesignPage() {
  const [entered, setEntered] = useState(false);
  const done = useCallback(() => setEntered(true), []);

  return (
    <div className="relative min-h-screen w-full">
      <AmbientBackground />
      <GridBackground />
      <CustomCursor />

      {/* ── Entry splash ── */}
      <AnimatePresence>
        {!entered && <GDEntryScreen onDone={done} />}
      </AnimatePresence>

      {/* ── Main page (fades in after splash) ── */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Header />

        {/* ══ 1. HERO ═════════════════════════════════════════ */}
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505]/65 px-5 pb-20 pt-32 text-center sm:px-6">
          <HeroParallaxGlow />
          <FloatingGeometry />
          <AmbientDots count={14} />

          {/* Glassmorphism backdrop behind text */}
          <motion.div
            variants={STAGGER}
            initial="hidden"
            animate={entered ? "show" : "hidden"}
            className="relative mx-auto max-w-4xl"
          >
            {/* Glass card */}
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.015] px-8 py-14 backdrop-blur-sm sm:px-12">
              {/* Inner glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(235,27,36,0.07), transparent 65%)" }}
              />

              {/* Breadcrumb */}
              <motion.div variants={FADE_UP} className="mb-8 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
                <a href="/" className="transition-colors hover:text-[#eb1b24]">Home</a>
                <span>/</span>
                <a href="/#services" className="transition-colors hover:text-[#eb1b24]">Services</a>
                <span>/</span>
                <span className="text-[#eb1b24]">Graphic Design</span>
              </motion.div>

              <motion.span variants={FADE_UP} className="mb-5 inline-block font-mono text-xs uppercase tracking-[0.45em] text-[#eb1b24]">
                Service — 01
              </motion.span>

              <motion.h1
                variants={FADE_UP}
                className="text-5xl font-semibold uppercase leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
              >
                Design That
                <br />
                <span className="text-[#eb1b24]">Defines.</span>
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
                  className="group flex items-center gap-3 border border-[#eb1b24]/60 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#eb1b24] hover:shadow-[0_0_32px_rgba(235,27,36,0.38)]"
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
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: entered ? 1 : 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="h-5 w-5 animate-bounce text-white/20" />
          </motion.div>
        </section>

        {/* ══ 2. CAPABILITIES ══════════════════════════════════ */}
        <section className="relative w-full overflow-hidden bg-[#050505]/75 px-5 py-20 sm:px-6 sm:py-28 md:py-32">
          <SectionAmbience variant="services" />
          <AmbientDots count={10} />

          <div className="relative z-10 mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="mb-16 flex flex-col items-start gap-4 sm:mb-20"
            >
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#eb1b24]">What We Create</span>
              <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">Design Capabilities</h2>
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
                  className="group relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 transition-all duration-500 hover:border-[#eb1b24]/40 hover:shadow-[0_20px_60px_-16px_rgba(235,27,36,0.28)] sm:p-8"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                    style={{ background: "radial-gradient(circle, rgba(235,27,36,0.25), transparent 70%)" }}
                  />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#eb1b24]/0 to-transparent transition-all duration-500 group-hover:via-[#eb1b24]/40" />
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#eb1b24] transition-all duration-500 group-hover:border-[#eb1b24]/40 group-hover:bg-[#eb1b24]/10 group-hover:shadow-[0_0_24px_rgba(235,27,36,0.35)]">
                    {cap.icon}
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-white">{cap.title}</h3>
                  <p className="text-sm leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/65">{cap.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 3. PROCESS ════════════════════════════════════════ */}
        <section id="process" className="relative w-full overflow-hidden bg-[#050505]/75 px-5 py-20 sm:px-6 sm:py-28 md:py-32">
          <SectionAmbience variant="stats" />
          <AmbientDots count={8} />

          <div className="relative z-10 mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="mb-16 flex flex-col items-start gap-4 sm:mb-20"
            >
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#eb1b24]">How We Work</span>
              <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">The Creative Process</h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="group relative border-l border-white/8 p-8 transition-colors duration-500 hover:bg-white/[0.02] first:border-l-0 lg:first:border-l-0"
                >
                  <div className="mb-6">
                    <span className="font-mono text-4xl font-light text-[#eb1b24]/20 transition-colors duration-500 group-hover:text-[#eb1b24]/45">
                      {step.num}
                    </span>
                  </div>
                  <div className="mb-4 h-px w-10 bg-[#eb1b24]/40 transition-all duration-500 group-hover:w-16 group-hover:bg-[#eb1b24]" />
                  <h3 className="mb-4 text-lg font-semibold uppercase tracking-[0.06em] text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-white/40 transition-colors duration-300 group-hover:text-white/62">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 4. TOOLS ══════════════════════════════════════════ */}
        <section className="relative w-full overflow-hidden bg-[#050505]/75 px-5 py-20 sm:px-6 sm:py-28">
          <SectionAmbience variant="expertise" />
          <AmbientDots count={12} />

          {/* Extra red pool behind grid */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(235,27,36,0.07), transparent 70%)", filter: "blur(60px)" }}
          />

          <div className="relative z-10 mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="mb-16 flex flex-col items-start gap-4"
            >
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#eb1b24]">Our Arsenal</span>
              <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">Tools & Expertise</h2>
              <p className="max-w-lg text-sm leading-relaxed text-white/45 md:text-base">
                Industry-leading software wielded by specialists who have mastered every tool in the creative stack.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {TOOLS.map((tool, i) => (
                <ToolCard key={tool.name} tool={tool} delay={i * 0.09} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ 5. SHOWCASE ═══════════════════════════════════════ */}
        <section className="relative w-full overflow-hidden bg-[#050505]/75 px-5 py-20 sm:px-6 sm:py-28">
          <SectionAmbience variant="expertise" />
          <AmbientDots count={10} />

          <div className="relative z-10 mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="mb-16 flex flex-col items-start gap-4"
            >
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#eb1b24]">Our Work</span>
              <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">Design That Speaks</h2>
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
                  className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b ${item.bg} p-6 transition-all duration-500 hover:border-[#eb1b24]/45 hover:shadow-[0_20px_60px_-16px_rgba(235,27,36,0.30)] sm:p-8`}
                  style={{ minHeight: "220px" }}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(235,27,36,0.10), transparent 70%)" }}
                  />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#eb1b24]/0 to-transparent transition-all duration-500 group-hover:via-[#eb1b24]/45" />

                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25 transition-colors duration-500 group-hover:text-[#eb1b24]/60">{item.tag}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#eb1b24]/30">Trenex</span>
                    </div>
                    <div className="mt-8">
                      <div className="mb-3 font-mono text-3xl font-semibold text-white/20 transition-colors duration-500 group-hover:text-[#eb1b24]/50 sm:text-4xl">{item.accent}</div>
                      <div className="h-px w-8 bg-[#eb1b24]/30 transition-all duration-500 group-hover:w-14 group-hover:bg-[#eb1b24]/65" />
                    </div>
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-white">{item.label}</h3>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">{item.sub}</p>
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
          <AmbientDots count={18} />
          <Particles count={22} />

          <div className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(235,27,36,0.13), transparent 62%)" }}
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={STAGGER}
            className="relative mx-auto max-w-2xl"
          >
            <motion.span variants={FADE_UP} className="font-mono text-xs uppercase tracking-[0.4em] text-[#eb1b24]">Let's Create</motion.span>

            <motion.h2 variants={FADE_UP} className="mt-6 text-3xl font-semibold uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Ready to Build
              <br />
              <span className="text-[#eb1b24]">Something Iconic?</span>
            </motion.h2>

            <motion.p variants={FADE_UP} className="mt-6 text-sm leading-relaxed text-white/50 md:text-base">
              Tell us about your brand and let's design something that earns attention, builds trust, and stands the test of time.
            </motion.p>

            <motion.div variants={FADE_UP} className="mt-10">
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-[#eb1b24]/60 px-10 py-4 font-mono text-xs uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-[#eb1b24] hover:shadow-[0_0_40px_rgba(235,27,36,0.40)]"
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
      </motion.div>
    </div>
  );
}
