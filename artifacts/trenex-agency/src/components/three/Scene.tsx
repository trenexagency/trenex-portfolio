import { Suspense, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { CAMERA_DEFAULTS, DPR } from "@/lib/three-config";

interface SceneProps {
  children: ReactNode;
  className?: string;
}

/**
 * Shared Canvas wrapper for all React Three Fiber scenes.
 * Individual 3D compositions should be built as children and
 * placed inside sections via this wrapper.
 */
export function Scene({ children, className }: SceneProps) {
  return (
    <Canvas
      className={className}
      dpr={DPR}
      camera={CAMERA_DEFAULTS}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
