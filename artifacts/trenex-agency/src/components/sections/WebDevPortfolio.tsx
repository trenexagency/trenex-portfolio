import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ProjectLightbox } from "@/components/ProjectLightbox";

/* ══════════════════════════════════════════════════════
   WEB DEVELOPMENT — PORTFOLIO CATEGORIES
   Immediately follows the Tech Showcase. Exactly four
   categories, each a large premium card with an abstract
   browser-mockup preview (no stock imagery) so the layout
   language itself signals the category. Focus stays on the
   project preview, not on copy. Clicking a card opens the
   shared fullscreen ProjectLightbox (same pattern as the
   Graphic Design / Video Editing lightboxes).
══════════════════════════════════════════════════════ */

export type CategoryType = "business" | "landing" | "portfolio" | "webapp";

export interface Category {
  title: CategoryType;
  label: string;
  tagline: string;
}

const CATEGORIES: Category[] = [
  { title: "business", label: "Business Websites", tagline: "Corporate presence engineered to build trust" },
  { title: "landing", label: "Landing Pages", tagline: "Single-focus pages built to convert" },
  { title: "portfolio", label: "Portfolio Websites", tagline: "Visual-first sites that let the work speak" },
  { title: "webapp", label: "Web Applications", tagline: "Custom dashboards and product interfaces" },
];

export function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.02] px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#eb1b24]/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
      <span className="ml-3 truncate rounded-full bg-white/[0.04] px-3 py-0.5 font-mono text-[10px] text-white/35">
        {url}
      </span>
    </div>
  );
}

/* Abstract layout preview, unique per category — pure divs, no images. */
export function PreviewMock({ type }: { type: CategoryType }) {
  if (type === "business") {
    return (
      <div className="flex h-full flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="h-2 w-10 rounded-full bg-[#eb1b24]/60" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="h-1.5 w-7 rounded-full bg-white/15" />
            ))}
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-3">
          <div className="space-y-2">
            <span className="block h-2.5 w-4/5 rounded-full bg-white/20" />
            <span className="block h-2.5 w-3/5 rounded-full bg-white/20" />
            <span className="mt-3 block h-6 w-24 rounded-md bg-[#eb1b24]/50" />
          </div>
          <div className="rounded-lg bg-gradient-to-br from-[#eb1b24]/20 to-white/[0.04]" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="h-10 rounded-md bg-white/[0.05]" />
          ))}
        </div>
      </div>
    );
  }

  if (type === "landing") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-5 text-center sm:p-6">
        <span className="h-2 w-16 rounded-full bg-white/15" />
        <span className="h-4 w-3/4 rounded-full bg-white/25" />
        <span className="h-2.5 w-1/2 rounded-full bg-white/15" />
        <span className="mt-2 h-8 w-32 rounded-md bg-[#eb1b24]/60" />
        <div className="mt-4 flex gap-3 opacity-60">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-white/30" />
          ))}
        </div>
      </div>
    );
  }

  if (type === "portfolio") {
    return (
      <div className="grid h-full grid-cols-3 grid-rows-2 gap-2 p-5 sm:p-6">
        <div className="col-span-2 row-span-2 rounded-lg bg-gradient-to-br from-[#eb1b24]/20 to-white/[0.04]" />
        <div className="rounded-lg bg-white/[0.06]" />
        <div className="rounded-lg bg-white/[0.05]" />
      </div>
    );
  }

  /* webapp */
  return (
    <div className="flex h-full gap-3 p-5 sm:p-6">
      <div className="flex w-10 flex-col items-center gap-3 rounded-lg bg-white/[0.04] py-3">
        <span className="h-2 w-2 rounded-full bg-[#eb1b24]/70" />
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className="h-1.5 w-4 rounded-full bg-white/15" />
        ))}
      </div>
      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="h-8 rounded-md bg-white/[0.05]" />
          ))}
        </div>
        <div className="flex h-16 items-end gap-1.5 rounded-md bg-white/[0.03] p-2">
          {[40, 65, 30, 80, 55, 70, 45].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm bg-[#eb1b24]/50"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ category, delay, onOpen }: { category: Category; delay: number; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] text-left transition-colors duration-500 hover:border-[#eb1b24]/40 hover:shadow-[0_25px_80px_-20px_rgba(235,27,36,0.3)]"
    >
      {/* large preview */}
      <div className="aspect-video w-full overflow-hidden bg-[#0a0a0a]">
        <BrowserChrome url="trenexagency.com" />
        <div className="h-[calc(100%-2.5rem)] transition-transform duration-700 ease-out group-hover:scale-[1.02]">
          <PreviewMock type={category.title} />
        </div>
      </div>

      {/* label */}
      <div className="flex items-center justify-between p-6 sm:p-7">
        <div>
          <h3 className="text-xl font-semibold uppercase tracking-tight text-white sm:text-2xl">{category.label}</h3>
          <p className="mt-1.5 text-sm text-white/50">{category.tagline}</p>
        </div>
        <span
          aria-hidden
          className="hidden shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-500 group-hover:border-[#eb1b24]/50 group-hover:text-[#eb1b24] sm:flex sm:h-10 sm:w-10"
        >
          →
        </span>
      </div>
    </motion.button>
  );
}

export function WebDevPortfolio() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevItem = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + CATEGORIES.length) % CATEGORIES.length)),
    [],
  );
  const nextItem = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % CATEGORIES.length)),
    [],
  );

  return (
    <section id="services" className="relative w-full scroll-mt-24 overflow-hidden bg-[#050505]/75 px-5 py-16 sm:scroll-mt-28 sm:px-6 sm:py-20">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(235,27,36,0.065), transparent 70%)", filter: "blur(90px)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 flex flex-col items-start gap-4 sm:mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#eb1b24]">Featured Work</span>
          <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            Projects By Category
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {CATEGORIES.map((category, i) => (
            <CategoryCard
              key={category.title}
              category={category}
              delay={i * 0.1}
              onOpen={() => setLightboxIndex(i)}
            />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <ProjectLightbox
          items={CATEGORIES}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </section>
  );
}
