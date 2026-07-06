import { useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa6";
import { socialLinks } from "@/data/site";

const ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
  email: FaEnvelope,
};

const PARTICLE_COUNT = 5;

interface IconTileProps {
  id: string;
  label: string;
  href: string | null;
  disabled?: boolean;
  index: number;
}

function IconTile({ id, label, href, disabled, index }: IconTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = ICONS[id];

  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, p) => ({
        angle: (360 / PARTICLE_COUNT) * p + index * 17,
        delay: p * 0.09,
        distance: 24 + (p % 3) * 6,
      })),
    [index],
  );

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 24);
    rotateX.set((0.5 - py) * 24);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const floatTransition = {
    duration: 2.6 + (index % 3) * 0.35,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut" as const,
    delay: index * 0.22,
  };

  const content = (
    <motion.div
      className="relative"
      animate={{ y: [0, -7, 0] }}
      transition={floatTransition}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        whileHover={disabled ? undefined : { scale: 1.12 }}
        whileTap={disabled ? undefined : { scale: 0.96 }}
        whileFocus={disabled ? undefined : { scale: 1.12 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 600 }}
        className={`group relative flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-xl transition-[border-color,background,box-shadow] duration-300 sm:h-14 sm:w-14 ${
          disabled
            ? "cursor-not-allowed border-white/10 bg-white/[0.03] opacity-50"
            : "cursor-pointer border-white/15 bg-white/[0.06] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-[#FF1F1F]/70 hover:bg-[#FF1F1F]/[0.08] hover:shadow-[0_0_16px_2px_rgba(255,31,31,0.5),0_0_44px_12px_rgba(255,31,31,0.28),inset_0_1px_0_rgba(255,255,255,0.18)]"
        }`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 via-transparent to-black/20"
        />

        {!disabled &&
          particles.map((particle, p) => (
            <motion.span
              key={p}
              aria-hidden
              className="pointer-events-none absolute h-1 w-1 rounded-full bg-[#FF1F1F] opacity-0 group-hover:opacity-100"
              style={{ left: "50%", top: "50%", boxShadow: "0 0 6px 2px rgba(255,31,31,0.9)" }}
              animate={{
                x: [0, Math.cos((particle.angle * Math.PI) / 180) * particle.distance],
                y: [0, Math.sin((particle.angle * Math.PI) / 180) * particle.distance],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 1.1, repeat: Infinity, delay: particle.delay, ease: "easeOut" }}
            />
          ))}

        <Icon
          className={`relative z-10 h-5 w-5 transition-all duration-300 sm:h-[1.35rem] sm:w-[1.35rem] ${
            disabled
              ? "text-white/30"
              : "text-white/75 group-hover:text-white group-hover:drop-shadow-[0_0_9px_rgba(255,31,31,0.9)]"
          }`}
          style={{ transform: "translateZ(20px)" }}
        />

        {disabled && (
          <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#0A0A0A] px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.15em] text-white/50 opacity-0 shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            Coming Soon
          </span>
        )}
      </motion.div>
    </motion.div>
  );

  if (disabled || !href) {
    return (
      <div
        role="button"
        aria-disabled="true"
        aria-label={`${label} — coming soon`}
        tabIndex={0}
        data-testid={`link-social-${id}`}
        className="relative rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#FF1F1F]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-testid={`link-social-${id}`}
      data-magnetic
      className="relative block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#FF1F1F]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
    >
      {content}
    </a>
  );
}

export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex flex-wrap items-center justify-center gap-4 sm:gap-5 ${className}`}>
      {socialLinks.map((social, i) => (
        <IconTile
          key={social.id}
          id={social.id}
          label={social.label}
          href={social.href}
          disabled={social.disabled}
          index={i}
        />
      ))}
    </div>
  );
}
