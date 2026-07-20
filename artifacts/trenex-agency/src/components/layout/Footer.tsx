import { motion } from "framer-motion";
import logoUrl from "@assets/Trenex_Logo_1783248099260.svg";
import { siteConfig, navLinks, contactInfo } from "@/data/site";
import { SocialIcons } from "@/components/SocialIcons";

/* Evaluated once at module load — avoids calling Date each render */
const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-[#050505]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF1F1F]/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-0 h-72 w-72 rounded-full bg-[#FF1F1F]/[0.06] blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 bottom-0 h-72 w-72 rounded-full bg-[#FF1F1F]/[0.05] blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 md:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left"
          >
            <a href="#hero" className="brand-asset group flex items-center gap-3" data-testid="link-footer-logo">
              <img
                src={logoUrl}
                alt="Trenex Agency"
                className="h-12 w-12 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(255,31,31,0.5)) drop-shadow(0 0 22px rgba(255,31,31,0.25))",
                }}
              />
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
                {siteConfig.name}
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-white/45">
              {siteConfig.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left"
          >
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#FF1F1F]">
              Navigate
            </span>
            <nav className="flex flex-col items-center gap-3 sm:items-start">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-testid={`link-footer-nav-${link.label.toLowerCase()}`}
                  className="text-sm uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-[#FF1F1F]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left"
          >
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#FF1F1F]">
              Contact
            </span>
            <div className="flex flex-col items-center gap-2 sm:items-start">
              <a
                href={`mailto:${contactInfo.email}`}
                data-testid="link-footer-email"
                className="break-all text-sm text-white/50 transition-colors hover:text-[#FF1F1F]"
              >
                {contactInfo.email}
              </a>
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-footer-whatsapp"
                className="text-sm text-white/50 transition-colors hover:text-[#FF1F1F]"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-14 flex flex-col items-center gap-3 border-t border-white/10 pt-10 sm:mt-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-white/40">
            Follow Us
          </span>
          <SocialIcons />
        </motion.div>

        <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-center text-[0.65rem] uppercase tracking-[0.15em] text-white/40 sm:mt-16 sm:flex-row sm:gap-4 sm:text-xs sm:tracking-[0.2em]">
          <span>
            &copy; {CURRENT_YEAR} {siteConfig.name}. All rights reserved.
          </span>
          <span className="text-white/30">Designed &amp; Developed by Trenex Agency</span>
        </div>
      </div>
    </footer>
  );
}
