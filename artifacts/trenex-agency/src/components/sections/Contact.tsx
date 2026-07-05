import { motion } from "framer-motion";
import { Particles } from "@/components/Particles";
import { siteConfig } from "@/data/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden bg-[#050505] px-6 py-28 text-center"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,31,31,0.12), transparent 60%)",
        }}
      />
      <Particles count={20} />

      <motion.span
        className="relative font-mono text-xs uppercase tracking-[0.4em] text-[#FF1F1F]"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Let's Talk
      </motion.span>

      <motion.h2
        className="relative mt-6 max-w-2xl text-4xl font-semibold uppercase leading-tight tracking-tight text-white md:text-6xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      >
        Let's Build the Future,
        <br />
        <span className="text-[#FF1F1F]">Together.</span>
      </motion.h2>

      <motion.p
        className="relative mt-6 max-w-md text-sm text-white/50 md:text-base"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
      >
        Have a project in mind? Reach out and let's create something extraordinary.
      </motion.p>

      <motion.a
        href="mailto:hello@trenex.agency"
        data-testid="link-contact-email"
        className="group relative mt-12 flex items-center gap-3 border border-[#FF1F1F]/50 px-9 py-3.5 text-sm font-medium uppercase tracking-[0.3em] text-white transition-all duration-300 hover:border-[#FF1F1F] hover:shadow-[0_0_30px_rgba(255,31,31,0.35)]"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      >
        <span>hello@trenex.agency</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      </motion.a>

      <motion.span
        className="relative mt-20 font-mono text-[11px] uppercase tracking-[0.3em] text-white/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        {siteConfig.name}
      </motion.span>
    </section>
  );
}
