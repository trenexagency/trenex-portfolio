import { forwardRef } from "react";
import { motion } from "framer-motion";
import logoUrl from "@assets/Trenex_Logo_1783248099260.svg";

/**
 * Floating logo badge for the Hero — a compact glowing circle with the
 * mark sized to dominate it (no cropping: image uses object-contain with
 * even padding on all sides). Floats gently on its own loop; parallax
 * drift is applied externally via the forwarded ref (GSAP, from Hero.tsx)
 * so it stays in sync with the rest of the depth layers.
 */
export const HeroLogo = forwardRef<HTMLDivElement>(function HeroLogo(_props, ref) {
  return (
    <div ref={ref} className="relative mb-8 flex items-center justify-center">
      <motion.div
        className="relative flex items-center justify-center"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute h-24 w-24 rounded-full sm:h-28 sm:w-28 md:h-[8.25rem] md:w-[8.25rem]"
          animate={{
            boxShadow: [
              "0 0 30px 4px rgba(255,31,31,0.25)",
              "0 0 55px 10px rgba(255,31,31,0.45)",
              "0 0 30px 4px rgba(255,31,31,0.25)",
            ],
          }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] p-2.5 backdrop-blur-sm sm:h-28 sm:w-28 md:h-[8.25rem] md:w-[8.25rem]">
          <img
            src={logoUrl}
            alt="Trenex Agency"
            className="h-full w-full object-contain"
            style={{
              filter:
                "drop-shadow(0 0 16px rgba(255,31,31,0.55)) drop-shadow(0 0 34px rgba(255,31,31,0.3))",
              imageRendering: "auto",
            }}
            decoding="async"
            loading="eager"
            data-testid="img-logo-hero"
          />
        </div>
      </motion.div>
    </div>
  );
});
