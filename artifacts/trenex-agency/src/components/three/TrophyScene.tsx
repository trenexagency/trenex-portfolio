import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import * as THREE from "three";
import trophySvgRaw from "@assets/T-01_1783417701849.svg?raw";

/* ─── Brand colors ──────────────────────────────────────── */
const R_BRIGHT = new THREE.Color("#ff2020");
const R_MID    = new THREE.Color("#c41620");
const R_DARK   = new THREE.Color("#6e080e");
const R_DEEP   = new THREE.Color("#1a0002");

/* ─── Geometry builder (once) ───────────────────────────── */
function buildTrophyGeometries(): THREE.BufferGeometry[] {
  const loader = new SVGLoader();
  const data   = loader.parse(trophySvgRaw);
  const geos: THREE.BufferGeometry[] = [];
  /* Deeper extrusion + sharper bevel for premium depth and edge quality */
  const DEPTH = 110;
  const SCALE = 1 / 270;

  data.paths.forEach((path) => {
    path.toShapes().forEach((shape) => {
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: DEPTH,
        bevelEnabled:    true,
        bevelThickness:  9,
        bevelSize:       7,
        bevelSegments:  10,   // smoother bevel curve = cleaner edge highlight
        curveSegments:  20,
      });
      geo.translate(-540, -540, -(DEPTH / 2));
      geo.applyMatrix4(new THREE.Matrix4().makeScale(1, -1, 1));
      geo.applyMatrix4(new THREE.Matrix4().makeScale(SCALE, SCALE, SCALE));
      geos.push(geo);
    });
  });

  return geos;
}

/* ─── Premium Phong lighting — red depth without white ──── */
function BrandLighting() {
  return (
    <>
      {/* Darker ambient — more contrast, richer shadows */}
      <ambientLight intensity={0.18} color={R_DEEP} />

      {/* Primary key: top-left-front — main face illumination */}
      <directionalLight
        position={[-2.5, 4.5, 5.5]}
        intensity={7.5}
        color={R_BRIGHT}
      />

      {/* Sharp specular highlight from upper-right — catches bevel edges cleanly */}
      <pointLight position={[3.0, 3.5, 4.5]} intensity={5.0} color={R_BRIGHT} distance={12} />

      {/* Reduced fill from right-bottom — keeps shadow side readable but not flat */}
      <pointLight position={[4, -1, 3]} intensity={1.4} color={R_MID} distance={16} />

      {/* Stronger top rim — sharper separation of top edges from background */}
      <pointLight position={[0, 7, -1]} intensity={3.5} color={R_BRIGHT} distance={14} />

      {/* Rear-bottom rim — wraps deep red around back and bottom edges */}
      <pointLight position={[0, -4, -4]} intensity={4.0} color={R_DARK} distance={13} />
    </>
  );
}

/* ─── Trophy mesh — two-material split for depth contrast ── */
function TrophyMesh() {
  const groupRef   = useRef<THREE.Group>(null);
  const edgeMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const geometries = useMemo(() => buildTrophyGeometries(), []);

  /*
   * capMat  → ExtrudeGeometry group 0 (front + back faces)
   *           Medium-bright red, moderate shininess — the visible face.
   */
  const capMat = useMemo(() => new THREE.MeshPhongMaterial({
    color:     new THREE.Color("#c21020"),
    emissive:  new THREE.Color("#1e0002"),
    specular:  new THREE.Color("#dd2030"),
    shininess: 42,
  }), []);

  /*
   * sideMat → ExtrudeGeometry group 1 (extruded side walls + bevel)
   *           Very dark maroon base = deep recessed grooves.
   *           High shininess = bevel edges catch sharp specular highlights
   *           from the key light → automotive / luxury badge look.
   */
  const sideMat = useMemo(() => new THREE.MeshPhongMaterial({
    color:     new THREE.Color("#3a0406"),
    emissive:  new THREE.Color("#080001"),
    specular:  new THREE.Color("#ff3040"),
    shininess: 95,
  }), []);

  /* Thin outer emissive hull — creates the glowing red rim */
  const edgeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:             new THREE.Color("#000000"),
    emissive:          new THREE.Color("#eb1b24"),
    emissiveIntensity: 0.70,
    transparent:       true,
    opacity:           0.50,
    side:              THREE.BackSide,
    depthWrite:        false,
  }), []);

  /* Wider soft halo */
  const haloMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:             new THREE.Color("#000000"),
    emissive:          new THREE.Color("#cc0f18"),
    emissiveIntensity: 0.28,
    transparent:       true,
    opacity:           0.22,
    side:              THREE.BackSide,
    depthWrite:        false,
  }), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.42) * 0.09;
      groupRef.current.rotation.x = Math.sin(t * 0.21) * 0.028;
    }

    /* Breathing edge glow */
    if (edgeMatRef.current) {
      edgeMatRef.current.emissiveIntensity = 0.60 + Math.sin(t * 1.1) * 0.22;
    }

    /* Subtle face emissive breath — only the front face pulses */
    capMat.emissive.setScalar(0.06 + Math.sin(t * 1.1) * 0.028);
  });

  /* Multi-material array: index matches ExtrudeGeometry group index */
  const meshMaterials = useMemo(
    () => [capMat, sideMat] as THREE.Material[],
    [capMat, sideMat],
  );

  return (
    <group ref={groupRef} scale={[0.70, 0.70, 0.70]}>
      {/* ── Main body — two-material (cap face / side grooves) ── */}
      {geometries.map((geo, i) => (
        <mesh key={`b${i}`} geometry={geo} material={meshMaterials} castShadow={false} />
      ))}

      {/* ── Thin glowing edge hull ── */}
      <group scale={[1.048, 1.048, 1.048]}>
        {geometries.map((geo, i) => (
          <mesh
            key={`e${i}`}
            geometry={geo}
            material={edgeMat}
            ref={i === 0 ? (m) => { if (m) edgeMatRef.current = m.material as THREE.MeshStandardMaterial; } : undefined}
          />
        ))}
      </group>

      {/* ── Wider soft halo ── */}
      <group scale={[1.10, 1.10, 1.10]}>
        {geometries.map((geo, i) => (
          <mesh key={`h${i}`} geometry={geo} material={haloMat} />
        ))}
      </group>
    </group>
  );
}

/* ─── Volumetric glow cloud (nested transparent spheres) ── */
function VolumetricGlow() {
  const innerRef  = useRef<THREE.Mesh>(null);
  const midRef    = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pulse = Math.sin(t * 0.8) * 0.012;
    if (innerRef.current)  innerRef.current.scale.setScalar(1 + pulse);
    if (midRef.current)    midRef.current.scale.setScalar(1 - pulse * 0.5);
  });

  return (
    <>
      {/* Inner warm core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[1.1, 16, 16]} />
        <meshBasicMaterial
          color="#eb1b24"
          transparent
          opacity={0.055}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Mid glow */}
      <mesh ref={midRef}>
        <sphereGeometry args={[2.0, 16, 16]} />
        <meshBasicMaterial
          color="#c00e14"
          transparent
          opacity={0.035}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Outer diffuse halo */}
      <mesh>
        <sphereGeometry args={[3.2, 12, 12]} />
        <meshBasicMaterial
          color="#7a0810"
          transparent
          opacity={0.018}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

/* ─── Expanding pulse rings ──────────────────────────────── */
function PulseRing({ period, delay, startRadius }: { period: number; delay: number; startRadius: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef  = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    const t     = ((clock.elapsedTime + delay) % period) / period;
    const scale = 0.3 + t * 2.8;
    const alpha = t < 0.5 ? t * 2 : (1 - t) * 2;

    if (meshRef.current) meshRef.current.scale.setScalar(scale);
    if (matRef.current)  matRef.current.opacity = alpha * 0.07;
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[startRadius, 0.014, 8, 80]} />
      <meshBasicMaterial
        ref={matRef}
        color="#eb1b24"
        transparent
        opacity={0}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Slow-rotating accent rings ────────────────────────── */
function AccentRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (r1.current) { r1.current.rotation.z = t * 0.06; r1.current.rotation.x = t * 0.04; }
    if (r2.current) { r2.current.rotation.z = -t * 0.05; r2.current.rotation.y = t * 0.03; }
  });

  return (
    <>
      <mesh ref={r1} rotation={[Math.PI / 5, 0, 0]}>
        <torusGeometry args={[3.0, 0.007, 6, 80]} />
        <meshBasicMaterial color="#eb1b24" transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 3, Math.PI / 8, 0]}>
        <torusGeometry args={[4.0, 0.005, 6, 80]} />
        <meshBasicMaterial color="#8b0e14" transparent opacity={0.05} depthWrite={false} />
      </mesh>
    </>
  );
}

/* ─── Floating particles ────────────────────────────────── */
function AtmosphereParticles() {
  const COUNT = 100;

  const { positions, velocities } = useMemo(() => {
    const positions  = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r     = 2.8 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      velocities[i * 3]     = (Math.random() - 0.5) * 0.0008;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.0006 + 0.0002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0008;
    }
    return { positions, velocities };
  }, []);

  const ptsRef = useRef<THREE.Points>(null);
  const posRef = useRef(positions.slice());

  useFrame(() => {
    const pts = ptsRef.current;
    if (!pts) return;
    const arr = posRef.current;
    // Use squared-distance comparison — eliminates Math.sqrt() for every particle
    // each frame (100 sqrt calls → 100 multiply-adds, a significant saving).
    const MAX_D2 = 6.0 * 6.0;
    const MIN_D2 = 2.4 * 2.4;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3]     += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      const d2 = arr[i*3]**2 + arr[i*3+1]**2 + arr[i*3+2]**2;
      if (d2 > MAX_D2 || d2 < MIN_D2) {
        velocities[i*3] *= -1; velocities[i*3+1] *= -1; velocities[i*3+2] *= -1;
      }
    }
    (pts.geometry.attributes.position as THREE.BufferAttribute).set(arr);
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ptsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.016}
        color="#eb1b24"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Main exported scene ───────────────────────────────── */
interface TrophySceneProps {
  className?: string;
}

export function TrophyScene({ className }: TrophySceneProps) {
  return (
    <div id="trophy-canvas" className={className} style={{ touchAction: "none" }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.4, 5.8], fov: 40, near: 0.1, far: 100 }}
        gl={{
          antialias:   true,
          alpha:       true,
          powerPreference: "high-performance",
          toneMapping: THREE.NoToneMapping,
        }}
        performance={{ min: 0.5 }}
      >
        <BrandLighting />
        <TrophyMesh />
        <VolumetricGlow />
        <AtmosphereParticles />
        <AccentRings />
        <PulseRing period={5.5} delay={0.0} startRadius={1.4} />
        <PulseRing period={5.5} delay={1.8} startRadius={1.6} />
        <PulseRing period={5.5} delay={3.6} startRadius={1.5} />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.05}
          autoRotate
          autoRotateSpeed={0.38}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI * 0.78}
        />
      </Canvas>
    </div>
  );
}
