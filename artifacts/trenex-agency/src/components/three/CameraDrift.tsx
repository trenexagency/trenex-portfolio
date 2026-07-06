import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Slow, subtle autonomous camera drift so the scene never feels static,
 * blended with a soft parallax offset that follows the pointer. Both
 * amplitudes stay small on purpose — this should read as ambience, not
 * motion. Pointer influence is smoothed (lerped) so it never feels jumpy.
 */
export function CameraDrift() {
  const pointer = useRef({ x: 0, y: 0 });
  const eased = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    eased.current.x += (pointer.current.x - eased.current.x) * 0.03;
    eased.current.y += (pointer.current.y - eased.current.y) * 0.03;

    state.camera.position.x = Math.sin(t * 0.08) * 0.6 + eased.current.x * 0.4;
    state.camera.position.y = Math.cos(t * 0.06) * 0.35 - eased.current.y * 0.25;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}
