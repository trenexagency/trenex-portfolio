import { motion } from "framer-motion";
import logoUrl from "@assets/Trenex_Logo_1783849513196.svg";

/* ══════════════════════════════════════════════════════
   VIDEO EDITING — CINEMATIC ENTRANCE
   A premium, one-shot intro that plays ONLY when entering
   the Video Editing page from its homepage service card.
   Distinct from the generic transition in PageTransition.tsx:
   longer, holds on a centered logo + subtitle before
   revealing the destination hero. Pure opacity/scale/transform
   — no shake, no flash, no sound. Total on-screen time ~2.9s,
   inside the 2.5–3s budget.
══════════════════════════════════════════════════════ */

export const VIDEO_INTRO_DURATION_S = 2.9;
export const VIDEO_INTRO_TOTAL_MS = VIDEO_INTRO_DURATION_S * 1000;
/* Swap the route while the overlay is fully opaque and the logo/text
   haven't appeared yet, so the destination page is ready underneath
   by the time the overlay fades away at the end. */
export const VIDEO_INTRO_SWITCH_ROUTE_AT_MS = 380;

/* Keyframe timing (fractions of the total duration) shared across layers
   so the dark overlay, logo and subtitle stay perfectly in sync. */
const OVERLAY_TIMES = [0, 0.121, 0.914, 1];
const OVERLAY_OPACITY = [0, 1, 1, 0];

const LOGO_TIMES = [0, 0.103, 0.31, 0.776, 0.879, 1];
const LOGO_OPACITY = [0, 0, 1, 1, 0, 0];
const LOGO_SCALE = [0.9, 0.9, 1, 1, 1.015, 1.015];
const GLOW_OPACITY = [0, 0, 0.75, 0.75, 0, 0];

const TEXT_TIMES = [0, 0.19, 0.362, 0.776, 0.879, 1];
const TEXT_OPACITY = [0, 0, 1, 1, 0, 0];
const TEXT_Y = [14, 14, 0, 0, 0, 0];

export function VideoEditingIntro() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-[#050505]"
      initial={{ opacity: 0 }}
      animate={{ opacity: OVERLAY_OPACITY }}
      transition={{ duration: VIDEO_INTRO_DURATION_S, times: OVERLAY_TIMES, ease: "easeInOut" }}
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
          transition={{ duration: VIDEO_INTRO_DURATION_S, times: LOGO_TIMES, ease: "easeInOut" }}
        />

        {/* Trenex logo — fades in, scales 90% → 100%, soft glow via drop-shadow */}
        <motion.img
          src={logoUrl}
          alt=""
          className="relative h-16 w-16 object-contain sm:h-20 sm:w-20"
          style={{ filter: "drop-shadow(0 0 20px rgba(235,27,36,0.5))" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: LOGO_OPACITY, scale: LOGO_SCALE }}
          transition={{ duration: VIDEO_INTRO_DURATION_S, times: LOGO_TIMES, ease: "easeInOut" }}
        />

        {/* Service tagline — fade-up, wide letter-spacing, white with red accents */}
        <motion.p
          className="relative mt-7 max-w-xl text-sm font-semibold uppercase tracking-[0.35em] text-white sm:mt-8 sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: TEXT_OPACITY, y: TEXT_Y }}
          transition={{ duration: VIDEO_INTRO_DURATION_S, times: TEXT_TIMES, ease: "easeInOut" }}
        >
          Commercial Editing <span className="text-[#eb1b24]">•</span> Motion Graphics{" "}
          <span className="text-[#eb1b24]">•</span> Color Grading
        </motion.p>
      </div>
    </motion.div>
  );
}
