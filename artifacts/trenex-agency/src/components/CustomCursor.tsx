import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR = 'a, button, [data-cursor-hover], input, textarea, select';
const MAGNETIC_SELECTOR = "[data-magnetic]";
const MAX_BITS = 14;
const BIT_LIFETIME = 700;
const BIT_SPAWN_DISTANCE = 46;

interface Vec {
  x: number;
  y: number;
}

interface Bit {
  id: number;
  x: number;
  y: number;
  char: "0" | "1";
  born: number;
}

/**
 * Premium cyber-tech cursor — no third-party libraries.
 * - Keeps a recognizable arrow silhouette (custom SVG), not a dot/orb.
 * - The arrow eases toward the raw pointer position (small lerp lag) for a
 *   smooth, weighted feel rather than 1:1 gaming snap.
 * - A very small (2-point) fading trail, subtle at all times.
 * - A faint red glow behind the arrow that intensifies slightly on hover.
 * - Hovering interactive elements adds a soft outline ring; `data-magnetic`
 *   elements pull toward the cursor.
 * - Tiny binary digits ("0"/"1") spawn sparsely while moving and fade out
 *   quickly — a restrained nod to a "hacker interface" rather than a
 *   particle shower.
 * All position updates go straight to DOM refs (no per-frame React state)
 * to stay smooth on lower-end devices.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<Array<HTMLDivElement | null>>([]);
  const ringRef = useRef<HTMLDivElement>(null);

  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [bits, setBits] = useState<Bit[]>([]);

  const mouse = useRef<Vec>({ x: -100, y: -100 });
  const eased = useRef<Vec>({ x: -100, y: -100 });
  const trailPositions = useRef<Vec[]>([
    { x: -100, y: -100 },
    { x: -100, y: -100 },
  ]);
  const magneticEl = useRef<HTMLElement | null>(null);
  const lastBitSpawn = useRef<Vec>({ x: -9999, y: -9999 });
  const bitIdRef = useRef(0);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const magnet = magneticEl.current;
      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.3;
        const dy = (e.clientY - cy) * 0.3;
        magnet.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }

      const dx = e.clientX - lastBitSpawn.current.x;
      const dy = e.clientY - lastBitSpawn.current.y;
      if (dx * dx + dy * dy > BIT_SPAWN_DISTANCE * BIT_SPAWN_DISTANCE) {
        lastBitSpawn.current = { x: e.clientX, y: e.clientY };
        const id = bitIdRef.current++;
        const char: "0" | "1" = Math.random() > 0.5 ? "1" : "0";
        const jitterX = e.clientX + (Math.random() - 0.5) * 20;
        const jitterY = e.clientY + (Math.random() - 0.5) * 20;
        setBits((prev) => {
          const next = [...prev, { id, x: jitterX, y: jitterY, char, born: performance.now() }];
          return next.length > MAX_BITS ? next.slice(next.length - MAX_BITS) : next;
        });
        window.setTimeout(() => {
          setBits((prev) => prev.filter((b) => b.id !== id));
        }, BIT_LIFETIME);
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
    const ease = 0.22;
    const trailEase = 0.4;

    const tick = () => {
      eased.current.x += (mouse.current.x - eased.current.x) * ease;
      eased.current.y += (mouse.current.y - eased.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${eased.current.x}px, ${eased.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${eased.current.x}px, ${eased.current.y}px, 0) translate(-50%, -50%)`;
      }

      let targetX = eased.current.x;
      let targetY = eased.current.y;

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
            width: 3 - i * 0.8,
            height: 3 - i * 0.8,
            opacity: 0.35 - i * 0.12,
            willChange: "transform",
          }}
        />
      ))}

      {bits.map((bit) => (
        <div
          key={bit.id}
          className="fixed left-0 top-0"
          style={{ transform: `translate3d(${bit.x}px, ${bit.y}px, 0) translate(-50%, -50%)` }}
        >
          <span
            className="block select-none font-mono text-[10px] font-medium text-[#FF1F1F] animate-bit-fade"
            style={{ textShadow: "0 0 6px rgba(255,31,31,0.7)" }}
          >
            {bit.char}
          </span>
        </div>
      ))}

      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full border transition-[width,height,opacity] duration-300 ease-out"
        style={{
          width: hovering ? 40 : 0,
          height: hovering ? 40 : 0,
          borderColor: "rgba(255,31,31,0.4)",
          opacity: hovering ? 1 : 0,
        }}
      />

      <div
        ref={cursorRef}
        className="fixed left-0 top-0 transition-transform duration-150 ease-out"
        style={{
          willChange: "transform",
          transform: `scale(${pressed ? 0.85 : 1})`,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          style={{
            filter: hovering
              ? "drop-shadow(0 0 9px rgba(255,31,31,0.75)) drop-shadow(0 0 3px rgba(255,31,31,0.9))"
              : "drop-shadow(0 0 4px rgba(255,31,31,0.5))",
            transition: "filter 0.25s ease-out",
          }}
        >
          <path
            d="M2 1.5L17 9.5L10.2 11L7.5 18L2 1.5Z"
            fill="#0A0A0A"
            stroke="#FF1F1F"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
