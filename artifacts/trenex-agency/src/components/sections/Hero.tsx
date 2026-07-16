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
  const nearLayerRef = useRef<HTMLDivElement>(null);
  const particlesFarRef = useRef<HTMLDivElement>(null);
  const particlesMidRef = useRef<HTMLDivElement>(null);
  const particlesNearRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!window.matchMedia("(pointer: fine)").matches) return;

    // gsap.quickTo() creates a reusable tween function — calling it on every
    // pointermove only updates the target value instead of spawning a new
    // tween each time, which was the main perf cost of the previous approach.
    const qFarX  = gsap.quickTo(farLayerRef.current,      "x", { duration: 1.8, ease: "power3.out" });
    const qFarY  = gsap.quickTo(farLayerRef.current,      "y", { duration: 1.8, ease: "power3.out" });
    const qMidX  = gsap.quickTo(midLayerRef.current,      "x", { duration: 1.4, ease: "power3.out" });
    const qMidY  = gsap.quickTo(midLayerRef.current,      "y", { duration: 1.4, ease: "power3.out" });
    const qPFarX = gsap.quickTo(particlesFarRef.current,  "x", { duration: 1.9, ease: "power3.out" });
    const qPFarY = gsap.quickTo(particlesFarRef.current,  "y", { duration: 1.9, ease: "power3.out" });
    const qPMidX = gsap.quickTo(particlesMidRef.current,  "x", { duration: 1.5, ease: "power3.out" });
    const qPMidY = gsap.quickTo(particlesMidRef.current,  "y", { duration: 1.5, ease: "power3.out" });
    const qPNrX  = gsap.quickTo(particlesNearRef.current, "x", { duration: 1.1, ease: "power3.out" });
    const qPNrY  = gsap.quickTo(particlesNearRef.current, "y", { duration: 1.1, ease: "power3.out" });
    const qGlowX = gsap.quickTo(glowRef.current,          "x", { duration: 1.1, ease: "power3.out" });
    const qGlowY = gsap.quickTo(glowRef.current,          "y", { duration: 1.1, ease: "power3.out" });
    const qHeadX = gsap.quickTo(headlineRef.current,      "x", { duration: 1.2, ease: "power3.out" });
    const qHeadY = gsap.quickTo(headlineRef.current,      "y", { duration: 1.2, ease: "power3.out" });

    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      qFarX(x * 18);  qFarY(y * 12);
      qMidX(x * 32);  qMidY(y * 20);
      qPFarX(x * 10); qPFarY(y * 6);
      qPMidX(x * 24); qPMidY(y * 16);
      qPNrX(x * 48);  qPNrY(y * 30);
      qGlowX(x * 55); qGlowY(y * 35);
      qHeadX(x * 14); qHeadY(y * 8);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-5 py-28 text-center sm:px-6 sm:py-32"
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

        {/* volumetric red fog — slow independent drift, soft-edged */}
        <motion.div
          className="absolute h-[80vw] w-[80vw] rounded-full bg-[#FF1F1F]/[0.05] mix-blend-screen blur-[130px]"
          style={{ top: "5%", left: "50%", translateX: "-50%" }}
          animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
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

      {/* background depth particles — slowest, sharpest, furthest */}
      <div ref={particlesFarRef} className="contents">
        <Particles count={60} sizeRange={[1, 2]} className="opacity-70" />
      </div>
      {/* midground particles — moderate parallax */}
      <div ref={particlesMidRef} className="contents">
        <Particles count={28} sizeRange={[2, 4]} className="opacity-55" />
      </div>
      {/* foreground soft-focus embers — nearest, largest, most parallax */}
      <div ref={particlesNearRef} className="contents">
        <Particles count={12} sizeRange={[4, 7]} blurPx={2.5} className="opacity-45" />
      </div>

      <motion.span
        className="relative mb-5 flex items-center gap-2.5 font-mono text-[0.65rem] uppercase tracking-[0.4em] text-white/50 sm:mb-6 sm:text-xs"
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF1F1F] shadow-[0_0_10px_rgba(255,31,31,0.8)]" />
        {siteConfig.subheadline}
      </motion.span>

      <h1
        ref={headlineRef}
        className="relative max-w-5xl text-[2.5rem] font-semibold uppercase leading-[1.05] tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-[10rem]"
      >
        <motion.span
          className="block"
          initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          We Build Digital
        </motion.span>
        <motion.span
          className="block text-[#FF1F1F]"
          initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            textShadow: [
              "0 0 24px rgba(255,31,31,0.35)",
              "0 0 48px rgba(255,31,31,0.65)",
              "0 0 24px rgba(255,31,31,0.35)",
            ],
          }}
          transition={{
            opacity: { duration: 1.1, delay: 0.32, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 1.1, delay: 0.32, ease: [0.16, 1, 0.3, 1] },
            filter: { duration: 1.1, delay: 0.32, ease: [0.16, 1, 0.3, 1] },
            textShadow: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
          }}
        >
          Experiences.
        </motion.span>
      </h1>

      <motion.p
        className="relative mt-10 max-w-xl text-balance text-base text-white/60 md:text-lg"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        {siteConfig.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
        className="relative mt-10 flex w-full flex-col items-center gap-4 sm:mt-12 sm:w-auto sm:flex-row sm:gap-5"
      >
        <a
          href="#contact"
          data-testid="link-start-project"
          data-magnetic
          className="group inline-flex w-full items-center justify-center gap-3 bg-[#FF1F1F] px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.25em] text-[#050505] transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,31,31,0.55)] sm:w-auto"
        >
          <span>Start a Project</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </a>

        <a
          href="#services"
          data-testid="link-view-services"
          data-magnetic
          className="group inline-flex w-full items-center justify-center gap-3 border border-white/20 px-9 py-3.5 text-sm font-medium uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-[#FF1F1F] hover:text-[#FF1F1F] hover:shadow-[0_0_24px_rgba(255,31,31,0.25)] sm:w-auto"
        >
          <span>View Services</span>
          <span className="transition-transform duration-300 group-hover:translate-y-1">
            &darr;
          </span>
        </a>
      </motion.div>

      <motion.div
        className="relative mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.85, ease: "easeOut" }}
      >
        {services.map((service, i) => (
          <span
            key={service.title}
            className="flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-white/50 sm:text-xs"
          >
            {i > 0 && <span className="h-1 w-1 rounded-full bg-[#FF1F1F]" />}
            {service.title}
          </span>
        ))}
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
