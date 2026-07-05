import { useFrame } from "@react-three/fiber";

/**
 * Slow, subtle autonomous camera drift so the scene never feels static.
 * Small amplitude on purpose — this should read as ambience, not motion.
 */
export function CameraDrift() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    state.camera.position.x = Math.sin(t * 0.08) * 0.6;
    state.camera.position.y = Math.cos(t * 0.06) * 0.35;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}
