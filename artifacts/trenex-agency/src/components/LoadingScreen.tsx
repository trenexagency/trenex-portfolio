import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/data/site";

interface LoadingScreenProps {
  onEnter: () => void;
}

export function LoadingScreen({ onEnter }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      setReady(true);
      return;
    }
    const timeout = setTimeout(
      () => setProgress((p) => Math.min(100, p + Math.round(4 + Math.random() * 10))),
      90,
    );
    return () => clearTimeout(timeout);
  }, [progress]);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(onEnter, 900);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,31,31,0.10), transparent 60%)",
            }}
          />

          <motion.h1
            className="relative text-3xl md:text-5xl font-semibold tracking-[0.2em] text-white uppercase"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {siteConfig.name.split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.03, duration: 0.5, ease: "easeOut" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <div className="relative mt-10 h-px w-56 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-[#FF1F1F]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>

          <motion.span
            className="relative mt-4 font-mono text-xs tracking-widest text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {String(Math.min(progress, 100)).padStart(3, "0")}%
          </motion.span>

          <AnimatePresence>
            {ready && (
              <motion.button
                data-testid="button-enter-experience"
                onClick={handleEnter}
                className="group relative mt-14 flex items-center gap-3 border border-[#FF1F1F]/50 px-8 py-3 text-sm font-medium uppercase tracking-[0.25em] text-white transition-colors hover:bg-[#FF1F1F]/10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span>Enter Experience</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
