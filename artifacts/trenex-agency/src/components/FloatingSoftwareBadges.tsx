import { PhotoshopIcon, IllustratorIcon, CanvaIcon } from "@/components/icons/BrandIcons";
import { SiFigma, SiCoreldraw } from "react-icons/si";

/**
 * Small glass "badge" cards that float very slowly around the hero.
 * Pure CSS animation (translateY only) — no bounce, no spin, no flashing,
 * no particles. Positioned outside the hero's central text column so the
 * icons never overlap the headline/copy, and hidden below `lg` where
 * there isn't enough side margin to avoid overlap.
 */
const BADGES = [
  { name: "Photoshop", Icon: PhotoshopIcon, className: "left-[3%] top-[18%] sf-float-a" },
  { name: "Illustrator", Icon: IllustratorIcon, className: "right-[4%] top-[14%] sf-float-b" },
  { name: "Figma", Icon: SiFigma, className: "left-[6%] top-[74%] sf-float-c" },
  { name: "Canva", Icon: CanvaIcon, className: "right-[5%] top-[72%] sf-float-d" },
  { name: "CorelDRAW", Icon: SiCoreldraw, className: "left-[50%] top-[8%] sf-float-e" },
];

export function FloatingSoftwareBadges() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] hidden lg:block"
    >
      {BADGES.map(({ name, Icon, className }) => (
        <div
          key={name}
          className={`absolute flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 backdrop-blur-md shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6)] ${className}`}
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
