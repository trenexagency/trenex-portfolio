import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10 bg-[#050505] px-5 py-8 sm:px-6 sm:py-10 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-[0.65rem] uppercase tracking-[0.15em] text-white/40 sm:gap-4 sm:text-xs sm:tracking-[0.2em] md:flex-row">
        <span>
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </span>
        <span className="text-white/30">All rights reserved</span>
      </div>
    </footer>
  );
}
