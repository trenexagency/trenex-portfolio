/**
 * useAssetProtection
 *
 * Mounts document-level listeners that provide lightweight deterrence:
 *   • Disables the browser context menu everywhere (right-click / long-press).
 *   • Blocks common developer-shortcut key combos.
 *   • Prevents <img> elements from being dragged (desktop + touch).
 *
 * This is deterrence-only — screenshots and DevTools remain accessible.
 * All listeners are passive-friendly where possible and are cleaned up on
 * unmount so there is zero memory leak.
 */

import { useEffect } from "react";

/** Returns true when the keyboard event matches a blocked shortcut. */
function isBlockedShortcut(e: KeyboardEvent): boolean {
  const ctrl  = e.ctrlKey || e.metaKey;
  const shift = e.shiftKey;
  const key   = e.key.toLowerCase();

  if (ctrl && !shift && key === "s")  return true; // Ctrl+S  — save page
  if (ctrl && !shift && key === "u")  return true; // Ctrl+U  — view source
  if (ctrl &&  shift && key === "i")  return true; // Ctrl+Shift+I — DevTools
  if (ctrl &&  shift && key === "c")  return true; // Ctrl+Shift+C — DevTools inspect
  if (e.key === "F12")                return true; // F12      — DevTools

  return false;
}

export function useAssetProtection(): void {
  useEffect(() => {
    /** Block right-click / long-press context menu globally. */
    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    /** Block developer keyboard shortcuts. */
    const onKeyDown = (e: KeyboardEvent) => {
      if (isBlockedShortcut(e)) e.preventDefault();
    };

    /**
     * Prevent images from being dragged (desktop drag-and-drop).
     * CSS `-webkit-user-drag: none` handles most cases; this JS handler
     * covers browsers that ignore the CSS property.
     */
    const onDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown",     onKeyDown);
    document.addEventListener("dragstart",   onDragStart);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown",     onKeyDown);
      document.removeEventListener("dragstart",   onDragStart);
    };
  }, []);
}
