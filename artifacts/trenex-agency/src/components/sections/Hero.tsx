import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 text-center"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(255,31,31,0.14), transparent 55%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,black_90%)]" />

      <motion.span
        className="relative mb-6 font-mono text-xs uppercase tracking-[0.4em] text-[#FF1F1F]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Creative Studio
      </motion.span>

      <motion.h1
        className="relative max-w-4xl text-5xl font-semibold uppercase leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
      >
        {siteConfig.tagline.split(" ").map((word, i) => (
          <span key={i} className="mr-3 inline-block last:mr-0">
            {word === "move." ? <span className="text-[#FF1F1F]">{word}</span> : word}
          </span>
        ))}
      </motion.h1>

      <motion.p
        className="relative mt-8 max-w-xl text-balance text-base text-white/60 md:text-lg"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        {siteConfig.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="relative mt-12"
      >
        <a
          href="#services"
          data-testid="link-view-services"
          className="group inline-flex items-center gap-3 border border-white/20 px-8 py-3 text-sm font-medium uppercase tracking-[0.25em] text-white transition-colors hover:border-[#FF1F1F] hover:text-[#FF1F1F]"
        >
          <span>View Services</span>
          <span className="transition-transform duration-300 group-hover:translate-y-1">
            &darr;
          </span>
        </a>
      </motion.div>

      <motion.div
        className="absolute bottom-10 h-14 w-px bg-gradient-to-b from-white/40 to-transparent"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
      />
    </section>
  );
}
