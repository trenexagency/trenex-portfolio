import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoUrl from "@assets/Trenex_Logo_1783849513196.svg";

/* ══════════════════════════════════════════════════════
   WEB DEVELOPMENT — CINEMATIC ENTRANCE
   Since the Web Development card opens this page in a NEW
   TAB (a real page load, not a client-side route swap), the
   intro is self-contained here: it auto-plays once on mount,
   holds on a centered logo + subtitle, then fades away to
   reveal the Hero section underneath — no user interaction,
   no loading spinner, no sound. Pure opacity/scale — total
   on-screen time ~2.9s, inside the 2.5–3s budget.
══════════════════════════════════════════════════════ */

const TOTAL_DURATION_S = 2.9;
const TOTAL_DURATION_MS = TOTAL_DURATION_S * 1000;

const LOGO_TIMES = [0, 0.103, 0.31, 0.776, 0.879, 1];
const LOGO_OPACITY = [0, 0, 1, 1, 0, 0];
const LOGO_SCALE = [0.9, 0.9, 1, 1, 1.015, 1.015];
const GLOW_OPACITY = [0, 0, 0.75, 0.75, 0, 0];

const TEXT_TIMES = [0, 0.19, 0.362, 0.776, 0.879, 1];
const TEXT_OPACITY = [0, 0, 1, 1, 0, 0];
const TEXT_Y = [14, 14, 0, 0, 0, 0];

export function WebDevelopmentIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), TOTAL_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeInOut" } }}
        >
          {/* faint static vignette behind everything — soft, not pulsing */}
          <div
            className="absolute h-[28rem] w-[28rem] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(235,27,36,0.14), transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative flex flex-col items-center px-6 text-center">
            {/* soft red glow behind the logo mark */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-48 sm:w-48"
              style={{
                background: "radial-gradient(circle, rgba(235,27,36,0.55), transparent 70%)",
                filter: "blur(30px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: GLOW_OPACITY }}
              transition={{ duration: TOTAL_DURATION_S, times: LOGO_TIMES, ease: "easeInOut" }}
            />

            {/* Trenex logo — fades in, scales 90% → 100%, soft glow via drop-shadow */}
            <motion.img
              src={logoUrl}
              alt=""
              className="relative h-16 w-16 object-contain sm:h-20 sm:w-20"
              style={{ filter: "drop-shadow(0 0 20px rgba(235,27,36,0.5))" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: LOGO_OPACITY, scale: LOGO_SCALE }}
              transition={{ duration: TOTAL_DURATION_S, times: LOGO_TIMES, ease: "easeInOut" }}
            />

            {/* Service tagline — fade-up, wide letter-spacing, white with red accents */}
            <motion.p
              className="relative mt-7 max-w-xl text-sm font-semibold uppercase tracking-[0.35em] text-white sm:mt-8 sm:text-lg md:text-xl"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: TEXT_OPACITY, y: TEXT_Y }}
              transition={{ duration: TOTAL_DURATION_S, times: TEXT_TIMES, ease: "easeInOut" }}
            >
              Web Development <span className="text-[#eb1b24]">•</span> Modern UI{" "}
              <span className="text-[#eb1b24]">•</span> Responsive Experiences
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
