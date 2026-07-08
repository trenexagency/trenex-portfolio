import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import * as THREE from "three";
import trophySvgRaw from "@assets/T-01_1783417701849.svg?raw";

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
        bevelThickness: 6,
        bevelSize: 4,
        bevelSegments: 5,
        curveSegments: 16,
      });

      geo.translate(-540, -540, -(EXTRUDE_DEPTH / 2));
      geo.applyMatrix4(new THREE.Matrix4().makeScale(1, -1, 1));
      geo.applyMatrix4(new THREE.Matrix4().makeScale(SCALE, SCALE, SCALE));
      geos.push(geo);
    });
  });

  return geos;
}

/* ─── Ambient atmosphere particles ─────────────────────── */
function AtmosphereParticles() {
  const COUNT = 120;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 2.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      velocities[i * 3] = (Math.random() - 0.5) * 0.001;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.0008 + 0.0003;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return { positions, velocities };
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  const posRef = useRef(positions.slice());

  useFrame(() => {
    const pts = pointsRef.current;
    if (!pts) return;
    const arr = posRef.current;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      const x = arr[i * 3], y = arr[i * 3 + 1], z = arr[i * 3 + 2];
      const d = Math.sqrt(x * x + y * y + z * z);
      if (d > 5 || d < 2.0) {
        velocities[i * 3] *= -1;
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
        size={0.018}
        color="#ff2200"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Studio lighting — black chrome + deep red ─────────── */
function StudioLighting() {
  return (
    <>
      {/* Deep dark ambient — near-black */}
      <ambientLight intensity={0.12} color="#0a0000" />

      {/* Key: sharp white top-left for chrome highlight */}
      <directionalLight position={[-3, 5, 3]} intensity={4.5} color="#ffffff" />

      {/* Red fill: left side */}
      <pointLight position={[-4, 1, 2]} intensity={3.0} color="#cc1100" distance={12} />

      {/* Rim: strong red from behind-below */}
      <pointLight position={[1, -3, -4]} intensity={6.5} color="#ff1500" distance={14} />

      {/* Subtle warm specular for chrome depth */}
      <spotLight
        position={[2, 6, 2]}
        angle={0.3}
        penumbra={0.8}
        intensity={5}
        color="#fff0e0"
        castShadow={false}
      />

      {/* Red underlight bounce */}
      <pointLight position={[0, -4, 1]} intensity={2.8} color="#aa0800" distance={9} />
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
      // Very gentle floating
      groupRef.current.position.y = Math.sin(t * 0.38) * 0.08;
      // Barely perceptible sway
      groupRef.current.rotation.x = Math.sin(t * 0.22) * 0.03;
    }
    // Soft breathing red glow
    const glowIntensity = 0.5 + Math.sin(t * 1.1) * 0.28;
    glowMatsRef.current.forEach((m) => {
      m.emissiveIntensity = glowIntensity;
    });
  });

  return (
    <group ref={groupRef}>
      {/* ── Black chrome body ── */}
      {geometries.map((geo, i) => (
        <mesh key={`body-${i}`} geometry={geo} castShadow={false}>
          <meshPhysicalMaterial
            color="#0a0a0a"
            metalness={0.97}
            roughness={0.07}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={1}
            envMapIntensity={1.4}
          />
        </mesh>
      ))}

      {/* ── Deep red metallic accent layer ── */}
      {geometries.map((geo, i) => (
        <mesh key={`accent-${i}`} geometry={geo}>
          <meshPhysicalMaterial
            color="#3a0000"
            metalness={0.85}
            roughness={0.18}
            clearcoat={0.6}
            transparent
            opacity={0.18}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* ── Red emissive BackSide glow hull ── */}
      <group scale={[1.04, 1.04, 1.04]}>
        {geometries.map((geo, i) => (
          <mesh key={`glow-${i}`} geometry={geo}>
            <meshStandardMaterial
              ref={(m) => {
                if (m) glowMatsRef.current[i] = m;
              }}
              color="#000000"
              emissive="#cc1400"
              emissiveIntensity={0.55}
              transparent
              opacity={0.65}
              side={THREE.BackSide}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* ── Soft red inner core glow ── */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 12, 12]} />
        <meshBasicMaterial
          color="#ff0800"
          transparent
          opacity={0.025}
          depthWrite={false}
        />
      </mesh>
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
        camera={{ position: [0, 0.15, 5.2], fov: 40, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Environment preset="studio" background={false} />
        </Suspense>

        <StudioLighting />
        <TrophyMesh />
        <AtmosphereParticles />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.05}
          autoRotate
          autoRotateSpeed={0.35}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI * 0.75}
        />
      </Canvas>
    </div>
  );
}
