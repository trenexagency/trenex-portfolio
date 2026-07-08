import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrophyScene } from "@/components/three/TrophyScene";

export function TrophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="signature"
      className="relative w-full overflow-hidden bg-[#050505]/90 px-5 py-12 sm:px-6 sm:py-16"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF1F1F]/20 to-transparent" />

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="mb-3 flex flex-col items-center gap-3 text-center"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#FF1F1F]">
            TRENEX SYMBOL
          </span>
          <h2 className="text-2xl font-semibold uppercase tracking-tight text-white sm:text-3xl md:text-4xl">
            The Trenex Signature
          </h2>
          <p className="mt-1 max-w-sm text-sm leading-relaxed text-white/40">
            The symbol behind every project, every strategy, and every digital
            experience we create. A mark of precision, creativity, and trust.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-3 flex items-center justify-center"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/20">
            Drag to Rotate
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto"
          style={{ maxWidth: 700 }}
        >
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(255,31,31,0.10), transparent 70%)",
            }}
          />

          {mounted ? (
            <TrophyScene className="relative z-10 h-[320px] w-full cursor-grab active:cursor-grabbing sm:h-[380px] md:h-[420px]" />
          ) : (
            <div className="relative z-10 flex h-[320px] w-full items-center justify-center sm:h-[380px] md:h-[420px]">
              <div
                className="h-16 w-16 animate-spin rounded-full border border-[#FF1F1F]/30 border-t-[#FF1F1F]"
                style={{ animationDuration: "2s" }}
              />
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-12 bg-gradient-to-t from-[#050505] to-transparent" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-white/15"
        >
          Est. 2022 &nbsp;·&nbsp; Creativity Without Limits
        </motion.p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </motion.section>
  );
}
