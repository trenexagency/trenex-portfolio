import { memo, useCallback, useMemo, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { thumbnailFiles } from "virtual:portfolio-thumbnails";
import { PortfolioLightbox } from "@/components/PortfolioLightbox";

/* ══════════════════════════════════════════════════════
   FEATURED THUMBNAILS
   Loaded dynamically from public/portfolio/thumbnails/ (see
   the portfolio-thumbnails-manifest Vite plugin) — drop
   images in that folder and they appear here automatically,
   no code changes needed. Large premium cards, native aspect
   ratio preserved, light hover scale only, fullscreen lightbox.
   Images carry their intrinsic width/height so the browser
   reserves the right amount of space before they load
   (prevents layout shift) while still lazy-loading below the fold.
══════════════════════════════════════════════════════ */

const THUMBNAIL_IMAGES = thumbnailFiles.map(({ file, width, height }) => ({
  src: `${import.meta.env.BASE_URL}portfolio/thumbnails/${file}`,
  width,
  height,
}));

/* Memoized card + delegated click handling: index travels via a data
   attribute, so the click handler prop stays referentially stable and
   unrelated re-renders (e.g. opening the lightbox) don't re-render
   every card in the grid. */
const ThumbnailCard = memo(function ThumbnailCard({
  src,
  width,
  height,
  index,
}: {
  src: string;
  width: number;
  height: number;
  index: number;
}) {
  return (
    <motion.button
      type="button"
      data-index={index}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.06, ease: "easeOut" }}
      className="group relative block w-full transform-gpu cursor-pointer overflow-hidden rounded-2xl border border-white/8 bg-[#0a0a0a] text-left transition-colors duration-500 will-change-transform hover:border-[#eb1b24]/50 hover:shadow-[0_25px_70px_-18px_rgba(235,27,36,0.5)] focus:outline-none focus-visible:border-[#eb1b24]/60"
    >
      <img
        src={src}
        width={width || undefined}
        height={height || undefined}
        alt=""
        loading="lazy"
        decoding="async"
        className="block w-full transform-gpu transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/25 via-transparent to-transparent" />

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
        <span className="rounded-full border border-[#eb1b24]/60 bg-black/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
          View Design
        </span>
      </div>
    </motion.button>
  );
});

export function FeaturedThumbnailsSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = useMemo(() => THUMBNAIL_IMAGES, []);
  const items = useMemo(
    () => images.map(({ src }) => ({ src, title: "Thumbnail Design" })),
    [images],
  );

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length],
  );
  const showNext = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length],
  );
  const handleGridClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-index]");
    if (!target) return;
    const idx = Number(target.dataset.index);
    if (Number.isFinite(idx)) setLightboxIndex(idx);
  }, []);

  if (items.length === 0) return null;

  return (
    <section id="featured-thumbnails" className="relative w-full overflow-hidden bg-[#050505]/75 px-5 py-16 sm:px-6 sm:py-20">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(235,27,36,0.065), transparent 70%)", filter: "blur(90px)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 flex flex-col items-start gap-3 sm:mb-14"
        >
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#eb1b24]">Featured Work</span>
          <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            Featured Thumbnails
          </h2>
        </motion.div>

        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
          onClick={handleGridClick}
        >
          {images.map((image, i) => (
            <ThumbnailCard key={image.src} src={image.src} width={image.width} height={image.height} index={i} />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <PortfolioLightbox
          items={items}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </section>
  );
}
