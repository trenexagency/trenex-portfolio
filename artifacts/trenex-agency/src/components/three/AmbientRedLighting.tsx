import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { AmbientLight, PointLight } from "three";
import { scrollProgress } from "@/lib/scrollProgress";

/**
 * Dim ambient red wash + a pulsing key light and a secondary rim light.
 * Both build in intensity as the user scrolls deeper into the page, so
 * later sections feel progressively more charged/atmospheric rather than
 * visually identical to the top of the page. Still just two lights and a
 * scalar update per frame — no added geometry cost.
 */
export function AmbientRedLighting() {
  const lightRef = useRef<PointLight>(null);
  const rimRef = useRef<PointLight>(null);
  const ambientRef = useRef<AmbientLight>(null);
  const eased = useRef(0);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    eased.current += (scrollProgress.value - eased.current) * 0.05;
    const scroll = eased.current;

    if (lightRef.current) {
      lightRef.current.intensity = 1.6 + Math.sin(t * 0.5) * 0.5 + scroll * 1.2;
    }
    if (rimRef.current) {
      rimRef.current.intensity = 0.6 + scroll * 1.6;
    }
    if (ambientRef.current) {
      ambientRef.current.intensity = 0.22 + scroll * 0.18;
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.22} color="#FF3B3B" />
      <pointLight ref={lightRef} position={[2, 1.2, 3]} color="#FF1F1F" intensity={1.8} distance={12} />
      <pointLight ref={rimRef} position={[-3, -1.5, -2]} color="#FF1F1F" intensity={0.6} distance={10} />
    </>
  );
}
