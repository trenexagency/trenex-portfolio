import { navLinks } from "@/data/site";
import logoUrl from "@assets/Trenex_Logo_1783248099260.svg";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
      <a href="#hero" className="flex items-center gap-3" data-testid="link-logo">
        <img src={logoUrl} alt="Trenex Agency" className="h-8 w-8 object-contain md:h-9 md:w-9" />
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
