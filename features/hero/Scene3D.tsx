"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const FRAGMENT_COUNT = 16;

function Fragments() {
  const group = useRef<THREE.Group>(null);

  const fragments = useMemo(
    () =>
      Array.from({ length: FRAGMENT_COUNT }, (_, i) => {
        const radius = 3 + Math.random() * 3.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        return {
          key: i,
          position: [
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta) * 0.6,
            radius * Math.cos(phi) - 2,
          ] as [number, number, number],
          scale: 0.18 + Math.random() * 0.4,
          geometry: i % 3 === 0 ? "octahedron" : "icosahedron",
          wireframe: i % 4 === 0,
          speed: 0.6 + Math.random() * 0.8,
        };
      }),
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    const { pointer } = state;
    group.current.rotation.y += 0.0009;
    // Damped camera-adjacent parallax: the whole cluster drifts opposite the
    // pointer rather than the camera itself moving, so nothing ever clips.
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.x * 0.4, 0.04);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, pointer.y * 0.25, 0.04);
  });

  return (
    <group ref={group}>
      {fragments.map((f) => (
        <Float key={f.key} speed={f.speed} rotationIntensity={0.6} floatIntensity={1.2}>
          <mesh position={f.position} scale={f.scale}>
            {f.geometry === "octahedron" ? (
              <octahedronGeometry args={[1, 0]} />
            ) : (
              <icosahedronGeometry args={[1, 0]} />
            )}
            <meshStandardMaterial
              color={f.wireframe ? "#a78bfa" : "#4c2f8f"}
              wireframe={f.wireframe}
              roughness={0.35}
              metalness={0.4}
              emissive="#7c3aed"
              emissiveIntensity={f.wireframe ? 0.5 : 0.12}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/** Abstract, procedural "game-world fragments" — deliberately not literal
 * character models, since no 3D assets exist for the games yet. Mounted
 * only when Hero decides the device/motion preference can take it. */
export function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 3, 5]} intensity={1.1} color="#c4b5fd" />
      <pointLight position={[-4, -2, -3]} intensity={0.6} color="#4c1d95" />
      <Fragments />
      <Sparkles count={140} scale={[9, 5, 6]} size={1.6} speed={0.25} color="#c4b5fd" opacity={0.5} />
    </Canvas>
  );
}
