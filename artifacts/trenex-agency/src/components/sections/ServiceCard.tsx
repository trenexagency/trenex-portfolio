import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Service } from "@/data/site";
import { useTransitionNavigate } from "@/components/PageTransition";

interface ServiceCardProps {
  service: Service;
  icon: ReactNode;
  delay: number;
}

const ROTATE_RANGE = 10;

export function ServiceCard({ service, icon, delay }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement & HTMLAnchorElement>(null);
  const navigateWithTransition = useTransitionNavigate();
  const internalPath = service.internalPath;

  // Cards without an internalPath (e.g. Graphic Design, Web Development) are
  // real anchor elements pointing at service.href, opened in a new tab so the
  // homepage stays put — this makes the ENTIRE card a native link container
  // (works with click, middle-click, ctrl/cmd-click, "open in new tab", etc.)
  // instead of relying on a synthetic window.open() call.
  const isNewTabLink = !internalPath && !!service.href;

  const handleCardClick = () => {
    if (internalPath) {
      navigateWithTransition(internalPath, service.transitionVariant);
    }
  };

  const isInteractive = !!internalPath || isNewTabLink;
  const CardTag = isNewTabLink ? motion.a : motion.div;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);
  const glowX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const glowXPercent = useTransform(glowX, (value) => `${value * 100}%`);
  const glowYPercent = useTransform(glowY, (value) => `${value * 100}%`);

  const glowBackground = useMotionTemplate`radial-gradient(280px circle at ${glowXPercent} ${glowYPercent}, rgba(255,31,31,0.22), transparent 65%)`;

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement & HTMLAnchorElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    mouseX.set(px);
    mouseY.set(py);
    rotateY.set((px - 0.5) * ROTATE_RANGE);
    rotateX.set((0.5 - py) * ROTATE_RANGE);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
      className="group relative"
    >
      <CardTag
        ref={cardRef as never}
        href={isNewTabLink ? service.href : undefined}
        target={isNewTabLink ? "_blank" : undefined}
        rel={isNewTabLink ? "noopener noreferrer" : undefined}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={internalPath ? handleCardClick : undefined}
        role={!isNewTabLink && isInteractive ? "button" : undefined}
        tabIndex={!isNewTabLink && isInteractive ? 0 : undefined}
        onKeyDown={
          !isNewTabLink && isInteractive
            ? (e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick();
                }
              }
            : undefined
        }
        data-testid={`card-service-${service.index}`}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-[border-color,box-shadow] duration-500 group-hover:border-[#FF1F1F]/50 group-hover:shadow-[0_25px_80px_-20px_rgba(255,31,31,0.35)] sm:min-h-[24rem] sm:p-8 md:p-10 ${isInteractive ? "cursor-pointer" : ""}`}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glowBackground }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: "radial-gradient(circle, rgba(255,31,31,0.35), transparent 70%)" }}
        />

        <div style={{ transform: "translateZ(40px)" }} className="relative flex items-start justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-white/30 transition-colors duration-500 group-hover:text-[#FF1F1F]">
            {service.index} / {service.tagline}
          </span>
          <span className="font-mono text-4xl font-light text-white/10 transition-colors duration-500 group-hover:text-[#FF1F1F]/40">
            {service.index}
          </span>
        </div>

        <div style={{ transform: "translateZ(60px)" }} className="relative mt-8 sm:mt-10">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#FF1F1F] transition-all duration-500 group-hover:scale-110 group-hover:border-[#FF1F1F]/40 group-hover:bg-[#FF1F1F]/10 group-hover:shadow-[0_0_30px_rgba(255,31,31,0.35)] sm:mb-6 sm:h-16 sm:w-16">
            {icon}
          </div>

          <h3 className="mb-3 text-2xl font-semibold leading-tight tracking-tight text-white sm:mb-4 sm:text-3xl md:text-4xl">
            {service.title}
          </h3>
          <p className="max-w-xs text-sm leading-relaxed text-white/55 md:text-base md:leading-[1.65]">
            {service.description}
          </p>
        </div>

        <div style={{ transform: "translateZ(30px)" }} className="relative mt-10 flex flex-wrap gap-2">
          {service.capabilities.map((capability) => (
            <span
              key={capability}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-white/40 transition-colors duration-500 group-hover:border-[#FF1F1F]/30 group-hover:text-white/70"
            >
              {capability}
            </span>
          ))}
        </div>

        <div style={{ transform: "translateZ(20px)" }} className="relative mt-8">
          {internalPath ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              data-testid={`link-service-${service.index}`}
              className="flex items-center gap-3 text-sm font-medium text-white/40 transition-colors duration-500 group-hover:text-[#FF1F1F]"
            >
              <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
              <span className="uppercase tracking-[0.2em]">Explore Service</span>
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                &rarr;
              </span>
            </button>
          ) : isNewTabLink ? (
            // The whole card is already the <a> element (see CardTag above),
            // so this is a plain visual affordance, not a nested link —
            // nesting an <a> inside an <a> is invalid HTML and would break
            // the card-wide click target.
            <span
              data-testid={`link-service-${service.index}`}
              className="flex items-center gap-3 text-sm font-medium text-white/40 transition-colors duration-500 group-hover:text-[#FF1F1F]"
            >
              <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
              <span className="uppercase tracking-[0.2em]">Explore Service</span>
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                &rarr;
              </span>
            </span>
          ) : (
            <div className="flex items-center gap-3 text-sm font-medium text-white/40 transition-colors duration-500 group-hover:text-[#FF1F1F]">
              <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
              <span className="uppercase tracking-[0.2em]">Explore Service</span>
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                &rarr;
              </span>
            </div>
          )}
        </div>
      </CardTag>
    </motion.div>
  );
}
