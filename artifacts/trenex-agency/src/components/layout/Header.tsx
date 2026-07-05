import { navLinks } from "@/data/site";
import logoUrl from "@assets/Trenex_Logo_1783248099260.svg";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-3 md:px-12 md:py-4">
      <a href="#hero" className="group flex items-center gap-4" data-testid="link-logo">
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
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
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
    </header>
  );
}
