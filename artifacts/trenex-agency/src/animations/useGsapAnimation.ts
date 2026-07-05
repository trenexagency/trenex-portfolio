import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Runs a GSAP animation scoped to a ref's DOM subtree.
 * Automatically reverts all tweens/ScrollTriggers on unmount.
 */
export function useGsapAnimation<T extends HTMLElement = HTMLDivElement>(
  callback: (context: gsap.Context, scope: React.RefObject<T | null>) => void,
  deps: React.DependencyList = [],
) {
  const scope = useRef<T>(null);

  useEffect(() => {
    const ctx = gsap.context(() => callback(ctx, scope), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
