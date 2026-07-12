import { motion } from "framer-motion";

/* ══════════════════════════════════════════════════════
   TECH SHOWCASE
   Purely visual — reinforces the Web Development theme
   with a code editor, terminal, browser mockup, and UI
   wireframe. Not a services/process section: no copy about
   what we do, just craft signals. Lightweight (pure CSS/SVG
   divs, no images), subtle motion only on scroll-in.
══════════════════════════════════════════════════════ */

const CARD_FADE = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function CardChrome({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={CARD_FADE}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] transition-colors duration-500 hover:border-[#eb1b24]/30"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#eb1b24]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-2 truncate font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{label}</span>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </motion.div>
  );
}

/* 1. Code editor snippet */
function CodeSnippetCard() {
  return (
    <CardChrome label="Hero.tsx">
      <div className="font-mono text-[11px] leading-[1.9] sm:text-[12px]">
        <p><span className="text-white/30">1</span><span className="ml-4 text-[#eb1b24]">export</span> <span className="text-[#eb1b24]">function</span> <span className="text-white">Hero</span><span className="text-white/50">()</span> {"{"}</p>
        <p><span className="text-white/30">2</span><span className="ml-4 pl-4 text-[#eb1b24]">return</span> <span className="text-white/50">(</span></p>
        <p><span className="text-white/30">3</span><span className="ml-4 pl-8 text-white/50">&lt;</span><span className="text-white">section</span> <span className="text-white/40">className</span><span className="text-white/50">=</span><span className="text-white/60">"hero"</span><span className="text-white/50">&gt;</span></p>
        <p><span className="text-white/30">4</span><span className="ml-4 pl-12 text-white/50">&lt;</span><span className="text-white">h1</span><span className="text-white/50">&gt;</span><span className="text-white/70">Trenex</span><span className="text-white/50">&lt;/</span><span className="text-white">h1</span><span className="text-white/50">&gt;</span></p>
        <p><span className="text-white/30">5</span><span className="ml-4 pl-8 text-white/50">&lt;/</span><span className="text-white">section</span><span className="text-white/50">&gt;</span></p>
        <p><span className="text-white/30">6</span><span className="ml-4 pl-4 text-white/50">)</span></p>
        <p><span className="text-white/30">7</span><span className="ml-4 text-white/50">{"}"}</span></p>
      </div>
    </CardChrome>
  );
}

/* 2. Terminal / build output */
function TerminalCard() {
  return (
    <CardChrome label="zsh — trenex">
      <div className="font-mono text-[11px] leading-[1.9] text-white/55 sm:text-[12px]">
        <p><span className="text-[#eb1b24]">$</span> npm run build</p>
        <p><span className="text-[#eb1b24]">✓</span> compiled successfully</p>
        <p><span className="text-[#eb1b24]">$</span> deploy --prod</p>
        <p><span className="text-[#eb1b24]">✓</span> live at trenexagency.com</p>
        <p className="flex items-center gap-1">
          <span className="text-[#eb1b24]">$</span>
          <span className="inline-block h-3.5 w-[7px] animate-pulse bg-white/50" />
        </p>
      </div>
    </CardChrome>
  );
}

/* 3. Browser window mockup — abstract layout, no real content */
function BrowserMockupCard() {
  return (
    <CardChrome label="trenexagency.com">
      <div className="space-y-3">
        {/* nav */}
        <div className="flex items-center justify-between">
          <span className="h-2 w-8 rounded-full bg-[#eb1b24]/60" />
          <div className="flex gap-2">
            <span className="h-1.5 w-6 rounded-full bg-white/15" />
            <span className="h-1.5 w-6 rounded-full bg-white/15" />
            <span className="h-1.5 w-6 rounded-full bg-white/15" />
          </div>
        </div>
        {/* hero block */}
        <div className="h-14 rounded-lg bg-gradient-to-br from-[#eb1b24]/20 to-white/[0.03]" />
        {/* grid of 3 */}
        <div className="grid grid-cols-3 gap-2">
          <span className="h-8 rounded-md bg-white/[0.05]" />
          <span className="h-8 rounded-md bg-white/[0.05]" />
          <span className="h-8 rounded-md bg-white/[0.05]" />
        </div>
      </div>
    </CardChrome>
  );
}

/* 4. UI wireframe — outline-only layout skeleton */
function WireframeCard() {
  return (
    <CardChrome label="wireframe.fig">
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-md border border-white/15 px-3 py-2">
          <span className="h-2 w-10 rounded-full border border-white/20" />
          <span className="h-2 w-2 rounded-full border border-[#eb1b24]/50" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1 h-20 rounded-md border border-white/15" />
          <div className="col-span-2 space-y-2 rounded-md border border-white/15 p-2">
            <span className="block h-1.5 w-3/4 rounded-full border border-white/20" />
            <span className="block h-1.5 w-1/2 rounded-full border border-white/20" />
            <span className="block h-1.5 w-2/3 rounded-full border border-white/20" />
          </div>
        </div>
      </div>
    </CardChrome>
  );
}

export function TechShowcase() {
  return (
    <section className="relative w-full overflow-hidden bg-[#050505] px-5 py-16 sm:px-6 sm:py-20">
      {/* subtle development grid backdrop, scoped to this section only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 48 0 L 0 0 0 48' fill='none' stroke='rgba(255%2C255%2C255%2C0.04)' stroke-width='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 80% at 50% 50%, black 30%, transparent 90%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 flex flex-col items-start gap-4 sm:mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#eb1b24]">Built With Code</span>
          <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            From Wireframe To Production
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.12 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <CodeSnippetCard />
          <TerminalCard />
          <BrowserMockupCard />
          <WireframeCard />
        </motion.div>
      </div>
    </section>
  );
}
