import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Cheap "volumetric fog" impression: a couple of large soft-edged sprites
 * (radial gradient generated on a canvas at runtime — no image assets)
 * drifting slowly behind the particle field. Additive blending gives a
 * glowing red haze without any real volumetric lighting cost.
 */
function useGlowTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2,
      );
      gradient.addColorStop(0, "rgba(255,31,31,0.55)");
      gradient.addColorStop(0.5, "rgba(255,31,31,0.18)");
      gradient.addColorStop(1, "rgba(255,31,31,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

export function VolumetricFog() {
  const texture = useGlowTexture();
  const spriteA = useRef<THREE.Sprite>(null);
  const spriteB = useRef<THREE.Sprite>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (spriteA.current) {
      spriteA.current.position.set(Math.sin(t * 0.05) * 2, Math.cos(t * 0.04) * 1.2, -6);
      const material = spriteA.current.material as THREE.SpriteMaterial;
      material.opacity = 0.35 + Math.sin(t * 0.3) * 0.1;
    }
    if (spriteB.current) {
      spriteB.current.position.set(Math.cos(t * 0.035) * -2.4, Math.sin(t * 0.045) * -1, -7.5);
      const material = spriteB.current.material as THREE.SpriteMaterial;
      material.opacity = 0.25 + Math.cos(t * 0.25) * 0.08;
    }
  });

  return (
    <>
      <sprite ref={spriteA} scale={[14, 14, 1]} position={[0, 0, -6]}>
        <spriteMaterial
          map={texture}
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      <sprite ref={spriteB} scale={[11, 11, 1]} position={[-2, -1, -7.5]}>
        <spriteMaterial
          map={texture}
          transparent
          opacity={0.25}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </>
  );
}
