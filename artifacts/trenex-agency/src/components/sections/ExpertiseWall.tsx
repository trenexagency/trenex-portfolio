import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { SiFigma, SiDavinciresolve, SiHtml5, SiCss, SiJavascript, SiReact, SiNodedotjs, SiGithub } from "react-icons/si";
import {
  PhotoshopIcon,
  IllustratorIcon,
  IndesignIcon,
  PremiereIcon,
  AfterEffectsIcon,
  CapCutIcon,
} from "@/components/icons/BrandIcons";
import { expertise, type ExpertiseTool } from "@/data/site";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  photoshop: PhotoshopIcon,
  illustrator: IllustratorIcon,
  figma: SiFigma,
  indesign: IndesignIcon,
  premiere: PremiereIcon,
  aftereffects: AfterEffectsIcon,
  davinci: SiDavinciresolve,
  capcut: CapCutIcon,
  html5: SiHtml5,
  css3: SiCss,
  javascript: SiJavascript,
  react: SiReact,
  nodejs: SiNodedotjs,
  github: SiGithub,
};

interface ToolCardProps {
  tool: ExpertiseTool;
  index: number;
}

function ToolCard({ tool, index }: ToolCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = ICONS[tool.icon];

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { stiffness: 180, damping: 16, mass: 0.4 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);
  const glowX = useTransform(mouseX, (v) => `${v * 100}%`);
  const glowY = useTransform(mouseY, (v) => `${v * 100}%`);
  const glowBackground = useMotionTemplate`radial-gradient(160px circle at ${glowX} ${glowY}, rgba(255,31,31,0.28), transparent 70%)`;

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mouseX.set(px);
    mouseY.set(py);
    rotateY.set((px - 0.5) * 18);
    rotateX.set((0.5 - py) * 18);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: "easeOut" }}
      style={{ perspective: 900 }}
      className="group relative"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3 + (index % 4) * 0.3,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: (index % 5) * 0.2,
        }}
      >
        <motion.div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          tabIndex={0}
          role="group"
          aria-label={`${tool.name} — ${tool.description}`}
          data-testid={`card-expertise-${tool.icon}`}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{ scale: 1.04 }}
          whileFocus={{ scale: 1.04 }}
          className="relative flex h-32 flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] px-3 py-5 outline-none backdrop-blur-md transition-[border-color,box-shadow] duration-500 focus-visible:ring-2 focus-visible:ring-[#FF1F1F]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] group-hover:border-[#FF1F1F]/50 group-hover:shadow-[0_20px_60px_-16px_rgba(255,31,31,0.4)] sm:h-36"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glowBackground }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF1F1F]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-30"
            style={{
              background:
                "linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.5) 45%, rgba(255,31,31,0.4) 55%, transparent 80%)",
            }}
          />

          <div
            style={{ transform: "translateZ(30px)" }}
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-500 group-hover:border-[#FF1F1F]/50 group-hover:bg-[#FF1F1F]/10 group-hover:text-[#FF1F1F] group-hover:shadow-[0_0_22px_rgba(255,31,31,0.5)] sm:h-12 sm:w-12"
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>

          <span
            style={{ transform: "translateZ(20px)" }}
            className="relative text-center text-xs font-medium uppercase tracking-[0.12em] text-white/70 transition-colors duration-500 group-hover:text-white sm:text-sm"
          >
            {tool.name}
          </span>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent px-3 pb-3 pt-8 text-center opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
          >
            <span className="text-[0.65rem] leading-snug text-white/70 sm:text-xs">
              {tool.description}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function ExpertiseWall() {
  return (
    <motion.section
      id="expertise"
      className="relative w-full overflow-hidden bg-[#050505] px-5 py-20 sm:px-6 sm:py-28 md:py-32"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-[#FF1F1F]/[0.05] blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14 flex flex-col items-start gap-4 sm:mb-20"
        >
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#FF1F1F]">
            Our Arsenal
          </span>
          <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            Expertise Wall
          </h2>
          <p className="max-w-xl text-sm text-white/45 md:text-base">
            The premium software and technologies our team masters to design, produce, and engineer
            world-class digital work.
          </p>
        </motion.div>

        <div className="flex flex-col gap-14 sm:gap-16">
          {expertise.map((category, ci) => (
            <div key={category.title}>
              <motion.span
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-5 block font-mono text-xs uppercase tracking-[0.35em] text-white/40 sm:mb-6"
              >
                {category.title}
              </motion.span>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4">
                {category.tools.map((tool, ti) => (
                  <ToolCard key={tool.name} tool={tool} index={ci * 4 + ti} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
