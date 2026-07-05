/**
 * Cheap feature-detection for WebGL support. Some environments (sandboxed
 * browsers, disabled GPU, restrictive corporate policies) cannot create a
 * WebGL context — in those cases the 3D ambient background should be
 * skipped entirely rather than crash the page.
 */
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}
