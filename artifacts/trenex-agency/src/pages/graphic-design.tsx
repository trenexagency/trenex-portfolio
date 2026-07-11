import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { AmbientBackground } from "@/components/three/AmbientBackground";
import { GridBackground } from "@/components/GridBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CustomCursor } from "@/components/CustomCursor";
import { SectionAmbience } from "@/components/SectionAmbience";
import { contactInfo } from "@/data/site";
import { PORTFOLIO_PROJECTS, PORTFOLIO_CATEGORIES, type PortfolioProject } from "@/data/portfolio";
import { X } from "lucide-react";

/* ── Animation presets ────────────────────────────────── */
const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.78, ease: "easeOut" } },
};
const STAGGER: Variants = { show: { transition: { staggerChildren: 0.13 } } };

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
  return (
    <div className="relative min-h-screen w-full">
      <AmbientBackground />
      <GridBackground />
      <CustomCursor />

      <div className="relative z-10">
        <Header />

        {/* ══ 1. HERO ═════════════════════════════════════════ */}
        <section className="relative flex h-[72vh] min-h-[560px] w-full flex-col items-center justify-center overflow-hidden bg-[#050505]/65 px-5 text-center sm:px-6">
          {/* Soft red gradient glow (static, no motion) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(235,27,36,0.16), transparent 68%)" }}
          />

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
              Graphic Design
            </motion.p>

            <motion.p
              variants={FADE_UP}
              className="mt-5 font-mono text-[11px] uppercase tracking-[0.32em] text-white/40 sm:text-xs"
            >
              Brand Identity • Social Media • Thumbnails • Posters
            </motion.p>

            <motion.p
              variants={FADE_UP}
              className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/50 md:text-base"
            >
              Professional graphic design solutions crafted to help brands create memorable visual identities.
            </motion.p>

            <motion.div variants={FADE_UP} className="mt-9">
              <a
                href="#featured-work"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("featured-work")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-3 border border-[#eb1b24]/60 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#eb1b24] hover:shadow-[0_0_32px_rgba(235,27,36,0.38)]"
              >
                Explore Work
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ══ 2. PORTFOLIO SHOWCASE ════════════════════════════ */}
        <section id="featured-work" className="relative w-full overflow-hidden bg-[#050505]/75 px-5 py-16 sm:px-6 sm:py-20">
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
              className="mb-10 flex flex-col items-start gap-3 sm:mb-12"
            >
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#eb1b24]">Featured Work</span>
              <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                Featured Design Work
              </h2>
            </motion.div>

            <FilteredPortfolio />
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
}
