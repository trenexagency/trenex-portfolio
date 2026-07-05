import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10 bg-[#050505] px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-white/40 md:flex-row">
        <span>
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </span>
        <span className="text-white/30">All rights reserved</span>
      </div>
    </footer>
  );
}
