import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/data/site";
import logoUrl from "@assets/Trenex_Logo_1783248099260.svg";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-2 sm:px-8 md:px-12 md:py-3">
      <a href="#hero" className="group flex items-center gap-3" data-testid="link-logo">
        <img
          src={logoUrl}
          alt="Trenex Agency"
          className="h-14 w-14 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16 md:h-20 md:w-20"
          style={{
            filter:
              "drop-shadow(0 0 10px rgba(255,31,31,0.55)) drop-shadow(0 0 26px rgba(255,31,31,0.3))",
            imageRendering: "auto",
          }}
          decoding="async"
          loading="eager"
        />
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white sm:text-sm">
          Trenex
        </span>
      </a>

      <nav className="hidden items-center gap-10 md:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-xs uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-[#FF1F1F]"
            data-testid={`link-nav-${link.label.toLowerCase()}`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        data-testid="button-mobile-menu"
        className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
      >
        <motion.span
          className="h-px w-6 bg-white"
          animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
        <motion.span
          className="h-px w-6 bg-white"
          animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="h-px w-6 bg-white"
          animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-[#050505]/98 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                className="text-2xl font-medium uppercase tracking-[0.2em] text-white transition-colors hover:text-[#FF1F1F]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: "easeOut" }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
