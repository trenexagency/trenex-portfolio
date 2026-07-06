import { Suspense, useEffect, useState } from "react";
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
 */
export function AmbientBackground() {
  const [webglSupported, setWebglSupported] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
    return initScrollProgressTracking();
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsSmallScreen(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsSmallScreen(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const dpr: [number, number] = isSmallScreen ? [1, 1.5] : DPR;
  const primaryCount = isSmallScreen ? 110 : 220;
  const secondaryCount = isSmallScreen ? 35 : 70;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-[#050505]">
      {webglSupported && (
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
