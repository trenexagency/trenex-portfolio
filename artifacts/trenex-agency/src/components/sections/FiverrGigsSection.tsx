import { memo, useCallback, useMemo, useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { fiverrGigFiles } from "virtual:portfolio-fiverr-gigs";
import { PortfolioLightbox } from "@/components/PortfolioLightbox";

/* ══════════════════════════════════════════════════════
   FIVERR GIG DESIGNS
   Masonry gallery, loaded dynamically from
   public/portfolio/fiverr-gigs/ (see the fiverr-gigs-manifest
   Vite plugin) — drop images in that folder and they appear
   here automatically, no code changes needed.
══════════════════════════════════════════════════════ */

const FIVERR_GIG_IMAGES = fiverrGigFiles.map(({ file, width, height }) => ({
  src: `${import.meta.env.BASE_URL}portfolio/fiverr-gigs/${file}`,
  width,
  height,
}));

/* Deterministic pseudo-random span so the masonry grid feels
   organic instead of uniform, without layout shift on reload. */
function spanForIndex(i: number): string {
  const pattern = ["row-span-2", "row-span-1", "row-span-1", "row-span-2", "row-span-1", "row-span-2"];
  return pattern[i % pattern.length];
}

/**
 * Memoized card — tilt is driven by direct DOM style mutations (no useState)
 * so mousemove over a card never triggers a React re-render.
 * The entrance animation (opacity/y) still uses Framer Motion since it
 * fires once and then stops; only the continuous per-move tilt is DOM-direct.
 */
const TiltCard = memo(function TiltCard({
  src,
  index,
}: {
  src: string;
  index: number;
}) {
  const innerRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width  - 0.5;
    const py = (e.clientY - rect.top)  / rect.height - 0.5;
    const rx =  py * -8;
    const ry =  px *  10;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    }
  }, []);

  return (
    /* Outer div: entrance animation (once: true → no ongoing overhead) + grid span */
    <motion.div
      data-index={index}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.06, ease: "easeOut" }}
      className={`${spanForIndex(index)} group`}
      style={{ cursor: "pointer" }}
    >
      {/* Inner button: tilt transform is applied directly via ref (no state) */}
      <button
        ref={innerRef}
        type="button"
        data-index={index}
        className="relative block h-full w-full transform-gpu overflow-hidden rounded-2xl border border-white/8 bg-[#0a0a0a] text-left transition-colors duration-500 will-change-transform hover:border-[#eb1b24]/50 hover:shadow-[0_25px_70px_-18px_rgba(235,27,36,0.5)] focus:outline-none focus-visible:border-[#eb1b24]/60"
        style={{ transition: "transform 0.25s ease-out", willChange: "transform" }}
      >
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full min-h-[220px] w-full transform-gpu object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
        />

        {/* Red glow wash on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#eb1b24]/0 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-[#eb1b24]/25" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/30 via-transparent to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full border border-[#eb1b24]/60 bg-black/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
            View Design
          </span>
        </div>
      </button>
    </motion.div>
  );
});

export function FiverrGigsSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = useMemo(() => FIVERR_GIG_IMAGES, []);
  const items = useMemo(
    () => images.map(({ src }) => ({ src, title: "Fiverr Gig Design" })),
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
    <section className="relative w-full overflow-hidden bg-[#050505] px-5 py-16 sm:px-6 sm:py-20">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(235,27,36,0.07), transparent 70%)", filter: "blur(90px)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 flex flex-col items-start gap-3 sm:mb-14"
        >
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#eb1b24]">Marketplace Work</span>
          <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            Fiverr Gig Designs
          </h2>
          <p className="max-w-xl text-sm text-white/50 sm:text-base">
            High-converting Fiverr gig designs crafted to maximize clicks, impressions, and conversions.
          </p>
        </motion.div>

        <div
          className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
          onClick={handleGridClick}
        >
          {images.map((image, i) => (
            <TiltCard key={image.src} src={image.src} index={i} />
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
