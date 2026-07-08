import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import * as THREE from "three";
import trophySvgRaw from "@assets/T-01_1783417701849.svg?raw";

const BRAND_RED = "#eb1b24";
const BRAND_RED_DARK = "#8b0e14";
const BRAND_RED_MID = "#c41620";

/* ─── geometry builder (runs once) ─────────────────────── */
function buildTrophyGeometries(): THREE.BufferGeometry[] {
  const loader = new SVGLoader();
  const data = loader.parse(trophySvgRaw);
  const geos: THREE.BufferGeometry[] = [];

  const EXTRUDE_DEPTH = 80;
  const SCALE = 1 / 270;

  data.paths.forEach((path) => {
    const shapes = SVGLoader.createShapes(path);
    shapes.forEach((shape) => {
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: EXTRUDE_DEPTH,
        bevelEnabled: true,
        bevelThickness: 5,
        bevelSize: 3,
        bevelSegments: 4,
        curveSegments: 14,
      });
      geo.translate(-540, -540, -(EXTRUDE_DEPTH / 2));
      geo.applyMatrix4(new THREE.Matrix4().makeScale(1, -1, 1));
      geo.applyMatrix4(new THREE.Matrix4().makeScale(SCALE, SCALE, SCALE));
      geos.push(geo);
    });
  });

  return geos;
}

/* ─── Floating particles ────────────────────────────────── */
function AtmosphereParticles() {
  const COUNT = 90;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 3.0 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      velocities[i * 3]     = (Math.random() - 0.5) * 0.0008;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.0006 + 0.0002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0008;
    }
    return { positions, velocities };
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  const posRef    = useRef(positions.slice());

  useFrame(() => {
    const pts = pointsRef.current;
    if (!pts) return;
    const arr = posRef.current;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3]     += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      const x = arr[i * 3], y = arr[i * 3 + 1], z = arr[i * 3 + 2];
      const d = Math.sqrt(x * x + y * y + z * z);
      if (d > 5.8 || d < 2.5) {
        velocities[i * 3]     *= -1;
        velocities[i * 3 + 1] *= -1;
        velocities[i * 3 + 2] *= -1;
      }
    }
    (pts.geometry.attributes.position as THREE.BufferAttribute).set(arr);
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color={BRAND_RED}
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Subtle floating grid rings ────────────────────────── */
function GeometricAccents() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.08;
      ring1Ref.current.rotation.x = t * 0.05;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.06;
      ring2Ref.current.rotation.y = t * 0.04;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3.2, 0.006, 6, 64]} />
        <meshBasicMaterial color={BRAND_RED} transparent opacity={0.07} depthWrite={false} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[4.0, 0.004, 6, 64]} />
        <meshBasicMaterial color={BRAND_RED_DARK} transparent opacity={0.05} depthWrite={false} />
      </mesh>
    </>
  );
}

/* ─── Red-only lighting — no white, no silver ───────────── */
function BrandLighting() {
  return (
    <>
      {/* Warm dark ambient base */}
      <ambientLight intensity={0.6} color="#3d0608" />

      {/* Soft front fill — red-tinted, not white */}
      <directionalLight position={[0, 2, 5]} intensity={1.8} color="#ff4040" />

      {/* Left side depth */}
      <pointLight position={[-4, 2, 2]} intensity={2.5} color={BRAND_RED} distance={14} />

      {/* Right side depth */}
      <pointLight position={[4, 1, 1]} intensity={1.8} color={BRAND_RED_MID} distance={12} />

      {/* Top accent */}
      <pointLight position={[0, 5, 1]} intensity={1.4} color="#ff2020" distance={10} />

      {/* Bottom bounce — keeps underside red not dark */}
      <pointLight position={[0, -4, 0]} intensity={1.2} color={BRAND_RED_DARK} distance={9} />

      {/* Rear rim */}
      <pointLight position={[0, 0, -5]} intensity={1.0} color="#600810" distance={10} />
    </>
  );
}

/* ─── Trophy mesh — pure Trenex red ─────────────────────── */
function TrophyMesh() {
  const groupRef    = useRef<THREE.Group>(null);
  const glowMatRef  = useRef<THREE.MeshStandardMaterial | null>(null);

  const geometries = useMemo(() => buildTrophyGeometries(), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.38) * 0.07;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.025;
    }
    // Soft breathing emissive glow
    if (glowMatRef.current) {
      glowMatRef.current.emissiveIntensity = 0.18 + Math.sin(t * 1.0) * 0.08;
    }
  });

  return (
    /* Scale group down ~35% from original */
    <group ref={groupRef} scale={[0.65, 0.65, 0.65]}>
      {geometries.map((geo, i) => (
        <mesh key={`t-${i}`} geometry={geo} castShadow={false}>
          <meshStandardMaterial
            ref={i === 0 ? (m) => { if (m) glowMatRef.current = m; } : undefined}
            color={BRAND_RED}
            emissive={BRAND_RED}
            emissiveIntensity={0.22}
            metalness={0.15}
            roughness={0.45}
            envMapIntensity={0}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Main exported scene ───────────────────────────────── */
interface TrophySceneProps {
  className?: string;
}

export function TrophyScene({ className }: TrophySceneProps) {
  return (
    <div
      id="trophy-canvas"
      className={className}
      style={{ touchAction: "none" }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.1, 6.0], fov: 38, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.NoToneMapping,
        }}
        performance={{ min: 0.5 }}
      >
        <BrandLighting />
        <TrophyMesh />
        <AtmosphereParticles />
        <GeometricAccents />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.05}
          autoRotate
          autoRotateSpeed={0.4}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI * 0.78}
        />
      </Canvas>
    </div>
  );
}
