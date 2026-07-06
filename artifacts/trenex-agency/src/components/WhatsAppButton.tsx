import { FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";
import { contactInfo } from "@/data/site";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <a
        href={contactInfo.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp — Let's Talk"
        data-testid="link-whatsapp-float"
        data-magnetic
        className="group relative flex h-14 w-14 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#FF1F1F]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] sm:h-16 sm:w-16"
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full border border-[#FF1F1F]/50"
          animate={{ scale: [1, 1.7, 1.7], opacity: [0.55, 0, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", repeatDelay: 1.4 }}
        />
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full border border-[#FF1F1F]/40"
          animate={{ scale: [1, 1.7, 1.7], opacity: [0.4, 0, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", repeatDelay: 1.4, delay: 0.5 }}
        />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-70 blur-lg transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: "0 0 26px 6px rgba(255,31,31,0.5)" }}
        />

        <motion.span
          whileHover={{ scale: 1.1, rotate: -6 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex h-full w-full items-center justify-center rounded-full border border-white/15 bg-[#0A0A0A]/80 backdrop-blur-xl transition-all duration-300 group-hover:border-[#FF1F1F]/70 group-hover:bg-[#FF1F1F]/10"
          style={{
            boxShadow: "0 8px 30px -8px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-transparent to-black/30"
          />
          <FaWhatsapp
            className="relative z-10 h-6 w-6 text-[#FF1F1F] transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,31,31,0.95)] sm:h-7 sm:w-7"
          />
        </motion.span>

        <span
          role="tooltip"
          className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#0A0A0A]/95 px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-white opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100 translate-x-2"
        >
          Let's Talk
        </span>
      </a>
    </div>
  );
}
