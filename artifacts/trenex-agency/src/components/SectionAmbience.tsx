/**
 * SectionAmbience — pure-CSS layered ambient glow for individual sections.
 * Zero JS overhead, pointer-events-none, sits at z-0 inside the section.
 * Each variant has a unique composition so every section feels distinct.
 * Wrapped in React.memo — props never change after mount.
 */

import { memo } from "react";

type AmbienceVariant = "services" | "stats" | "expertise" | "contact" | "signature";

interface Props {
  variant: AmbienceVariant;
}

const configs: Record<
  AmbienceVariant,
  { top?: string; bottom?: string; left?: string; right?: string; center?: string; extra?: string }
> = {
  services: {
    left: "radial-gradient(ellipse 55% 55% at 0% 50%, rgba(235,27,36,0.09), transparent 65%)",
    top: "radial-gradient(ellipse 40% 35% at 75% 10%, rgba(235,27,36,0.05), transparent 60%)",
    bottom: "radial-gradient(ellipse 70% 30% at 50% 100%, rgba(235,27,36,0.04), transparent 70%)",
  },
  stats: {
    center: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(235,27,36,0.11), transparent 65%)",
    left: "radial-gradient(ellipse 35% 50% at 0% 30%, rgba(180,15,20,0.06), transparent 60%)",
    top: "radial-gradient(ellipse 50% 25% at 50% 0%, rgba(235,27,36,0.04), transparent 70%)",
  },
  expertise: {
    top: "radial-gradient(ellipse 50% 40% at 80% 0%, rgba(235,27,36,0.08), transparent 60%)",
    center: "radial-gradient(ellipse 45% 40% at 20% 60%, rgba(180,15,20,0.07), transparent 65%)",
    bottom: "radial-gradient(ellipse 80% 25% at 50% 100%, rgba(235,27,36,0.05), transparent 70%)",
  },
  contact: {
    center: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(235,27,36,0.13), transparent 60%)",
    top: "radial-gradient(ellipse 35% 30% at 15% 0%, rgba(235,27,36,0.06), transparent 65%)",
    right: "radial-gradient(ellipse 35% 30% at 100% 80%, rgba(180,15,20,0.06), transparent 65%)",
    bottom: "radial-gradient(ellipse 70% 30% at 50% 100%, rgba(235,27,36,0.07), transparent 70%)",
  },
  signature: {
    center: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(235,27,36,0.10), transparent 65%)",
    bottom: "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(235,27,36,0.08), transparent 70%)",
    top: "radial-gradient(ellipse 40% 30% at 50% 0%, rgba(100,8,12,0.06), transparent 70%)",
  },
};

export const SectionAmbience = memo(function SectionAmbience({ variant }: Props) {
  const c = configs[variant];

  const layers = [c.top, c.bottom, c.left, c.right, c.center, c.extra].filter(Boolean) as string[];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {layers.map((gradient) => (
        <div
          key={gradient}
          className="absolute inset-0"
          style={{ background: gradient }}
        />
      ))}

      {/* Subtle top-edge light seam — ties into section above */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#eb1b24]/15 to-transparent" />

      {/* Subtle bottom-edge light seam */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* Corner vignettes to prevent harsh edges against pure black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 60%, rgba(5,5,5,0.55) 100%)",
        }}
      />
    </div>
  );
});
