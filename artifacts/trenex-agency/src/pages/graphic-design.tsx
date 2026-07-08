import { useState, useEffect, useCallback, useRef, useMemo } from "react";
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
import { PORTFOLIO_PROJECTS, PORTFOLIO_CATEGORIES, type PortfolioProject } from "@/data/portfolio";
import { Palette, Layers, BookOpen, Monitor, Printer, Package, ChevronDown, X } from "lucide-react";

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

const ALL_FILTER = "All";

/* ══════════════════════════════════════════════════════
   PROJECT CARD
   Add a project to portfolio.ts → card appears automatically.
══════════════════════════════════════════════════════ */
function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: PortfolioProject;
  index: number;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr]       = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl"
    >
      {/* Thumbnail */}
      {!err && (
        <img
          src={project.thumbnail}
          alt={project.title}
          onLoad={() => setLoaded(true)}
          onError={() => setErr(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.08] group-hover:brightness-[1.08] ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {/* Fallback gradient while loading / on error */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#1a0002] to-[#060606] transition-opacity duration-500 ${loaded && !err ? "opacity-0" : "opacity-100"}`}
      />

      {/* Permanent vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/92 via-[#050505]/25 to-transparent" />

      {/* Hover red tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#eb1b24]/14 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/8 transition-all duration-500 group-hover:border-[#eb1b24]/50 group-hover:shadow-[0_20px_60px_-16px_rgba(235,27,36,0.35),inset_0_0_0_1px_rgba(235,27,36,0.18)]" />

      {/* Top shimmer */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#eb1b24]/0 to-transparent transition-all duration-500 group-hover:via-[#eb1b24]/65" />

      {/* Corner bloom */}
      <div
        className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle, rgba(235,27,36,0.35), transparent 65%)" }}
      />

      {/* Depth shadow on card lift */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: "0 32px 80px -20px rgba(235,27,36,0.30)" }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        {/* Badge */}
        <div className="flex items-center gap-2 self-start rounded-full border border-white/10 bg-[#050505]/60 px-3 py-1 backdrop-blur-sm transition-all duration-300 group-hover:border-[#eb1b24]/40 group-hover:bg-[#050505]/80">
          <div className="h-1.5 w-1.5 rounded-full bg-[#eb1b24] shadow-[0_0_5px_rgba(235,27,36,0.9)]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.38em] text-white/60 group-hover:text-white/85">
            {project.category}
          </span>
        </div>

        {/* Bottom info */}
        <div>
          <div className="mb-3 h-px w-0 bg-[#eb1b24] transition-all duration-500 group-hover:w-10" />
          <h3 className="text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
            {project.title}
          </h3>
          <p className="mt-1.5 max-w-[260px] translate-y-2 text-sm leading-relaxed text-white/0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-white/58">
            {project.description}
          </p>
          <div className="mt-3 flex translate-y-2 items-center gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#eb1b24]">View Details</span>
            <span className="text-[10px] text-[#eb1b24] transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECT MODAL
══════════════════════════════════════════════════════ */
function ProjectModal({ project, onClose }: { project: PortfolioProject; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#050505]/88 backdrop-blur-md" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_40px_100px_-20px_rgba(235,27,36,0.30)]"
      >
        {/* Top red shimmer */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#eb1b24]/60 to-transparent" />

        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
        </div>

        {/* Body */}
        <div className="p-7 sm:p-8">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#eb1b24] shadow-[0_0_6px_rgba(235,27,36,0.9)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#eb1b24]">
              {project.category}
            </span>
          </div>
          <h2 className="text-2xl font-semibold uppercase tracking-tight text-white sm:text-3xl">
            {project.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
            {project.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={contactInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#eb1b24]/60 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#eb1b24] hover:shadow-[0_0_28px_rgba(235,27,36,0.35)]"
            >
              Start a Similar Project <span>→</span>
            </a>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 border border-white/10 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-white/45 transition-all duration-300 hover:border-white/25 hover:text-white/70"
            >
              Close
            </button>
          </div>
        </div>

        {/* Close X */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#050505]/70 text-white/50 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   FILTERED PORTFOLIO GALLERY
   To add projects: edit src/data/portfolio.ts only.
══════════════════════════════════════════════════════ */
function FilteredPortfolio() {
  const [active, setActive]       = useState<string>(ALL_FILTER);
  const [selected, setSelected]   = useState<PortfolioProject | null>(null);

  const filters = [ALL_FILTER, ...PORTFOLIO_CATEGORIES];

  const filtered =
    active === ALL_FILTER
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === active);

  return (
    <>
      {/* ── Filter pills ── */}
      <div className="mb-10 flex flex-wrap items-center gap-2 sm:mb-12">
        {filters.map((f) => (
          <motion.button
            key={f}
            onClick={() => setActive(f)}
            whileTap={{ scale: 0.96 }}
            className={`relative rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-300 ${
              active === f
                ? "border-[#eb1b24]/70 bg-[#eb1b24]/12 text-white shadow-[0_0_18px_rgba(235,27,36,0.22)]"
                : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/65"
            }`}
          >
            {active === f && (
              <motion.div
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-[#eb1b24]/10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative">{f}</span>
          </motion.button>
        ))}
        <span className="ml-auto font-mono text-[10px] text-white/20">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        </span>
      </div>

      {/* ── Cards grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelected(project)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ══════════════════════════════════════════════════════
   CINEMATIC ENTRY SPLASH SCREEN
   Timeline:
     0.0s  — screen fades from black
     0.3s  — particles emerge
     0.5s  — energy ring traces itself
     1.0s  — logo rises from darkness
     1.5s  — logo scales 80%→100%
     2.0s  — outer glow blooms
     2.2s  — "GRAPHIC DESIGN / DESIGNS THAT BUILD BRANDS"
     2.8s  — red line sweeps in
     3.4s  — exit (onDone fires)
══════════════════════════════════════════════════════ */
function GDEntryScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3400);
    return () => clearTimeout(t);
  }, [onDone]);

  const particles = useMemo(() =>
    Array.from({ length: 48 }, (_, i) => ({
      id: i,
      x: (i * 41.3 + 7) % 100,
      y: (i * 67.7 + 19) % 100,
      size: 1 + (i % 3) * 0.8,
      dur:  2.6 + (i % 7) * 0.3,
      delay: 0.3 + (i / 48) * 1.5,
      opacity: 0.4 + (i % 4) * 0.15,
    })), []
  );

  const ringR1 = 148;
  const ringR2 = 136;
  const ringC1 = Math.PI * 2 * ringR1;
  const ringC2 = Math.PI * 2 * ringR2;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "brightness(1.6)" }}
      transition={{
        opacity:  { duration: 0.3, ease: "easeOut" },
        scale:    { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
        filter:   { duration: 0.6 },
      }}
    >

      {/* ── Ambient centre glow (appears at 2.0s) ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1.1 }}
        style={{ background: "radial-gradient(ellipse 58% 52% at 50% 48%, rgba(235,27,36,0.20), transparent 62%)" }}
      />

      {/* ── Logo outer halo bloom (2.0s) ── */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          width: 520, height: 520,
          background: "radial-gradient(circle, rgba(235,27,36,0.26), transparent 62%)",
          filter: "blur(72px)",
          left: "50%", top: "50%",
          x: "-50%", y: "-50%",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.7, 1], scale: [0.55, 1.12, 1] }}
        transition={{ delay: 2.0, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── Particles (0.3s) ── */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#eb1b24]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, p.opacity, p.opacity * 0.5, p.opacity, 0], y: [0, -22, -10, -28, 0] }}
          transition={{ delay: p.delay, duration: p.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ── Energy rings (SVG, 0.5s) ── */}
      <motion.div
        className="pointer-events-none absolute"
        style={{ width: 320, height: 320, left: "50%", top: "50%", x: "-50%", y: "-50%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0.6] }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <svg viewBox="0 0 320 320" className="h-full w-full" style={{ transform: "rotate(-90deg)" }}>
          {/* Main trace ring */}
          <motion.circle
            cx="160" cy="160" r={ringR1}
            fill="none" stroke="rgba(235,27,36,0.45)" strokeWidth="1.2"
            strokeDasharray={ringC1}
            initial={{ strokeDashoffset: ringC1 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ delay: 0.5, duration: 1.5, ease: [0.4, 0, 0.15, 1] }}
          />
          {/* Inner ghost ring */}
          <motion.circle
            cx="160" cy="160" r={ringR2}
            fill="none" stroke="rgba(235,27,36,0.18)" strokeWidth="0.6"
            strokeDasharray={ringC2}
            initial={{ strokeDashoffset: ringC2 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ delay: 0.8, duration: 1.8, ease: [0.4, 0, 0.15, 1] }}
          />
          {/* Four cardinal tick marks */}
          {[0, 90, 180, 270].map((a) => {
            const rad = (a * Math.PI) / 180;
            return (
              <motion.line
                key={a}
                x1={160 + (ringR2 - 4) * Math.cos(rad)}
                y1={160 + (ringR2 - 4) * Math.sin(rad)}
                x2={160 + (ringR1 + 8) * Math.cos(rad)}
                y2={160 + (ringR1 + 8) * Math.sin(rad)}
                stroke="rgba(235,27,36,0.80)"
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 + a / 900, duration: 0.25 }}
              />
            );
          })}
          {/* Spinning dashed outer orbit */}
          <motion.circle
            cx="160" cy="160" r="155"
            fill="none" stroke="rgba(235,27,36,0.10)" strokeWidth="0.75"
            strokeDasharray="10 7"
            style={{ transformOrigin: "160px 160px" }}
            animate={{ rotate: 360 }}
            transition={{ delay: 0.9, duration: 14, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.div>

      {/* ── Trenex logo (1.0s → 1.5s scale) ── */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          opacity: { delay: 1.0, duration: 0.6, ease: "easeOut" },
          scale:   { delay: 1.5, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          y:       { delay: 1.0, duration: 0.6, ease: "easeOut" },
        }}
      >
        {/* Logo glow layer */}
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ filter: "blur(28px)", background: "rgba(235,27,36,0.25)", borderRadius: "50%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.4] }}
          transition={{ delay: 2.0, duration: 0.9 }}
        />
        <img
          src="/trenex-logo.svg"
          alt="Trenex"
          draggable={false}
          className="w-40 select-none sm:w-52"
        />
      </motion.div>

      {/* ── Text block (2.2s) ── */}
      <motion.div
        className="relative z-10 mt-9 flex flex-col items-center gap-2.5 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          className="font-mono text-xs uppercase text-[#eb1b24]"
          style={{ letterSpacing: "0.55em" }}
        >
          Graphic Design
        </span>
        <p
          className="font-mono text-[10px] uppercase text-white/38"
          style={{ letterSpacing: "0.38em" }}
        >
          Designs That Build Brands
        </p>
      </motion.div>

      {/* ── Red sweep line (2.8s) ── */}
      <motion.div
        className="relative z-10 mt-6"
        style={{
          height: 1,
          background: "linear-gradient(to right, transparent, #eb1b24 40%, #eb1b24 60%, transparent)",
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 180, opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── Corner accent lines ── */}
      {[
        "top-8 left-8 border-t border-l",
        "top-8 right-8 border-t border-r",
        "bottom-8 left-8 border-b border-l",
        "bottom-8 right-8 border-b border-r",
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`pointer-events-none absolute h-10 w-10 border-[#eb1b24]/30 ${cls}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
        />
      ))}
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

        {/* ══ 5. PORTFOLIO SHOWCASE ════════════════════════════ */}
        <section className="relative w-full overflow-hidden bg-[#050505]/75 px-5 py-20 sm:px-6 sm:py-28 md:py-32">
          <SectionAmbience variant="expertise" />
          <AmbientDots count={14} />

          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(235,27,36,0.065), transparent 70%)", filter: "blur(90px)" }}
          />

          <div className="relative z-10 mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7 }}
              className="mb-12 flex flex-col items-start gap-4 sm:mb-14"
            >
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#eb1b24]">Featured Work</span>
              <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                Featured Design Work
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-white/45 md:text-base">
                Selected projects crafted to help brands stand out, engage audiences, and leave a lasting impression.
              </p>
            </motion.div>

            <FilteredPortfolio />
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
              Ready To Build
              <br />
              <span className="text-[#eb1b24]">Something Exceptional?</span>
            </motion.h2>

            <motion.p variants={FADE_UP} className="mt-6 text-sm leading-relaxed text-white/50 md:text-base">
              Tell us about your brand and let's design something that earns attention, builds trust, and stands the test of time.
            </motion.p>

            <motion.div variants={FADE_UP} className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-[#eb1b24]/60 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-[#eb1b24] hover:shadow-[0_0_40px_rgba(235,27,36,0.40)]"
              >
                Start Your Project
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="/#contact"
                className="group inline-flex items-center gap-3 border border-white/12 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.22em] text-white/55 transition-all duration-300 hover:border-white/28 hover:text-white/85"
              >
                Contact Trenex
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
