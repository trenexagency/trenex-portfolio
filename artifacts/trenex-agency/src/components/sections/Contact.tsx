import { motion } from "framer-motion";
import { Particles } from "@/components/Particles";
import { siteConfig, contactInfo } from "@/data/site";
import { SectionAmbience } from "@/components/SectionAmbience";

export function Contact() {
  return (
    <motion.section
      id="contact"
      className="relative flex min-h-[70svh] w-full flex-col items-center justify-center overflow-hidden bg-[#050505]/75 px-5 py-20 text-center sm:px-6 sm:py-28"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <SectionAmbience variant="contact" />

      {/* Enhanced multi-layer center glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(235,27,36,0.14), transparent 62%)",
        }}
      />
      {/* Secondary deeper glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 40% 40% at 50% 45%, rgba(235,27,36,0.08), transparent 55%)",
        }}
      />
      <Particles count={28} />

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
        className="relative mt-6 max-w-2xl text-3xl font-semibold uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-6xl"
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
        href={contactInfo.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="link-contact-whatsapp"
        data-magnetic
        className="group relative mt-10 flex max-w-full flex-wrap items-center justify-center gap-3 break-all border border-[#FF1F1F]/50 px-6 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#FF1F1F] hover:shadow-[0_0_30px_rgba(255,31,31,0.35)] sm:mt-12 sm:break-normal sm:px-9 sm:text-sm sm:tracking-[0.3em]"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      >
        <span>Message Us on WhatsApp</span>
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
    </motion.section>
  );
}
