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

const PARTICLE_COUNT = 6;

interface OrbProps {
  id: string;
  label: string;
  href: string | null;
  disabled?: boolean;
  index: number;
}

function FloatOrb({ id, label, href, disabled, index }: OrbProps) {
  const Icon = ICONS[id];
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, p) => ({
        angle: (360 / PARTICLE_COUNT) * p + index * 13,
        delay: p * 0.08,
        distance: 26 + (p % 3) * 6,
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
    rotateY.set((px - 0.5) * 26);
    rotateX.set((0.5 - py) * 26);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const floatTransition = {
    duration: 3.2 + (index % 3) * 0.4,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut" as const,
    delay: index * 0.25,
  };

  const orb = (
    <motion.div
      className="relative"
      animate={{
        y: [0, -8, 0],
        rotateZ: [0, index % 2 === 0 ? 4 : -4, 0],
      }}
      transition={floatTransition}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        whileHover={disabled ? undefined : { scale: 1.18 }}
        whileTap={disabled ? undefined : { scale: 1.02 }}
        whileFocus={disabled ? undefined : { scale: 1.18 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 700,
        }}
        className={`group relative flex h-11 w-11 items-center justify-center rounded-2xl border backdrop-blur-xl transition-[border-color,background,box-shadow] duration-300 sm:h-12 sm:w-12 md:h-14 md:w-14 ${
          disabled
            ? "cursor-not-allowed border-white/10 bg-white/[0.03] opacity-40"
            : "cursor-pointer border-white/15 bg-white/[0.06] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)] hover:border-[#ff2b2b]/70 hover:bg-[#ff2b2b]/[0.08] hover:shadow-[0_0_16px_2px_rgba(255,43,43,0.55),0_0_46px_12px_rgba(255,43,43,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]"
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
              className="pointer-events-none absolute h-1 w-1 rounded-full bg-[#ff2b2b] opacity-0 group-hover:opacity-100"
              style={{
                left: "50%",
                top: "50%",
                boxShadow: "0 0 6px 2px rgba(255,43,43,0.9)",
              }}
              animate={{
                x: [0, Math.cos((particle.angle * Math.PI) / 180) * particle.distance],
                y: [0, Math.sin((particle.angle * Math.PI) / 180) * particle.distance],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeOut",
              }}
            />
          ))}

        <Icon
          className={`relative z-10 h-4 w-4 transition-all duration-300 sm:h-[1.1rem] sm:w-[1.1rem] md:h-5 md:w-5 ${
            disabled
              ? "text-white/30"
              : "text-white/75 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,43,43,0.95)]"
          }`}
          style={{ transform: "translateZ(18px)" }}
        />

        {disabled && (
          <span className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#0A0A0A]/95 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.15em] text-white/50 opacity-0 shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:block md:-left-2 md:translate-x-[-100%]">
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
        data-testid={`link-floating-social-${id}`}
        className="relative rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#ff2b2b]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
      >
        {orb}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-testid={`link-floating-social-${id}`}
      data-magnetic
      className="relative block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#ff2b2b]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
    >
      {orb}
    </a>
  );
}

export function FloatingSocial() {
  return (
    <>
      <div
        className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 sm:right-4 md:right-6 lg:flex"
        aria-label="Social media links"
      >
        {socialLinks.map((social, i) => (
          <FloatOrb
            key={social.id}
            id={social.id}
            label={social.label}
            href={social.href}
            disabled={social.disabled}
            index={i}
          />
        ))}
      </div>

      <div
        className="fixed inset-x-0 bottom-3 z-40 flex justify-center gap-2.5 sm:bottom-4 sm:gap-3 lg:hidden"
        aria-label="Social media links"
      >
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-xl sm:gap-3 sm:px-4">
          {socialLinks.map((social, i) => (
            <FloatOrb
              key={social.id}
              id={social.id}
              label={social.label}
              href={social.href}
              disabled={social.disabled}
              index={i}
            />
          ))}
        </div>
      </div>
    </>
  );
}
