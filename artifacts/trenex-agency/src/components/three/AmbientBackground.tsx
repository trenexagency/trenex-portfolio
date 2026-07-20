import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CAMERA_DEFAULTS, DPR } from "@/lib/three-config";
import { isWebGLAvailable } from "@/lib/webgl";
import { initScrollProgressTracking } from "@/lib/scrollProgress";
import { ParticleField } from "./ParticleField";
import { CameraDrift } from "./CameraDrift";
import { AmbientRedLighting } from "./AmbientRedLighting";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { VolumetricFog } from "./VolumetricFog";
import { ScrollDepthLayers } from "./ScrollDepthLayers";
import { useLaunchPhase } from "@/context/LaunchContext";

/**
 * Persistent full-page 3D backdrop: a dark, sparse particle field with slow
 * autonomous camera drift and dim red ambient light. Sits fixed behind all
 * page content (z-0) — sections must use transparent/translucent
 * backgrounds for it to be visible through them. Deliberately lightweight:
 * one Canvas, no shadows/postprocessing, small particle counts, no
 * per-vertex updates.
 *
 * Degrades gracefully (renders nothing but the flat dark background) when
 * WebGL is unavailable, so the site never crashes on restrictive devices.
 *
 * Performance:
 * - WebGL Canvas is NOT initialised while the loading screen is showing
 *   (phase 0). This prevents Three.js from competing with the GSAP loading
 *   screen animation for GPU time, making the loading screen smoother.
 * - Canvas is skipped entirely for prefers-reduced-motion users.
 * - DPR is capped at 1 on mobile; particle counts are halved.
 */
export function AmbientBackground() {
  const phase = useLaunchPhase();

  const [webglSupported, setWebglSupported] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  /*
   * Skip animated WebGL canvas for users who prefer reduced motion.
   * Evaluated once — this preference does not change mid-session.
   */
  const prefersReduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  /*
   * Gate WebGL initialisation on phase >= 1 (loading screen has exited).
   * Using a ref guard so the effect body only executes once even though
   * `phase` is in the dependency array and could trigger re-runs.
   */
  const webglInitialized = useRef(false);

  useEffect(() => {
    if (phase < 1 || webglInitialized.current) return;
    webglInitialized.current = true;
    setWebglSupported(isWebGLAvailable());
    return initScrollProgressTracking();
  }, [phase]);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsSmallScreen(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsSmallScreen(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const dpr: [number, number] = isSmallScreen ? [1, 1] : DPR;
  /* Reduced particle counts on mobile — smaller canvas + fewer GPU draws */
  const primaryCount   = isSmallScreen ? 60  : 220;
  const secondaryCount = isSmallScreen ? 15  : 70;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-[#050505]">
      {/*
       * Canvas only mounts once phase >= 1 AND WebGL is confirmed available
       * AND the user has not requested reduced motion.
       */}
      {phase >= 1 && webglSupported && !prefersReduced && (
        <CanvasErrorBoundary>
          <Canvas
            dpr={dpr}
            camera={CAMERA_DEFAULTS}
            gl={{ antialias: false, alpha: true, failIfMajorPerformanceCaveat: false }}
          >
            <Suspense fallback={null}>
              <CameraDrift />
              <AmbientRedLighting />
              <VolumetricFog />
              <ParticleField count={primaryCount} spread={8} size={0.05} opacity={0.55} rotationSpeed={0.015} />
              <ParticleField
                count={secondaryCount}
                spread={11}
                size={0.03}
                color="#FFFFFF"
                opacity={0.18}
                rotationSpeed={0.008}
              />
              <ScrollDepthLayers />
            </Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      )}
    </div>
  );
}
