import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoUrl from "@assets/Trenex_Logo_1783849513196.svg";

/* ══════════════════════════════════════════════════════
   VIDEO EDITING — CINEMATIC ENTRANCE
   Since the Video Editing card opens this page in a NEW
   TAB (a real page load, not a client-side route swap), the
   intro is self-contained here: it auto-plays once on mount,
   holds on a large centered logo + two lines of copy, then
   crossfades away to reveal the Hero section underneath —
   no user interaction, no loading spinner, no sound.

   Step 1 — logo fades in (large, ~220–280px wide)
   Step 2 — soft red glow blooms in behind the logo
   Step 3 — "VIDEO EDITING" subtitle fades up
   Step 4 — "Commercial Editing • Motion Graphics • Color Grading" fades up
   Step 5 — after ~2.7s the whole overlay smoothly crossfades
            into the hero section (no hard cut)
══════════════════════════════════════════════════════ */

const HOLD_DURATION_S = 2.7;
const HOLD_DURATION_MS = HOLD_DURATION_S * 1000;
const EXIT_DURATION_S = 0.5;

export function VideoEditingIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), HOLD_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: EXIT_DURATION_S, ease: "easeInOut" } }}
        >
          {/* faint static vignette behind everything — soft, not pulsing */}
          <div
            className="absolute h-[32rem] w-[32rem] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(235,27,36,0.14), transparent 70%)",
              filter: "blur(70px)",
            }}
          />

          <div className="relative flex flex-col items-center px-6 text-center">
            {/* Step 2 — soft red glow blooms in behind the logo */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-72 sm:w-72 md:h-80 md:w-80"
              style={{
                background: "radial-gradient(circle, rgba(235,27,36,0.55), transparent 70%)",
                filter: "blur(40px)",
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 0.85, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
            />

            {/* Step 1 — large Trenex logo fades in and settles */}
            <motion.img
              src={logoUrl}
              alt="Trenex"
              className="relative w-[220px] object-contain sm:w-[250px] md:w-[280px]"
              style={{ filter: "drop-shadow(0 0 30px rgba(235,27,36,0.55))" }}
              initial={{ opacity: 0, scale: 0.88, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Step 3 — "VIDEO EDITING" subtitle */}
            <motion.p
              className="relative mt-8 text-xl font-semibold uppercase tracking-[0.3em] text-white sm:mt-9 sm:text-2xl md:text-3xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
            >
              Video Editing
            </motion.p>

            {/* Step 4 — supporting line */}
            <motion.p
              className="relative mt-4 max-w-md text-xs font-medium uppercase tracking-[0.25em] text-white/50 sm:text-sm"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.55, ease: "easeOut" }}
            >
              Commercial Editing <span className="text-[#eb1b24]">•</span> Motion Graphics{" "}
              <span className="text-[#eb1b24]">•</span> Color Grading
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
