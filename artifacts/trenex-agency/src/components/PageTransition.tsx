import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "wouter";
import logoUrl from "@assets/Trenex_Logo_1783845866953.svg";

/* ══════════════════════════════════════════════════════
   CINEMATIC PAGE TRANSITION
   A short (~1s), premium intro that plays when navigating
   to an internal page via `navigateWithTransition`:
   dark fade → red glow + Trenex logo → subtle scan sweep →
   reveal the new page underneath.
══════════════════════════════════════════════════════ */

interface TransitionContextValue {
  navigateWithTransition: (path: string) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useTransitionNavigate(): TransitionContextValue["navigateWithTransition"] {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransitionNavigate must be used within a TransitionProvider");
  return ctx.navigateWithTransition;
}

/* Timings tuned so the whole sequence lands close to ~1s total. */
const SWITCH_ROUTE_AT_MS = 480; // swap the route while the overlay is still fully opaque
const OVERLAY_TOTAL_MS = 1050; // overlay stays mounted this long, then unmounts

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();
  const [active, setActive] = useState(false);
  const timers = useRef<number[]>([]);

  const navigateWithTransition = useCallback(
    (path: string) => {
      setActive(true);
      const switchTimer = window.setTimeout(() => setLocation(path), SWITCH_ROUTE_AT_MS);
      const endTimer = window.setTimeout(() => setActive(false), OVERLAY_TOTAL_MS);
      timers.current.push(switchTimer, endTimer);
    },
    [setLocation],
  );

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      {active && <CinematicOverlay />}
    </TransitionContext.Provider>
  );
}

function CinematicOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-[#050505]"
      style={{ animation: "tx-overlay-fade 1050ms ease-in-out forwards" }}
    >
      {/* faint scanline texture for a "digital" feel */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px)",
        }}
      />

      {/* moving scan beam sweeping through the frame */}
      <div
        className="absolute left-0 h-24 w-full"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(235,27,36,0.18) 50%, transparent)",
          animation: "tx-scan-sweep 1050ms ease-in-out forwards",
        }}
      />

      {/* red cinematic glow behind the logo */}
      <div
        className="absolute h-64 w-64 rounded-full sm:h-80 sm:w-80"
        style={{
          background: "radial-gradient(circle, rgba(235,27,36,0.55), transparent 68%)",
          filter: "blur(22px)",
          animation: "tx-glow-pulse 1050ms ease-out forwards",
        }}
      />

      {/* Trenex logo mark */}
      <img
        src={logoUrl}
        alt=""
        className="relative h-20 w-20 object-contain sm:h-24 sm:w-24"
        style={{
          filter: "drop-shadow(0 0 22px rgba(235,27,36,0.6))",
          animation: "tx-logo-pop 1050ms cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      />
    </div>
  );
}
