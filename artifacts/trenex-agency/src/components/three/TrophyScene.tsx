import { Suspense, useCallback, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import * as THREE from "three";
import trophySvgRaw from "@assets/T-01_1783417701849.svg?raw";

/* ─── geometry builder (runs once) ─────────────────────── */
function buildTrophyGeometries(): THREE.BufferGeometry[] {
  const loader = new SVGLoader();
  const data = loader.parse(trophySvgRaw);
  const geos: THREE.BufferGeometry[] = [];

  const EXTRUDE_DEPTH = 80;        // in SVG units (1080 viewBox)
  const SCALE = 1 / 270;           // → ≈4 world-unit wide final mesh

  data.paths.forEach((path) => {
    const shapes = SVGLoader.createShapes(path);
    shapes.forEach((shape) => {
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: EXTRUDE_DEPTH,
        bevelEnabled: true,
        bevelThickness: 6,
        bevelSize: 4,
        bevelSegments: 5,
        curveSegments: 16,
      });

      // centre XY at origin, flip Y (SVG Y-down → Three.js Y-up), centre Z, then scale
      geo.translate(-540, -540, -(EXTRUDE_DEPTH / 2));
      geo.applyMatrix4(new THREE.Matrix4().makeScale(1, -1, 1));
      geo.applyMatrix4(
        new THREE.Matrix4().makeScale(SCALE, SCALE, SCALE),
      );
      geos.push(geo);
    });
  });

  return geos;
}

/* ─── Energy rings ──────────────────────────────────────── */
function EnergyRing({
  period,
  delay,
  radius,
}: {
  period: number;
  delay: number;
  radius: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef  = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    const t = ((clock.elapsedTime + delay) % period) / (period * 0.5);
    const visible = t < 1;
    if (matRef.current)  matRef.current.opacity  = visible ? 0.65 * (1 - t) : 0;
    if (meshRef.current) meshRef.current.scale.setScalar(visible ? 0.4 + t * 3.2 : 0.01);
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.012, 8, 80]} />
      <meshBasicMaterial ref={matRef} color="#ff2200" transparent opacity={0} />
    </mesh>
  );
}

/* ─── Ambient atmosphere particles ─────────────────────── */
function AtmosphereParticles() {
  const COUNT = 180;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 2.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      velocities[i * 3]     = (Math.random() - 0.5) * 0.0015;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.001 + 0.0004;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0015;
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
      // wrap sphere boundary
      const x = arr[i*3], y = arr[i*3+1], z = arr[i*3+2];
      const d = Math.sqrt(x*x + y*y + z*z);
      if (d > 5 || d < 1.8) {
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
        size={0.022}
        color="#ff3311"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Studio lighting ───────────────────────────────────── */
function StudioLighting() {
  return (
    <>
      {/* Base ambient — very dark red */}
      <ambientLight intensity={0.18} color="#1a0000" />

      {/* Key: top-left white */}
      <directionalLight position={[-3, 4, 3]} intensity={3.2} color="#ffffff" />

      {/* Fill: right warm */}
      <pointLight position={[4, 2, 2]} intensity={3.5} color="#ffe8d0" distance={14} />

      {/* Rim: back red */}
      <pointLight position={[-2, -2, -4]} intensity={5} color="#ff1500" distance={12} />

      {/* Top specular — creates highlight on bevel */}
      <spotLight
        position={[0, 5, 1]}
        angle={0.35}
        penumbra={0.7}
        intensity={6}
        color="#ffffff"
        castShadow={false}
      />

      {/* Bottom red bounce */}
      <pointLight position={[0, -3, 1]} intensity={2.2} color="#cc1100" distance={8} />
    </>
  );
}

/* ─── Trophy mesh ───────────────────────────────────────── */
function TrophyMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const glowMatsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  const geometries = useMemo(() => buildTrophyGeometries(), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.45) * 0.1;
      groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.08; // subtle sway
    }
    // breathing red glow on edge
    const glowIntensity = 0.55 + Math.sin(t * 1.4) * 0.38;
    glowMatsRef.current.forEach((m) => {
      m.emissiveIntensity = glowIntensity;
    });
  });

  return (
    <group ref={groupRef}>
      {/* ── Main chrome body ── */}
      {geometries.map((geo, i) => (
        <mesh key={`body-${i}`} geometry={geo} castShadow={false}>
          <meshPhysicalMaterial
            color="#111111"
            metalness={0.92}
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            reflectivity={1}
            envMapIntensity={1.2}
          />
        </mesh>
      ))}

      {/* ── Red emissive edge (BackSide hull trick) ── */}
      <group scale={[1.03, 1.03, 1.03]}>
        {geometries.map((geo, i) => (
          <mesh key={`edge-${i}`} geometry={geo}>
            <meshStandardMaterial
              ref={(m) => {
                if (m) glowMatsRef.current[i] = m;
              }}
              color="#000000"
              emissive="#ff1f00"
              emissiveIntensity={0.6}
              transparent
              opacity={0.7}
              side={THREE.BackSide}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* ── Soft inner ambient glow blob ── */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshBasicMaterial color="#ff0800" transparent opacity={0.035} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ─── Camera reset helper ───────────────────────────────── */
function CameraResetter({
  controlsRef,
}: {
  controlsRef: React.RefObject<any>;
}) {
  const { camera } = useThree();
  const defaultPos = useMemo(() => new THREE.Vector3(0, 0.2, 5.5), []);

  useEffect(() => {
    const canvas = document.getElementById("trophy-canvas");
    if (!canvas) return;
    const onDbl = () => {
      camera.position.copy(defaultPos);
      camera.lookAt(0, 0, 0);
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    };
    canvas.addEventListener("dblclick", onDbl);
    return () => canvas.removeEventListener("dblclick", onDbl);
  }, [camera, controlsRef, defaultPos]);

  return null;
}

/* ─── Main exported scene ───────────────────────────────── */
interface TrophySceneProps {
  className?: string;
}

export function TrophyScene({ className }: TrophySceneProps) {
  const controlsRef = useRef<any>(null);

  const handleDoubleClick = useCallback(() => {
    controlsRef.current?.reset?.();
  }, []);

  return (
    <div
      id="trophy-canvas"
      className={className}
      onDoubleClick={handleDoubleClick}
      style={{ touchAction: "none" }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 5.5], fov: 42, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Environment preset="studio" background={false} />
        </Suspense>

        <StudioLighting />
        <TrophyMesh />
        <AtmosphereParticles />

        {/* Energy rings at different periods / delays */}
        <EnergyRing period={5.0} delay={0.0} radius={1.6} />
        <EnergyRing period={5.0} delay={1.7} radius={1.8} />
        <EnergyRing period={5.0} delay={3.4} radius={1.4} />

        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.06}
          autoRotate
          autoRotateSpeed={0.55}
          enablePan={false}
          minDistance={2.5}
          maxDistance={9}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 0.72}
        />

        <CameraResetter controlsRef={controlsRef} />
      </Canvas>
    </div>
  );
}
