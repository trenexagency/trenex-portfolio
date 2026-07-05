import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  spread?: number;
  size?: number;
  color?: string;
  opacity?: number;
  rotationSpeed?: number;
}

/**
 * Lightweight instanced point cloud drifting slowly in 3D space.
 * Rotation is applied to the whole group rather than per-vertex updates,
 * keeping this cheap even at higher counts.
 */
export function ParticleField({
  count = 260,
  spread = 9,
  size = 0.045,
  color = "#FF3B3B",
  opacity = 0.55,
  rotationSpeed = 0.015,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread * 2;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread * 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    return arr;
  }, [count, spread]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * rotationSpeed;
    pointsRef.current.rotation.x += delta * rotationSpeed * 0.35;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={opacity}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}
