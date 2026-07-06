import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CAMERA_DEFAULTS, DPR } from "@/lib/three-config";
import { isWebGLAvailable } from "@/lib/webgl";
import { ParticleField } from "./ParticleField";
import { CameraDrift } from "./CameraDrift";
import { AmbientRedLighting } from "./AmbientRedLighting";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { VolumetricFog } from "./VolumetricFog";

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

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-[#050505]">
      {webglSupported && (
        <CanvasErrorBoundary>
          <Canvas
            dpr={DPR}
            camera={CAMERA_DEFAULTS}
            gl={{ antialias: false, alpha: true, failIfMajorPerformanceCaveat: false }}
          >
            <Suspense fallback={null}>
              <CameraDrift />
              <AmbientRedLighting />
              <VolumetricFog />
              <ParticleField count={220} spread={8} size={0.05} opacity={0.55} rotationSpeed={0.015} />
              <ParticleField
                count={70}
                spread={11}
                size={0.03}
                color="#FFFFFF"
                opacity={0.18}
                rotationSpeed={0.008}
              />
            </Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      )}
    </div>
  );
}
