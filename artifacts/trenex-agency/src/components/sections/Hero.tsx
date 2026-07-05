import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Particles } from "@/components/Particles";
import { gsap } from "@/lib/gsap";
import { siteConfig, services } from "@/data/site";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const farLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handlePointerMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(farLayerRef.current, {
        x: x * 18,
        y: y * 12,
        duration: 1.8,
        ease: "power3.out",
      });

      gsap.to(midLayerRef.current, {
        x: x * 32,
        y: y * 20,
        duration: 1.4,
        ease: "power3.out",
      });

      gsap.to(glowRef.current, {
        x: x * 55,
        y: y * 35,
        duration: 1.1,
        ease: "power3.out",
      });

      gsap.to(headlineRef.current, {
        x: x * 14,
        y: y * 8,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505] px-6 text-center"
    >
      {/* Cinematic depth background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* far depth layer — slow, subtle drift */}
        <div
          ref={farLayerRef}
          className="absolute -inset-1/3 opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(255,31,31,0.10), transparent 55%), radial-gradient(circle at 75% 80%, rgba(255,31,31,0.08), transparent 50%)",
          }}
        />

        {/* mid depth layer — moderate parallax */}
        <div
          ref={midLayerRef}
          className="absolute -inset-1/4 opacity-50 blur-2xl"
          style={{
            background:
              "radial-gradient(circle at 55% 40%, rgba(255,31,31,0.14), transparent 45%)",
          }}
        />

        {/* drifting fog — independent of pointer, slow ambient motion */}
        <motion.div
          className="absolute h-[70vw] w-[70vw] rounded-full bg-white/[0.035] mix-blend-screen blur-[110px]"
          style={{ top: "-15%", left: "-20%" }}
          animate={{ x: [0, 60, -20, 0], y: [0, 30, -10, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute h-[55vw] w-[55vw] rounded-full bg-[#FF1F1F]/[0.06] mix-blend-screen blur-[100px]"
          style={{ bottom: "-20%", right: "-15%" }}
          animate={{ x: [0, -50, 20, 0], y: [0, -25, 15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* dynamic pulsing light behind content */}
        <motion.div
          ref={glowRef}
          className="absolute inset-0"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(255,31,31,0.22), transparent 55%)",
          }}
        />

        {/* cinematic vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,#050505_92%)]" />

      {/* near soft-focus embers for depth-of-field */}
      <Particles count={16} sizeRange={[3, 6]} blurPx={2} className="opacity-50" />
      {/* sharp far field particles */}
      <Particles count={55} />

      <motion.span
        className="relative mb-6 font-mono text-xs uppercase tracking-[0.4em] text-[#FF1F1F]"
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {siteConfig.name}
      </motion.span>

      <h1
        ref={headlineRef}
        className="relative max-w-4xl text-5xl font-semibold uppercase leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl"
      >
        <motion.span
          className="block"
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
        >
          We Build Digital
        </motion.span>
        <motion.span
          className="block text-[#FF1F1F]"
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.32, ease: "easeOut" }}
        >
          Experiences.
        </motion.span>
      </h1>

      <motion.p
        className="relative mt-8 max-w-xl text-balance text-base text-white/60 md:text-lg"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        {siteConfig.description}
      </motion.p>

      <motion.div
        className="relative mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
      >
        {services.map((service, i) => (
          <span
            key={service.title}
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-white/50"
          >
            {i > 0 && <span className="h-1 w-1 rounded-full bg-[#FF1F1F]" />}
            {service.title}
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="relative mt-12"
      >
        <a
          href="#services"
          data-testid="link-view-services"
          className="group inline-flex items-center gap-3 border border-white/20 px-8 py-3 text-sm font-medium uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-[#FF1F1F] hover:text-[#FF1F1F] hover:shadow-[0_0_24px_rgba(255,31,31,0.25)]"
        >
          <span>View Services</span>
          <span className="transition-transform duration-300 group-hover:translate-y-1">
            &darr;
          </span>
        </a>
      </motion.div>

      <motion.div
        className="absolute bottom-10 h-14 w-px bg-gradient-to-b from-white/40 to-transparent"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
      />
    </section>
  );
}
