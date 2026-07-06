import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scrollProgress";

interface LayerConfig {
  count: number;
  spread: number;
  size: number;
  color: string;
  baseOpacity: number;
  z: number;
  parallax: number;
  spin: number;
}

const LAYERS: LayerConfig[] = [
  { count: 90, spread: 6, size: 0.035, color: "#FF3B3B", baseOpacity: 0.5, z: -2, parallax: 2.2, spin: 0.02 },
  { count: 60, spread: 9, size: 0.05, color: "#FFFFFF", baseOpacity: 0.22, z: -5, parallax: 3.6, spin: -0.012 },
  { count: 40, spread: 4, size: 0.06, color: "#FF1F1F", baseOpacity: 0.4, z: 1.5, parallax: -1.4, spin: 0.03 },
];

function DepthLayer({ config }: { config: LayerConfig }) {
  const pointsRef = useRef<THREE.Points>(null);
  const eased = useRef(0);

  const positions = useMemo(() => {
    const arr = new Float32Array(config.count * 3);
    for (let i = 0; i < config.count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * config.spread * 2;
      arr[i * 3 + 1] = (Math.random() - 0.5) * config.spread * 2;
      arr[i * 3 + 2] = config.z + (Math.random() - 0.5) * config.spread;
    }
    return arr;
  }, [config.count, config.spread, config.z]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    eased.current += (scrollProgress.value - eased.current) * 0.06;

    pointsRef.current.rotation.y += delta * config.spin;
    pointsRef.current.position.z = config.z + eased.current * config.parallax;
    pointsRef.current.position.y = -eased.current * config.parallax * 0.3;

    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = config.baseOpacity * (1 - eased.current * 0.25);
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={config.color}
        size={config.size}
        sizeAttenuation
        depthWrite={false}
        opacity={config.baseOpacity}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/**
 * Additional particle layers, independent from the base ambient field,
 * that respond to scroll progress — each moves at its own depth-based
 * rate (true parallax) and fades subtly as the user travels through the
 * page, reinforcing the "flying through layers of a digital world" feel
 * without adding per-vertex simulation cost.
 */
export function ScrollDepthLayers() {
  return (
    <>
      {LAYERS.map((layer, i) => (
        <DepthLayer key={i} config={layer} />
      ))}
    </>
  );
}
