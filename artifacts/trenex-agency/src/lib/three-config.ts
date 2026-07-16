export const CAMERA_DEFAULTS = {
  fov: 45,
  near: 0.1,
  far: 100,
  position: [0, 0, 5] as [number, number, number],
};

// Cap at 1.5× on desktop — the background canvas is sparse particles and fog;
// rendering at native 2× Retina doubles GPU fragment work for imperceptible gain.
export const DPR: [number, number] = [1, 1.5];
