import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR = 'a, button, [data-cursor-hover], input, textarea, select';
const MAGNETIC_SELECTOR = "[data-magnetic]";
const MAX_BITS = 14;
const BIT_LIFETIME = 700;
const BIT_SPAWN_DISTANCE_SQ = 46 * 46; // squared — avoids sqrt per mousemove

interface Vec {
  x: number;
  y: number;
}

/**
 * Premium cyber-tech cursor — zero React state per animation frame.
 *
 * Performance optimisations vs previous version:
 * - `bits` are now DOM nodes created/removed directly (no setState → no React
 *   re-renders on every 46 px of mouse travel).
 * - `hovering` / `pressed` drive direct ref style mutations instead of state.
 * - The ring expand/collapse uses CSS transform:scale rather than
 *   width/height to stay on the compositor thread.
 * - A single `requestAnimationFrame` loop owns all per-frame updates.
 * - Squared-distance threshold check eliminates sqrt per mousemove.
 * - The cursor translate and scale are combined in a single transform
 *   string to avoid overwriting each other.
 */
export function CustomCursor() {
  const cursorRef    = useRef<HTMLDivElement>(null);
  const trailRefs    = useRef<Array<HTMLDivElement | null>>([]);
  const ringRef      = useRef<HTMLDivElement>(null);
  const bitsRef      = useRef<HTMLDivElement>(null);  // container for imperative bit nodes

  const [enabled, setEnabled] = useState(false);

  // All mutable state lives in refs — never triggers re-renders.
  const mouse        = useRef<Vec>({ x: -100, y: -100 });
  const eased        = useRef<Vec>({ x: -100, y: -100 });
  const trailPos     = useRef<Vec[]>([{ x: -100, y: -100 }, { x: -100, y: -100 }]);
  const magneticEl   = useRef<HTMLElement | null>(null);
  const lastSpawn    = useRef<Vec>({ x: -9999, y: -9999 });
  const bitCountRef  = useRef(0);
  const hoveringRef  = useRef(false);
  const pressedRef   = useRef(false);
  const scaleRef     = useRef(1);        // current lerped scale for press effect

  // ── Mouse / keyboard event listeners ──────────────────────────
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    function spawnBit(cx: number, cy: number) {
      const container = bitsRef.current;
      if (!container || bitCountRef.current >= MAX_BITS) return;

      const char = Math.random() > 0.5 ? "1" : "0";
      const jx   = cx + (Math.random() - 0.5) * 20;
      const jy   = cy + (Math.random() - 0.5) * 20;

      const wrapper = document.createElement("div");
      wrapper.className = "fixed left-0 top-0 pointer-events-none";
      wrapper.style.transform = `translate3d(${jx}px,${jy}px,0) translate(-50%,-50%)`;

      const span = document.createElement("span");
      span.className = "block select-none font-mono text-[10px] font-medium text-[#FF1F1F] animate-bit-fade";
      span.style.textShadow = "0 0 6px rgba(255,31,31,0.7)";
      span.textContent = char;

      wrapper.appendChild(span);
      container.appendChild(wrapper);
      bitCountRef.current++;

      window.setTimeout(() => {
        container.contains(wrapper) && container.removeChild(wrapper);
        bitCountRef.current = Math.max(0, bitCountRef.current - 1);
      }, BIT_LIFETIME);
    }

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Magnetic pull
      const magnet = magneticEl.current;
      if (magnet) {
        const r  = magnet.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) * 0.3;
        const dy = (e.clientY - (r.top  + r.height / 2)) * 0.3;
        magnet.style.transform = `translate3d(${dx}px,${dy}px,0)`;
      }

      // Bit spawn (squared-distance check — no sqrt)
      const sdx = e.clientX - lastSpawn.current.x;
      const sdy = e.clientY - lastSpawn.current.y;
      if (sdx * sdx + sdy * sdy > BIT_SPAWN_DISTANCE_SQ) {
        lastSpawn.current = { x: e.clientX, y: e.clientY };
        spawnBit(e.clientX, e.clientY);
      }
    };

    const handleDown = () => { pressedRef.current = true; };
    const handleUp   = () => { pressedRef.current = false; };
    const handleOut  = () => { mouse.current.x = -100; mouse.current.y = -100; };

    window.addEventListener("mousemove",   handleMove,     { passive: true });
    window.addEventListener("mousedown",   handleDown);
    window.addEventListener("mouseup",     handleUp);
    document.addEventListener("mouseleave", handleOut);

    return () => {
      window.removeEventListener("mousemove",   handleMove);
      window.removeEventListener("mousedown",   handleDown);
      window.removeEventListener("mouseup",     handleUp);
      document.removeEventListener("mouseleave", handleOut);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  // ── Hover / magnetic detection ─────────────────────────────────
  useEffect(() => {
    if (!enabled) return;

    const handleOver = (e: Event) => {
      const target = e.target as HTMLElement;
      const nowHovering = !!target.closest(HOVER_SELECTOR);

      if (nowHovering !== hoveringRef.current) {
        hoveringRef.current = nowHovering;

        // Ring: use scale rather than width/height for compositor-only change
        const ring = ringRef.current;
        if (ring) {
          ring.style.transform = ringRef.current!.style.transform; // keep translate
          ring.style.opacity   = nowHovering ? "1" : "0";
          ring.style.setProperty("--ring-scale", nowHovering ? "1" : "0");
        }

        // Cursor SVG glow — SVGElement has .style at runtime; cast via unknown to satisfy TS
        const svg = cursorRef.current?.querySelector("svg");
        if (svg) {
          (svg as unknown as HTMLElement).style.filter = nowHovering
            ? "drop-shadow(0 0 9px rgba(255,31,31,0.75)) drop-shadow(0 0 3px rgba(255,31,31,0.9))"
            : "drop-shadow(0 0 4px rgba(255,31,31,0.5))";
        }
      }

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
        magnetic.style.transition = "transform 0.4s cubic-bezier(0.25,1,0.5,1)";
        magnetic.style.transform  = "translate3d(0,0,0)";
        if (magneticEl.current === magnetic) magneticEl.current = null;
      }
    };

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout",  handleOut);
    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout",  handleOut);
    };
  }, [enabled]);

  // ── rAF animation loop ─────────────────────────────────────────
  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    const ease      = 0.22;
    const trailEase = 0.4;
    const SCALE_EASE = 0.18;

    const tick = () => {
      // Lerp eased cursor position
      eased.current.x += (mouse.current.x - eased.current.x) * ease;
      eased.current.y += (mouse.current.y - eased.current.y) * ease;

      // Lerp scale for press effect (avoids React state re-render)
      const targetScale = pressedRef.current ? 0.85 : 1;
      scaleRef.current += (targetScale - scaleRef.current) * SCALE_EASE;
      const sc = scaleRef.current;

      if (cursorRef.current) {
        // Combine translate + scale in one transform — no React involved
        cursorRef.current.style.transform =
          `translate3d(${eased.current.x}px,${eased.current.y}px,0) scale(${sc.toFixed(3)})`;
      }

      if (ringRef.current) {
        const s = hoveringRef.current ? 1 : 0;
        ringRef.current.style.transform =
          `translate3d(${eased.current.x}px,${eased.current.y}px,0) translate(-50%,-50%) scale(${s})`;
      }

      // Trail positions
      let tx = eased.current.x;
      let ty = eased.current.y;
      trailPos.current.forEach((pos, i) => {
        pos.x += (tx - pos.x) * trailEase;
        pos.y += (ty - pos.y) * trailEase;
        const el = trailRefs.current[i];
        if (el) el.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) translate(-50%,-50%)`;
        tx = pos.x; ty = pos.y;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999]" aria-hidden="true">
      {/* Bit particle container — populated imperatively (no React state) */}
      <div ref={bitsRef} className="pointer-events-none fixed inset-0" />

      {/* Trail dots */}
      {trailPos.current.map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="fixed left-0 top-0 rounded-full bg-[#FF1F1F]"
          style={{
            width:  3 - i * 0.8,
            height: 3 - i * 0.8,
            opacity: 0.35 - i * 0.12,
            willChange: "transform",
          }}
        />
      ))}

      {/* Hover ring — scale-based expand (compositor-only, no layout) */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0"
        style={{
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: "50%",
          border: "1px solid rgba(255,31,31,0.4)",
          opacity: 0,
          transform: "translate3d(-100px,-100px,0) translate(-50%,-50%) scale(0)",
          transition: "opacity 0.3s ease-out",
          willChange: "transform, opacity",
        }}
      />

      {/* Cursor arrow */}
      <div
        ref={cursorRef}
        className="fixed left-0 top-0"
        style={{ willChange: "transform" }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          style={{
            filter: "drop-shadow(0 0 4px rgba(255,31,31,0.5))",
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
