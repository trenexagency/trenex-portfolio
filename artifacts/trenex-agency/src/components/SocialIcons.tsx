import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

interface IconTileProps {
  id: string;
  label: string;
  href: string | null;
  disabled?: boolean;
}

function IconTile({ id, label, href, disabled }: IconTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = ICONS[id];

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { stiffness: 200, damping: 16, mass: 0.4 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);
  const glowX = useTransform(mouseX, (v) => `${v * 100}%`);
  const glowY = useTransform(mouseY, (v) => `${v * 100}%`);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mouseX.set(px);
    mouseY.set(py);
    rotateY.set((px - 0.5) * 22);
    rotateX.set((0.5 - py) * 22);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  const content = (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 600 }}
      whileHover={disabled ? undefined : { scale: 1.08 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      className={`group relative flex h-12 w-12 items-center justify-center rounded-xl border transition-colors duration-300 sm:h-14 sm:w-14 ${
        disabled
          ? "cursor-not-allowed border-white/10 bg-white/[0.02] opacity-50"
          : "border-white/10 bg-white/[0.03] hover:border-[#FF1F1F]/60"
      }`}
    >
      {!disabled && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(60px circle at ${glowX} ${glowY}, rgba(255,31,31,0.45), transparent 70%)`,
          }}
        />
      )}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-md transition-opacity duration-500 ${
          disabled ? "" : "group-hover:opacity-70"
        }`}
        style={{ boxShadow: "0 0 24px 4px rgba(255,31,31,0.55)" }}
      />
      <Icon
        className={`relative z-10 h-5 w-5 transition-all duration-300 sm:h-[1.35rem] sm:w-[1.35rem] ${
          disabled
            ? "text-white/30"
            : "text-white/70 group-hover:text-[#FF1F1F] group-hover:drop-shadow-[0_0_8px_rgba(255,31,31,0.85)]"
        }`}
        style={{ transform: "translateZ(20px)" }}
      />

      {disabled && (
        <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#0A0A0A] px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.15em] text-white/50 opacity-0 shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          Coming Soon
        </span>
      )}
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
        className="relative outline-none focus-visible:ring-2 focus-visible:ring-[#FF1F1F]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] rounded-xl"
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
      className="relative block outline-none focus-visible:ring-2 focus-visible:ring-[#FF1F1F]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] rounded-xl"
    >
      {content}
    </a>
  );
}

export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 ${className}`}>
      {socialLinks.map((social) => (
        <IconTile
          key={social.id}
          id={social.id}
          label={social.label}
          href={social.href}
          disabled={social.disabled}
        />
      ))}
    </div>
  );
}
