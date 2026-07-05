import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { PointLight } from "three";

/**
 * Dim ambient red wash + a single slowly-pulsing point light. Keeps the
 * scene feeling alive without any per-frame geometry work.
 */
export function AmbientRedLighting() {
  const lightRef = useRef<PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    const t = state.clock.getElapsedTime();
    lightRef.current.intensity = 1.6 + Math.sin(t * 0.5) * 0.5;
  });

  return (
    <>
      <ambientLight intensity={0.22} color="#FF3B3B" />
      <pointLight ref={lightRef} position={[2, 1.2, 3]} color="#FF1F1F" intensity={1.8} distance={12} />
      <pointLight position={[-3, -1.5, -2]} color="#FF1F1F" intensity={0.6} distance={10} />
    </>
  );
}
