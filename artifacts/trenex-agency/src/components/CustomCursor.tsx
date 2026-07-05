import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR = 'a, button, [data-cursor-hover], input, textarea, select';
const MAGNETIC_SELECTOR = "[data-magnetic]";
const TRAIL_LENGTH = 6;

interface Vec {
  x: number;
  y: number;
}

/**
 * Fully custom cursor system — no third-party cursor libraries.
 * - Hides the native cursor (only on fine-pointer/mouse devices).
 * - Small solid dot tracks the raw pointer position 1:1.
 * - Outer glow ring eases toward the pointer (manual lerp in a rAF loop).
 * - A short trail of fading particles chases the ring for a "red energy" feel.
 * - Hovering interactive elements expands the ring.
 * - Elements with `data-magnetic` pull toward the cursor when nearby.
 * All position updates are applied directly to DOM refs (no per-frame React
 * state) to keep this smooth even on lower-end devices.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const mouse = useRef<Vec>({ x: -100, y: -100 });
  const ring = useRef<Vec>({ x: -100, y: -100 });
  const trailPositions = useRef<Vec[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 })),
  );
  const magneticEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      const magnet = magneticEl.current;
      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.35;
        const dy = (e.clientY - cy) * 0.35;
        magnet.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);
    const handleLeaveWindow = () => {
      mouse.current.x = -100;
      mouse.current.y = -100;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeaveWindow);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleOver = (e: Event) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest(HOVER_SELECTOR));

      const magnetic = target.closest(MAGNETIC_SELECTOR) as HTMLElement | null;
      if (magnetic && magneticEl.current !== magnetic) {
        magnetic.style.transition = "transform 0.15s ease-out";
        magneticEl.current = magnetic;
      }
    };

    const handleOut = (e: Event) => {
      const target = e.target as HTMLElement;
      const magnetic = target.closest(MAGNETIC_SELECTOR) as HTMLElement | null;
      if (magnetic) {
        magnetic.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
        magnetic.style.transform = "translate3d(0, 0, 0)";
        if (magneticEl.current === magnetic) magneticEl.current = null;
      }
    };

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    const ringEase = 0.18;
    const trailEase = 0.32;

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * ringEase;
      ring.current.y += (mouse.current.y - ring.current.y) * ringEase;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      let targetX = ring.current.x;
      let targetY = ring.current.y;

      trailPositions.current.forEach((pos, i) => {
        pos.x += (targetX - pos.x) * trailEase;
        pos.y += (targetY - pos.y) * trailEase;

        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
        }

        targetX = pos.x;
        targetY = pos.y;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999]" aria-hidden="true">
      {trailPositions.current.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          className="fixed left-0 top-0 rounded-full bg-[#FF1F1F]"
          style={{
            width: 6 - i * 0.6,
            height: 6 - i * 0.6,
            opacity: 0.4 - i * 0.055,
            filter: "blur(0.5px)",
            willChange: "transform",
          }}
        />
      ))}

      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full border transition-[width,height,border-color,background-color,box-shadow] duration-300 ease-out"
        style={{
          width: hovering ? 68 : pressed ? 26 : 42,
          height: hovering ? 68 : pressed ? 26 : 42,
          borderColor: hovering ? "#FF1F1F" : "rgba(255,31,31,0.55)",
          backgroundColor: hovering ? "rgba(255,31,31,0.12)" : "transparent",
          boxShadow: hovering
            ? "0 0 34px 8px rgba(255,31,31,0.45), 0 0 70px 18px rgba(255,31,31,0.2)"
            : "0 0 18px 3px rgba(255,31,31,0.35)",
          willChange: "transform, width, height",
        }}
      />

      <div
        ref={dotRef}
        className="fixed left-0 top-0 rounded-full bg-[#FF1F1F] transition-[width,height] duration-200 ease-out"
        style={{
          width: pressed ? 11 : hovering ? 4 : 6,
          height: pressed ? 11 : hovering ? 4 : 6,
          boxShadow: "0 0 10px 2px rgba(255,31,31,0.85)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
