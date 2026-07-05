import { navLinks, siteConfig } from "@/data/site";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
      <a
        href="#hero"
        className="text-sm font-semibold uppercase tracking-[0.3em] text-white"
        data-testid="link-logo"
      >
        {siteConfig.name}
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
