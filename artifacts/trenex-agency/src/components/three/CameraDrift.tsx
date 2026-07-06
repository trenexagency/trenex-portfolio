import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { scrollProgress } from "@/lib/scrollProgress";

/**
 * Slow, subtle autonomous camera drift so the scene never feels static,
 * blended with a soft parallax offset that follows the pointer, plus a
 * scroll-driven push that carries the camera deeper into the particle
 * field as the page scrolls — the "flying through a digital world" cue.
 * All amplitudes stay small and are eased so the motion always reads as
 * ambience, never as a jump-cut.
 */
export function CameraDrift() {
  const pointer = useRef({ x: 0, y: 0 });
  const eased = useRef({ x: 0, y: 0 });
  const easedScroll = useRef(0);

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
    easedScroll.current += (scrollProgress.value - easedScroll.current) * 0.06;

    const scroll = easedScroll.current;

    state.camera.position.x = Math.sin(t * 0.08) * 0.6 + eased.current.x * 0.4;
    state.camera.position.y =
      Math.cos(t * 0.06) * 0.35 - eased.current.y * 0.25 - scroll * 0.5;
    state.camera.position.z = 5 - scroll * 3.2;
    state.camera.rotation.z = scroll * 0.035;
    state.camera.lookAt(0, -scroll * 0.4, -scroll * 2);
  });

  return null;
}
