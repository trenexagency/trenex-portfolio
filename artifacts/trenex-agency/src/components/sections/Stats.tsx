import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionAmbience } from "@/components/SectionAmbience";

interface StatDef {
  end: number;
  decimals: number;
  suffix: string;
  label: string;
  sub: string;
  index: string;
}

const STATS: StatDef[] = [
  {
    end: 300,
    decimals: 0,
    suffix: "+",
    label: "Projects Delivered",
    sub: "Across design, video & web",
    index: "01",
  },
  {
    end: 180,
    decimals: 0,
    suffix: "+",
    label: "Happy Clients",
    sub: "Worldwide, across industries",
    index: "02",
  },
  {
    end: 3,
    decimals: 0,
    suffix: "+",
    label: "Years Experience",
    sub: "In brand & creative production",
    index: "03",
  },
  {
    end: 4.9,
    decimals: 1,
    suffix: "/5",
    label: "Client Satisfaction",
    sub: "Average rating, every project",
    index: "04",
  },
];

const ROTATE_RANGE = 8;

interface StatCardProps {
  stat: StatDef;
  delay: number;
  counterRef: (el: HTMLSpanElement | null) => void;
}

function StatCard({ stat, delay, counterRef }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springCfg = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useMotionValue(0), springCfg);
  const rotateY = useSpring(useMotionValue(0), springCfg);
  const glowX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const glowXPct = useTransform(glowX, (v) => `${v * 100}%`);
  const glowYPct = useTransform(glowY, (v) => `${v * 100}%`);
  const glowBg = useMotionTemplate`radial-gradient(240px circle at ${glowXPct} ${glowYPct}, rgba(255,31,31,0.2), transparent 65%)`;

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
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
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative flex h-full min-h-[18rem] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-[border-color,box-shadow] duration-500 group-hover:border-[#FF1F1F]/50 group-hover:shadow-[0_25px_80px_-20px_rgba(255,31,31,0.35)] sm:p-8"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glowBg }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: "radial-gradient(circle, rgba(255,31,31,0.3), transparent 70%)" }}
        />
        <div style={{ transform: "translateZ(20px)" }} className="relative flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-white/25 transition-colors duration-500 group-hover:text-[#FF1F1F]/70">
            {stat.index}
          </span>
          <span className="font-mono text-4xl font-light text-white/[0.05] transition-colors duration-500 group-hover:text-[#FF1F1F]/20">
            {stat.index}
          </span>
        </div>
        <div style={{ transform: "translateZ(50px)" }} className="relative mt-6">
          <div className="mb-4 h-px w-10 bg-[#FF1F1F]/60 transition-all duration-500 group-hover:w-16 group-hover:bg-[#FF1F1F]" />
          <div className="flex items-baseline gap-0.5 leading-none">
            <span className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
              <span ref={counterRef}>0</span>
            </span>
            <span className="ml-0.5 text-3xl font-semibold text-[#FF1F1F] sm:text-4xl">
              {stat.suffix}
            </span>
          </div>
        </div>
        <div style={{ transform: "translateZ(35px)" }} className="relative mt-6">
          <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-white sm:text-lg">
            {stat.label}
          </h3>
          <p className="mt-1.5 font-mono text-xs leading-relaxed text-white/35 transition-colors duration-500 group-hover:text-white/55">
            {stat.sub}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      STATS.forEach((stat, i) => {
        const el = counterRefs.current[i];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.end,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
          onUpdate() {
            el.textContent = obj.val.toFixed(stat.decimals);
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="stats"
      className="relative w-full overflow-hidden bg-[#050505]/75 px-5 py-20 sm:px-6 sm:py-28 md:py-32"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
    >
      <SectionAmbience variant="stats" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 flex flex-col items-start gap-4 sm:mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#FF1F1F]">
            By The Numbers
          </span>
          <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            Proven Results
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-white/45 md:text-base">
            Numbers that reflect our commitment to excellence, consistency, and client success across every engagement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              delay={i * 0.12}
              counterRef={(el) => { counterRefs.current[i] = el; }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
