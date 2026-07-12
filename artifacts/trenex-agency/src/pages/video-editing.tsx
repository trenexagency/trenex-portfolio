import { useCallback, useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Play } from "lucide-react";
import { AmbientBackground } from "@/components/three/AmbientBackground";
import { GridBackground } from "@/components/GridBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CustomCursor } from "@/components/CustomCursor";
import { HeroBackground } from "@/components/HeroBackground";
import { VideoLightbox } from "@/components/VideoLightbox";
import { VIDEO_WORK_CATEGORIES, type VideoWorkItem } from "@/data/video-work";

/* ── Animation presets ────────────────────────────────── */
const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.78, ease: "easeOut" } },
};
const STAGGER: Variants = { show: { transition: { staggerChildren: 0.13 } } };

/* ══════════════════════════════════════════════════════
   VIDEO REEL GALLERY
   Pure video-showcase grid — thumbnail + play affordance.
   Clicking opens the fullscreen VideoLightbox player.
   To add work: edit src/data/video-work.ts only.
══════════════════════════════════════════════════════ */
function CategoryReels({
  title,
  items,
  offset,
  onVideoClick,
}: {
  title: string;
  items: VideoWorkItem[];
  offset: number;
  onVideoClick: (globalIndex: number) => void;
}) {
  return (
    <div className="mb-14 last:mb-0 sm:mb-16">
      {/* Category title + divider */}
      <div className="mb-6 flex items-center gap-4 sm:mb-7">
        <h3 className="whitespace-nowrap text-xl font-semibold uppercase tracking-tight text-white sm:text-2xl">
          {title}
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-[#eb1b24]/50 to-transparent" />
      </div>

      {/* Reel grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <motion.button
            key={item.youtubeId}
            type="button"
            onClick={() => onVideoClick(offset + i)}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
            className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-white/8 bg-[#0a0a0a] text-left transition-all duration-500 hover:border-[#eb1b24]/50 hover:shadow-[0_18px_48px_-16px_rgba(235,27,36,0.45)] focus:outline-none focus-visible:border-[#eb1b24]/60"
          >
            <img
              src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-[#050505]/10 to-transparent" />

            {/* Play affordance */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white opacity-90 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#eb1b24]/70 group-hover:bg-[#eb1b24]/20 group-hover:opacity-100">
                <Play className="h-5 w-5 fill-current" />
              </span>
            </div>

            {/* Title */}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-white/90">{item.title}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE — Video Editing
   Deliberately minimal: hero + video portfolio + contact.
   No about / process / testimonials / stats / pricing /
   timeline / team / blog / client logos / FAQ.
══════════════════════════════════════════════════════ */
export default function VideoEditingPage() {
  const allItems = useMemo(() => VIDEO_WORK_CATEGORIES.flatMap((c) => c.items), []);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + allItems.length) % allItems.length)),
    [allItems.length],
  );
  const showNext = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % allItems.length)),
    [allItems.length],
  );

  let offset = 0;

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
              Video Editing Portfolio
            </motion.p>

            <motion.p
              variants={FADE_UP}
              className="mt-5 font-mono text-[11px] uppercase tracking-[0.32em] text-white/40 sm:text-xs"
            >
              Commercial Editing • Motion Graphics • Color Grading
            </motion.p>
          </motion.div>
        </section>

        {/* ══ 2. VIDEO PORTFOLIO ═══════════════════════════════ */}
        <section id="featured-work" className="relative w-full overflow-hidden bg-[#050505]/75 px-5 py-16 sm:px-6 sm:py-20">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(235,27,36,0.065), transparent 70%)", filter: "blur(90px)" }}
          />

          <div className="relative z-10 mx-auto max-w-6xl">
            {VIDEO_WORK_CATEGORIES.map((category) => {
              const categoryOffset = offset;
              offset += category.items.length;
              return (
                <CategoryReels
                  key={category.id}
                  title={category.title}
                  items={category.items}
                  offset={categoryOffset}
                  onVideoClick={setLightboxIndex}
                />
              );
            })}
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
              Need Professional Video Editing?
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

      {lightboxIndex !== null && (
        <VideoLightbox
          items={allItems}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </div>
  );
}
