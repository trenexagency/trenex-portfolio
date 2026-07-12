import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { VideoWorkItem } from "@/data/video-work";

/* ══════════════════════════════════════════════════════
   PREMIUM VIDEO LIGHTBOX
   Full-screen modal player for the video portfolio — same
   cinematic language as the image lightbox, but embeds a
   playable YouTube reel instead of a static image.
══════════════════════════════════════════════════════ */
interface VideoLightboxProps {
  items: VideoWorkItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const SWIPE_THRESHOLD = 50;

export function VideoLightbox({ items, index, onClose, onPrev, onNext }: VideoLightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const current = items[index];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      if (delta > SWIPE_THRESHOLD) onPrev();
      else if (delta < -SWIPE_THRESHOLD) onNext();
      touchStartX.current = null;
    },
    [onPrev, onNext],
  );

  if (!current) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="video-lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[rgba(0,0,0,0.92)] backdrop-blur-xl"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="dialog"
        aria-modal="true"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close"
          className="absolute right-3 top-3 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 transition-all duration-300 hover:border-[#eb1b24]/60 hover:bg-[#eb1b24]/15 hover:text-white sm:right-6 sm:top-6"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Previous arrow */}
        {items.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous video"
            className="absolute left-1 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 transition-all duration-300 hover:border-[#eb1b24]/60 hover:bg-[#eb1b24]/15 hover:text-white sm:left-4 sm:h-12 sm:w-12 lg:left-8"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}

        {/* Next arrow */}
        {items.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next video"
            className="absolute right-1 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 transition-all duration-300 hover:border-[#eb1b24]/60 hover:bg-[#eb1b24]/15 hover:text-white sm:right-4 sm:h-12 sm:w-12 lg:right-8"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}

        {/* Title */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`title-${current.youtubeId}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-20 mb-3 px-16 text-center text-xs font-semibold uppercase tracking-[0.3em] text-[#eb1b24] sm:mb-4 sm:text-sm"
          >
            {current.title}
          </motion.p>
        </AnimatePresence>

        {/* Player */}
        <div className="flex w-full flex-1 items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.youtubeId}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="aspect-video w-full max-h-[80vh] max-w-[92vw] overflow-hidden rounded-md shadow-[0_40px_120px_-24px_rgba(235,27,36,0.45),0_0_0_1px_rgba(255,255,255,0.06)] sm:max-w-[85vw]"
              style={{ width: "min(92vw, 142vh)" }}
            >
              <iframe
                key={current.youtubeId}
                src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={current.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Counter */}
        {items.length > 1 && (
          <div className="relative z-20 mt-3 font-mono text-xs uppercase tracking-[0.25em] text-white/40 sm:mt-4">
            {index + 1} / {items.length}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
