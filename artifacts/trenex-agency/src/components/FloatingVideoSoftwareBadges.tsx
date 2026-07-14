import { PremiereIcon, AfterEffectsIcon, CapCutIcon } from "@/components/icons/BrandIcons";
import { SiDavinciresolve } from "react-icons/si";

/**
 * Small glass "badge" cards that float very slowly around the Video
 * Editing hero — same pattern as FloatingSoftwareBadges/FloatingTechBadges,
 * tuned for the editing-tool icon set. Pure CSS animation (translateY only)
 * — no bounce, no spin, no flashing, no particles. Positioned outside the
 * hero's central text column so the icons never overlap the headline/copy,
 * and hidden below `lg` where there isn't enough side margin to avoid
 * overlap.
 */
const BADGES = [
  { name: "Premiere Pro", Icon: PremiereIcon, className: "left-[3%] top-[18%] sf-float-a" },
  { name: "After Effects", Icon: AfterEffectsIcon, className: "right-[4%] top-[14%] sf-float-b" },
  { name: "DaVinci Resolve", Icon: SiDavinciresolve, className: "left-[6%] top-[74%] sf-float-c" },
  { name: "CapCut", Icon: CapCutIcon, className: "right-[5%] top-[72%] sf-float-d" },
];

export function FloatingVideoSoftwareBadges() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] hidden lg:block"
    >
      {BADGES.map(({ name, Icon, className }) => (
        <div
          key={name}
          className={`absolute flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 backdrop-blur-md shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6),0_0_20px_-6px_rgba(235,27,36,0.35)] ${className}`}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-[#eb1b24]/85">
            <Icon className="h-3.5 w-3.5" />
          </span>
          <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}
