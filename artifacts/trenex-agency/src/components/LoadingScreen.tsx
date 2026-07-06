import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Particles } from "@/components/Particles";
import { siteConfig } from "@/data/site";
import logoUrl from "@assets/Trenex_Logo_1783248099260.svg";

interface LoadingScreenProps {
  onEnter: () => void;
}

type Phase = "initializing" | "ready" | "exiting";

export function LoadingScreen({ onEnter }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("initializing");

  useEffect(() => {
    if (phase !== "initializing") return;
    if (progress >= 100) {
      setPhase("ready");
      return;
    }
    const timeout = setTimeout(
      () => setProgress((p) => Math.min(100, p + Math.round(4 + Math.random() * 9))),
      110,
    );
    return () => clearTimeout(timeout);
  }, [progress, phase]);

  const handleEnter = () => {
    setPhase("exiting");
    setTimeout(onEnter, 1000);
  };

  return (
    <AnimatePresence>
      {phase !== "exiting" && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(255,31,31,0.16), transparent 60%)",
            }}
          />

          <Particles count={50} />

          <AnimatePresence mode="wait">
            {phase === "initializing" ? (
              <motion.div
                key="initializing"
                className="relative flex flex-col items-center"
                exit={{ opacity: 0, y: -16, transition: { duration: 0.5 } }}
              >
                <motion.div
                  className="relative flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute h-28 w-28 rounded-full sm:h-32 sm:w-32 md:h-36 md:w-36"
                    animate={{
                      boxShadow: [
                        "0 0 40px 10px rgba(255,31,31,0.25)",
                        "0 0 80px 20px rgba(255,31,31,0.5)",
                        "0 0 40px 10px rgba(255,31,31,0.25)",
                      ],
                    }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <img
                    src={logoUrl}
                    alt="Trenex Agency"
                    className="relative h-56 w-56 object-contain sm:h-64 sm:w-64 md:h-72 md:w-72"
                    style={{
                      filter:
                        "drop-shadow(0 0 22px rgba(255,31,31,0.6)) drop-shadow(0 0 48px rgba(255,31,31,0.35))",
                      imageRendering: "auto",
                    }}
                    decoding="async"
                    loading="eager"
                    data-testid="img-logo-loading"
                  />
                </motion.div>

                <motion.p
                  className="relative mt-9 font-mono text-xs uppercase tracking-[0.5em] text-white/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Initializing Trenex
                </motion.p>

                <div className="relative mt-8 h-px w-56 overflow-hidden bg-white/10">
                  <motion.div
                    className="h-full bg-[#FF1F1F]"
                    style={{ boxShadow: "0 0 8px 1px rgba(255,31,31,0.7)" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                </div>

                <span className="relative mt-4 font-mono text-[11px] tracking-widest text-white/40">
                  {String(Math.min(progress, 100)).padStart(3, "0")}%
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="ready"
                className="relative flex flex-col items-center px-6 text-center"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="relative mb-8 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute h-24 w-24 rounded-full sm:h-28 sm:w-28 md:h-32 md:w-32"
                    animate={{
                      boxShadow: [
                        "0 0 30px 6px rgba(255,31,31,0.2)",
                        "0 0 60px 14px rgba(255,31,31,0.45)",
                        "0 0 30px 6px rgba(255,31,31,0.2)",
                      ],
                    }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <img
                    src={logoUrl}
                    alt="Trenex Agency"
                    className="relative h-[12.25rem] w-[12.25rem] object-contain sm:h-56 sm:w-56 md:h-64 md:w-64"
                    style={{
                      filter:
                        "drop-shadow(0 0 20px rgba(255,31,31,0.55)) drop-shadow(0 0 42px rgba(255,31,31,0.3))",
                      imageRendering: "auto",
                    }}
                    decoding="async"
                    loading="eager"
                    data-testid="img-logo-enter"
                  />
                </motion.div>

                <motion.h1
                  className="text-3xl font-semibold uppercase tracking-[0.3em] text-white md:text-4xl"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
                >
                  {siteConfig.name}
                </motion.h1>

                <motion.p
                  className="mt-4 font-mono text-sm uppercase tracking-[0.35em] text-[#FF1F1F]"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                >
                  {siteConfig.subheadline}
                </motion.p>

                <motion.button
                  data-testid="button-enter-experience"
                  data-magnetic
                  onClick={handleEnter}
                  className="group relative mt-14 flex items-center gap-3 border border-[#FF1F1F]/50 px-9 py-3.5 text-sm font-medium uppercase tracking-[0.3em] text-white transition-all duration-300 hover:border-[#FF1F1F] hover:shadow-[0_0_30px_rgba(255,31,31,0.35)]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
                >
                  <span className="absolute inset-0 -z-10 bg-[#FF1F1F]/0 transition-colors duration-300 group-hover:bg-[#FF1F1F]/10" />
                  <span>Enter Experience</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
