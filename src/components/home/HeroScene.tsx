"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/components/theme/ThemeProvider";

/*
 * Pharma-themed hero scene (all procedural, no model files):
 *  - DNA double helix that rotates continuously and twists faster with scroll
 *  - Floating capsules and lab glassware (conical flask, beaker, test-tube rack)
 *  - Small molecules (ring of atoms with bonds)
 *  - Soft particle field
 * Colours are read from the active theme's CSS variables.
 */

type Palette = { primary: string; accent: string; accent2: string; muted: string; dark: boolean };

const readPalette = (dark: boolean): Palette => {
  const cs = getComputedStyle(document.documentElement);
  const v = (n: string, f: string) => cs.getPropertyValue(n).trim() || f;
  return {
    primary: v("--t-primary", "#0d9488"),
    accent: v("--t-accent", "#2563eb"),
    accent2: v("--t-accent-2", "#7c3aed"),
    muted: v("--t-muted", "#94a3b8"),
    dark,
  };
};

const UP = new THREE.Vector3(0, 1, 0);

/** Cylinder from point a to point b. */
function Bond({ a, b, radius, color }: { a: THREE.Vector3; b: THREE.Vector3; radius: number; color: string }) {
  const { pos, quat, len } = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(b, a);
    return {
      pos: new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5),
      quat: new THREE.Quaternion().setFromUnitVectors(UP, dir.clone().normalize()),
      len: dir.length(),
    };
  }, [a, b]);
  return (
    <mesh position={pos} quaternion={quat}>
      <cylinderGeometry args={[radius, radius, len, 12]} />
      <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
    </mesh>
  );
}

function Helix({ pal }: { pal: Palette }) {
  const group = useRef<THREE.Group>(null);
  const pairs = 28;
  const step = 0.2;
  const radius = 1.05;
  const twist = 0.42;

  const { strandA, strandB, mids, tubeA, tubeB } = useMemo(() => {
    const A: THREE.Vector3[] = [];
    const B: THREE.Vector3[] = [];
    for (let i = 0; i < pairs; i++) {
      const y = (i - (pairs - 1) / 2) * step;
      const a = i * twist;
      A.push(new THREE.Vector3(Math.cos(a) * radius, y, Math.sin(a) * radius));
      B.push(new THREE.Vector3(Math.cos(a + Math.PI) * radius, y, Math.sin(a + Math.PI) * radius));
    }
    const tube = (pts: THREE.Vector3[]) => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 240, 0.055, 10, false);
    return { strandA: A, strandB: B, mids: A.map((a, i) => new THREE.Vector3().addVectors(a, B[i]).multiplyScalar(0.5)), tubeA: tube(A), tubeB: tube(B) };
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    const scroll = window.scrollY / window.innerHeight;
    group.current.rotation.y += delta * (0.35 + scroll * 1.5);
    group.current.position.y = scroll * 1.4;
  });

  return (
    <group rotation={[0, 0, 0.42]}>
      <group ref={group}>
        <mesh geometry={tubeA}>
          <meshStandardMaterial color={pal.primary} roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh geometry={tubeB}>
          <meshStandardMaterial color={pal.accent} roughness={0.3} metalness={0.2} />
        </mesh>
        {strandA.map((a, i) => {
          const b = strandB[i];
          // Base pair: two halves in different colours, like A–T / G–C pairs
          const c1 = i % 2 ? pal.accent2 : pal.primary;
          const c2 = i % 2 ? pal.accent : pal.muted;
          return (
            <group key={i}>
              <Bond a={a} b={mids[i]} radius={0.035} color={c1} />
              <Bond a={mids[i]} b={b} radius={0.035} color={c2} />
              <mesh position={a}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color={pal.primary} roughness={0.25} metalness={0.2} />
              </mesh>
              <mesh position={b}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color={pal.accent} roughness={0.25} metalness={0.2} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

/** Two-tone gelatin capsule built from two half-cylinders and two hemispheres. */
function Capsule({ colorA, colorB, scale = 1 }: { colorA: string; colorB: string; scale?: number }) {
  const r = 0.26;
  const half = 0.34;
  return (
    <group scale={scale}>
      <mesh position={[0, half / 2, 0]}>
        <cylinderGeometry args={[r, r, half, 32]} />
        <meshStandardMaterial color={colorA} roughness={0.2} metalness={0.05} />
      </mesh>
      <mesh position={[0, half, 0]}>
        <sphereGeometry args={[r, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={colorA} roughness={0.2} metalness={0.05} />
      </mesh>
      <mesh position={[0, -half / 2, 0]}>
        <cylinderGeometry args={[r, r, half, 32]} />
        <meshStandardMaterial color={colorB} roughness={0.2} metalness={0.05} />
      </mesh>
      <mesh position={[0, -half, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[r, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={colorB} roughness={0.2} metalness={0.05} />
      </mesh>
    </group>
  );
}

/* ---------- Lab equipment (glassware) ---------- */

function Glass({ points }: { points: [number, number][] }) {
  const geo = useMemo(() => new THREE.LatheGeometry(points.map(([x, y]) => new THREE.Vector2(x, y)), 48), [points]);
  return (
    <mesh geometry={geo} renderOrder={2}>
      <meshStandardMaterial color="#ffffff" roughness={0.05} metalness={0.1} transparent opacity={0.28} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

function Liquid({ points, color }: { points: [number, number][]; color: string }) {
  const geo = useMemo(() => new THREE.LatheGeometry(points.map(([x, y]) => new THREE.Vector2(x, y)), 48), [points]);
  return (
    <mesh geometry={geo} renderOrder={1}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} roughness={0.3} transparent opacity={0.85} />
    </mesh>
  );
}

/** Erlenmeyer (conical) flask with coloured liquid. */
const FLASK: [number, number][] = [[0, -0.6], [0.55, -0.6], [0.6, -0.54], [0.2, 0.2], [0.15, 0.26], [0.15, 0.7], [0.19, 0.74], [0.19, 0.78]];
const FLASK_LIQUID: [number, number][] = [[0, -0.57], [0.52, -0.57], [0.56, -0.52], [0.34, -0.12], [0, -0.12]];
function Flask({ color }: { color: string }) {
  return (
    <group>
      <Liquid points={FLASK_LIQUID} color={color} />
      <Glass points={FLASK} />
    </group>
  );
}

/** Graduated beaker. */
const BEAKER: [number, number][] = [[0, -0.45], [0.38, -0.45], [0.4, -0.42], [0.4, 0.45], [0.45, 0.5]];
const BEAKER_LIQUID: [number, number][] = [[0, -0.42], [0.37, -0.42], [0.37, 0.05], [0, 0.05]];
function Beaker({ color }: { color: string }) {
  return (
    <group>
      <Liquid points={BEAKER_LIQUID} color={color} />
      <Glass points={BEAKER} />
      {[-0.25, -0.05, 0.15, 0.35].map((y) => (
        <mesh key={y} position={[0, y, 0.405]}>
          <boxGeometry args={[0.14, 0.012, 0.005]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      ))}
    </group>
  );
}

/** Rack of three test tubes with different samples. */
const TUBE: [number, number][] = [
  ...Array.from({ length: 9 }, (_, i): [number, number] => {
    const a = (i / 8) * (Math.PI / 2);
    return [Math.sin(a) * 0.12, -0.6 + (1 - Math.cos(a)) * 0.12];
  }),
  [0.12, 0.6],
  [0.14, 0.63],
];
const TUBE_LIQUID: [number, number][] = [
  ...Array.from({ length: 9 }, (_, i): [number, number] => {
    const a = (i / 8) * (Math.PI / 2);
    return [Math.sin(a) * 0.1, -0.58 + (1 - Math.cos(a)) * 0.1];
  }),
  [0.1, 0],
  [0, 0],
];
function TestTubeRack({ colors }: { colors: string[] }) {
  return (
    <group>
      {colors.map((c, i) => (
        <group key={i} position={[(i - 1) * 0.42, 0, 0]}>
          <Liquid points={TUBE_LIQUID} color={c} />
          <Glass points={TUBE} />
        </group>
      ))}
      {[-0.25, -0.62].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[1.35, 0.06, 0.34]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/** Small aromatic-ring molecule with two substituents. */
function Molecule({ pal }: { pal: Palette }) {
  const ref = useRef<THREE.Group>(null);
  const { ring, sub1, sub2 } = useMemo(() => {
    const ring = Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * 0.5, Math.sin(a) * 0.5, 0);
    });
    return { ring, sub1: new THREE.Vector3(0.95, 0, 0), sub2: new THREE.Vector3(-0.72, 0.62, 0.2) };
  }, []);
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.y += d * 0.5;
      ref.current.rotation.x += d * 0.2;
    }
  });
  return (
    <group ref={ref}>
      {ring.map((p, i) => (
        <group key={i}>
          <mesh position={p}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshStandardMaterial color={pal.muted} roughness={0.3} />
          </mesh>
          <Bond a={p} b={ring[(i + 1) % 6]} radius={0.03} color={pal.muted} />
        </group>
      ))}
      <Bond a={ring[0]} b={sub1} radius={0.03} color={pal.muted} />
      <Bond a={ring[2]} b={sub2} radius={0.03} color={pal.muted} />
      <mesh position={sub1}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={pal.accent2} roughness={0.3} />
      </mesh>
      <mesh position={sub2}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={pal.primary} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Spinner({ children, speed = 0.4 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.x += d * speed;
      ref.current.rotation.z += d * speed * 0.6;
    }
  });
  return <group ref={ref}>{children}</group>;
}

function Particles({ count = 400, color }: { count?: number; color: string }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, [count]);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y -= d * 0.015;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={color} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/** Gentle rocking for glassware (stays mostly upright). */
function Wobble({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const seed = useMemo(() => Math.random() * 10, []);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + seed;
    ref.current.rotation.z = Math.sin(t * 0.8) * 0.18;
    ref.current.rotation.y = t * 0.3;
  });
  return <group ref={ref}>{children}</group>;
}

/** Whole scene leans toward the pointer for a subtle parallax. */
function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.pointer.x * 0.25, 0.04);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -state.pointer.y * 0.15, 0.04);
  });
  return <group ref={ref}>{children}</group>;
}

export default function HeroScene() {
  const { theme } = useTheme();
  const [pal, setPal] = useState<Palette | null>(null);
  useEffect(() => setPal(readPalette(theme.mode === "dark")), [theme]);
  if (!pal) return null;

  const white = pal.dark ? "#e2e8f0" : "#ffffff";

  return (
    <Canvas camera={{ position: [0, 0, 9.5], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={pal.dark ? 0.55 : 1.1} />
      <directionalLight position={[4, 5, 6]} intensity={pal.dark ? 2.2 : 2.6} />
      <pointLight position={[-5, -2, 3]} intensity={25} color={pal.accent2} />
      <pointLight position={[5, 1, 2]} intensity={20} color={pal.primary} />

      <Rig>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <Helix pal={pal} />
        </Float>

        {/* Capsules */}
        <Float speed={2} rotationIntensity={1.2} floatIntensity={1.4} position={[-2.7, 1.7, 0.6]}>
          <Spinner speed={0.5}>
            <Capsule colorA={pal.primary} colorB={white} />
          </Spinner>
        </Float>

        <Float speed={1.6} rotationIntensity={1} floatIntensity={1.2} position={[0.6, 3.1, -1.4]}>
          <Spinner speed={0.35}>
            <Capsule colorA={pal.accent2} colorB={white} scale={0.85} />
          </Spinner>
        </Float>

        {/* Lab equipment */}
        <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.1} position={[2.7, 2.0, -0.6]}>
          <Wobble>
            <Flask color={pal.primary} />
          </Wobble>
        </Float>
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1} position={[-2.6, -1.9, 0.3]}>
          <Wobble>
            <Beaker color={pal.accent} />
          </Wobble>
        </Float>
        <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.9} position={[2.8, -2.1, 0.4]} scale={0.9}>
          <Wobble>
            <TestTubeRack colors={[pal.primary, pal.accent2, pal.accent]} />
          </Wobble>
        </Float>

        {/* Molecules */}
        <Float speed={1.3} rotationIntensity={0.5} floatIntensity={1} position={[-3.2, 0, -1.4]}>
          <Molecule pal={pal} />
        </Float>
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} position={[3.4, 0.4, -2]} scale={0.8}>
          <Molecule pal={pal} />
        </Float>
      </Rig>

      <Particles color={pal.muted} />
    </Canvas>
  );
}
