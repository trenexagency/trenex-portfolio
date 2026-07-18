import { memo, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { AmbientBackground } from "@/components/three/AmbientBackground";
import { GridBackground } from "@/components/GridBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CustomCursor } from "@/components/CustomCursor";
import { HeroBackground } from "@/components/HeroBackground";
import { FloatingVideoSoftwareBadges } from "@/components/FloatingVideoSoftwareBadges";
import { VideoEditingIntro } from "@/components/VideoEditingIntro";
import { YOUTUBE_SHORTS, type YouTubeShort } from "@/data/video-work";
import { motion as m, type Variants } from "framer-motion";

/* ── Animation presets ────────────────────────────────── */
const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.78, ease: "easeOut" } },
};
const STAGGER: Variants = { show: { transition: { staggerChildren: 0.13 } } };

/* ─────────────────────────────────────────────────────────
   YouTube thumbnail helpers
   Primary:  maxresdefault.jpg  (portrait for Shorts, may 404)
   Fallback: hqdefault.jpg      (always exists, 4:3 — cropped)
───────────────────────────────────────────────────────── */
function thumbUrl(id: string, quality: "maxresdefault" | "hqdefault") {
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`;
}

/* ══════════════════════════════════════════════════════
   SHORT CARD
   Portrait 9:16 card — styled like a phone screen.
   • Lazy-loaded thumbnail via native loading="lazy"
   • onError → swap to hqdefault fallback → if that also
     fails, show a dark branded placeholder
   • Click → open Short in new tab (no lightbox)
   • Hover → scale + red glow only, no heavy animation
══════════════════════════════════════════════════════ */
const ShortCard = memo(function ShortCard({
  short,
  index,
}: {
  short: YouTubeShort;
  index: number;
}) {
  // Custom thumb provided → use it directly (no YT CDN fallback chain needed)
  const hasCustom = Boolean(short.customThumb);

  // 0 = try maxres (or custom), 1 = try hqdefault, 2 = show placeholder
  const [imgState, setImgState] = useState<0 | 1 | 2>(0);

  const handleError = useCallback(() => {
    if (hasCustom) {
      // Custom image failed → show placeholder
      setImgState(2);
    } else {
      setImgState((s) => (s < 2 ? ((s + 1) as 1 | 2) : 2));
    }
  }, [hasCustom]);

  const src =
    imgState === 2 ? null
    : hasCustom     ? short.customThumb!
    : imgState === 0 ? thumbUrl(short.id, "maxresdefault")
    : thumbUrl(short.id, "hqdefault");

  return (
    <motion.a
      href={short.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch YouTube Short ${index + 1}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.06, ease: "easeOut" }}
      className="group relative block aspect-[9/16] cursor-pointer overflow-hidden rounded-2xl border border-white/8 bg-[#0a0a0a] transition-all duration-500 hover:border-[#eb1b24]/50 hover:shadow-[0_20px_55px_-16px_rgba(235,27,36,0.5)] focus:outline-none focus-visible:border-[#eb1b24]/60"
    >
      {/* Thumbnail */}
      {src ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          onError={handleError}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
          /* Prevent layout shift — card has explicit aspect ratio */
          style={{ display: "block" }}
        />
      ) : (
        /* Branded placeholder shown only if both CDN URLs fail */
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#0f0f0f] to-[#050505]">
          {/* YouTube "shorts" icon outline */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-10 w-10 text-[#eb1b24]/60"
            aria-hidden
          >
            <path
              d="M10 15l5.19-3L10 9v6zm11.56-7.83c.21.77.35 1.8.44 3.07L22 12l-.01 1.76c-.09 1.27-.23 2.3-.43 3.07-.39 1.42-1.55 2.55-3.01 2.93-.82.21-2.3.35-4.55.43L12 20l-1.99-.01c-2.24-.08-3.72-.22-4.54-.43-1.46-.38-2.62-1.51-3.01-2.93-.21-.77-.35-1.8-.44-3.07L2 12l.01-1.76c.09-1.27.23-2.3.43-3.07.39-1.42 1.55-2.55 3.01-2.93.82-.21 2.3-.35 4.55-.43L12 4l1.99.01c2.24.08 3.72.22 4.54.43 1.46.38 2.62 1.51 3.03 2.73z"
              fill="currentColor"
            />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
            Short #{index + 1}
          </span>
        </div>
      )}

      {/* Gradient scrim — bottom fade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent" />

      {/* Red glow wash on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#eb1b24]/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-[#eb1b24]/20" />

      {/* Play button — center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-13 w-13 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-80 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#eb1b24]/70 group-hover:bg-[#eb1b24]/20 group-hover:opacity-100 sm:h-14 sm:w-14">
          <Play className="h-4 w-4 fill-current sm:h-5 sm:w-5" style={{ marginLeft: "2px" }} />
        </span>
      </div>

      {/* "Shorts" badge — top-right corner */}
      <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-[#eb1b24] px-2 py-0.5">
        {/* Shorts lightning bolt */}
        <svg viewBox="0 0 10 14" fill="currentColor" className="h-2.5 w-2 text-white" aria-hidden>
          <path d="M6 0L0 8h4l-1 6 7-9H6z" />
        </svg>
        <span className="font-mono text-[9px] font-bold uppercase leading-none tracking-widest text-white">
          Shorts
        </span>
      </div>
    </motion.a>
  );
});

/* ══════════════════════════════════════════════════════
   SHORTS GRID
   Responsive portrait grid — 2 cols mobile, 3 tablet,
   4 desktop, 5 wide. Matches the quality of the Graphic
   Design and Web Dev gallery sections.
══════════════════════════════════════════════════════ */
function ShortsGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {YOUTUBE_SHORTS.map((short, i) => (
        <ShortCard key={short.id} short={short} index={i} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE — Video Editing
══════════════════════════════════════════════════════ */
export default function VideoEditingPage() {
  return (
    <div className="relative min-h-screen w-full">
      <VideoEditingIntro />

      <AmbientBackground />
      <GridBackground />
      <CustomCursor />

      <div className="relative z-10">
        <Header />

        {/* ══ 1. HERO ═════════════════════════════════════════ */}
        <section
          id="hero"
          className="relative flex h-[45vh] min-h-[380px] w-full scroll-mt-24 flex-col items-center justify-center overflow-hidden bg-[#050505] px-5 text-center sm:scroll-mt-28 sm:px-6"
        >
          <HeroBackground />
          <FloatingVideoSoftwareBadges />

          <m.div
            variants={STAGGER}
            initial="hidden"
            animate="show"
            className="relative z-10 mx-auto flex max-w-2xl flex-col items-center"
          >
            <m.h1
              variants={FADE_UP}
              className="text-6xl font-semibold uppercase leading-none tracking-tight text-white sm:text-7xl md:text-8xl"
            >
              TRENEX
            </m.h1>

            <m.p
              variants={FADE_UP}
              className="mt-4 text-xl font-medium uppercase tracking-[0.15em] text-[#eb1b24] sm:text-2xl"
            >
              Video Editing Portfolio
            </m.p>

            <m.p
              variants={FADE_UP}
              className="mt-5 font-mono text-[11px] uppercase tracking-[0.32em] text-white/40 sm:text-xs"
            >
              Commercial Editing • Motion Graphics • Color Grading
            </m.p>
          </m.div>
        </section>

        {/* ══ 2. YOUTUBE SHORTS GALLERY ════════════════════════ */}
        <section
          id="portfolio"
          className="relative w-full scroll-mt-24 overflow-hidden bg-[#050505]/75 px-5 py-16 sm:scroll-mt-28 sm:px-6 sm:py-20"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(235,27,36,0.065), transparent 70%)",
              filter: "blur(90px)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-6xl">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-10 flex flex-col items-start gap-3 sm:mb-12"
            >
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#eb1b24]">
                Real Client Work
              </span>
              <div className="flex w-full items-center gap-4">
                <h2 className="whitespace-nowrap text-2xl font-semibold uppercase tracking-tight text-white sm:text-3xl md:text-4xl">
                  YouTube Shorts
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-[#eb1b24]/50 to-transparent" />
              </div>
              <p className="max-w-xl text-sm text-white/50 sm:text-base">
                Click any Short to watch on YouTube. Tap to play on mobile.
              </p>
            </motion.div>

            <ShortsGrid />
          </div>
        </section>

        {/* ══ 3. CONTACT CTA ═══════════════════════════════════ */}
        <section
          id="contact"
          className="relative w-full scroll-mt-24 overflow-hidden bg-[#050505] px-5 py-20 text-center sm:scroll-mt-28 sm:px-6 sm:py-24"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(235,27,36,0.14), transparent 70%)",
              filter: "blur(70px)",
            }}
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
              href="https://wa.me/923323848135?text=Hi%20Trenex%20Agency,%20I%20visited%20your%20Video%20Editing%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
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
