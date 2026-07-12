import { SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss } from "react-icons/si";

/**
 * Small glassmorphism "badge" cards that float very slowly around the Web
 * Development hero — same pattern as FloatingSoftwareBadges, tuned for the
 * dev-stack icon set. Pure CSS animation (translateY only) — no spin, no
 * bounce, no flashing. Positioned outside the hero's central text column so
 * icons never overlap the headline/copy, and hidden below `lg` where there
 * isn't enough side margin to avoid overlap.
 */
const BADGES = [
  { name: "HTML5", Icon: SiHtml5, className: "left-[4%] top-[16%] sf-float-a" },
  { name: "CSS3", Icon: SiCss, className: "right-[4%] top-[14%] sf-float-b" },
  { name: "JavaScript", Icon: SiJavascript, className: "left-[6%] top-[76%] sf-float-c" },
  { name: "React", Icon: SiReact, className: "right-[5%] top-[74%] sf-float-d" },
  { name: "Next.js", Icon: SiNextdotjs, className: "left-[50%] top-[6%] sf-float-e" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, className: "left-[50%] top-[88%] sf-float-f" },
];

export function FloatingTechBadges() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] hidden lg:block">
      {BADGES.map(({ name, Icon, className }) => (
        <div
          key={name}
          className={`absolute flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2.5 backdrop-blur-md shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6),0_0_20px_-6px_rgba(235,27,36,0.35)] ${className}`}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-[#eb1b24]/85">
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
