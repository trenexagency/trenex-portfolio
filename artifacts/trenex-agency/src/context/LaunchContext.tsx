import { createContext, useContext } from "react";

/**
 * Global launch phase — controls deferred mounting of expensive components
 * so the loading → hero transition never drops frames on low-end devices.
 *
 *  0  loading screen visible
 *  1  hero text content mounted   (~2 rAFs after onEnter — hero layout paints first)
 *  2  HeroVisual mounted          (150 ms later — SVG logo + HUD rings)
 *  3  Hero particles + indicator  (280 ms later)
 *  4  below-fold sections         (600 ms later — Services → Footer)
 */
export const LaunchContext = createContext(0);

/** Read the current launch phase inside any component. */
export const useLaunchPhase = () => useContext(LaunchContext);
