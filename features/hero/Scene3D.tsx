"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { games } from "@/data/games";

const ACCENT_FALLBACK = "#7c3aed";

interface CardLayout {
  slug: string;
  keyArt: string;
  position: [number, number, number];
  rotationY: number;
  scale: number;
}

// Loosely arced across the right two-thirds of the frame so the hero
// typography on the left never fights them for space. Nearest-to-camera
// card is largest — a shallow depth cue, not a strict grid.
const LAYOUT: Omit<CardLayout, "slug" | "keyArt">[] = [
  { position: [3.6, 1.1, -0.6], rotationY: -0.28, scale: 1.55 },
  { position: [5.6, -0.9, -2.2], rotationY: -0.12, scale: 1.2 },
  { position: [1.9, -1.9, -3.4], rotationY: 0.22, scale: 1.05 },
];

function GameCards() {
  const group = useRef<THREE.Group>(null);
  const textures = useTexture(games.map((g) => g.keyArt));

  const cards = useMemo<CardLayout[]>(
    () =>
      games.map((g, i) => ({
        slug: g.slug,
        keyArt: g.keyArt,
        ...LAYOUT[i % LAYOUT.length],
      })),
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    const { pointer } = state;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.06, 0.04);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.x * 0.3, 0.04);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, pointer.y * 0.18, 0.04);
  });

  return (
    <group ref={group}>
      {cards.map((card, i) => {
        const texture = textures[i];
        // The source art is a square icon export with a near-black rounded
        // border baked in — a small UV inset crops that out, the same fix
        // used for the 2D game cards, rather than showing it on the plane.
        texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.repeat.set(0.94, 0.94);
        texture.offset.set(0.03, 0.03);
        texture.colorSpace = THREE.SRGBColorSpace;

        return (
          <Float key={card.slug} speed={0.7 + i * 0.15} rotationIntensity={0.25} floatIntensity={0.9}>
            <mesh position={card.position} rotation={[0, card.rotationY, 0]} scale={card.scale}>
              <planeGeometry args={[1.6, 1.6]} />
              <meshBasicMaterial map={texture} toneMapped={false} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function AmbientFragments() {
  const group = useRef<THREE.Group>(null);
  const count = 7;

  const fragments = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const radius = 4.5 + Math.random() * 2.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        return {
          key: i,
          position: [
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta) * 0.5,
            radius * Math.cos(phi) - 3,
          ] as [number, number, number],
          scale: 0.1 + Math.random() * 0.22,
          speed: 0.5 + Math.random() * 0.7,
        };
      }),
    []
  );

  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.0004;
  });

  return (
    <group ref={group}>
      {fragments.map((f) => (
        <Float key={f.key} speed={f.speed} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={f.position} scale={f.scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#2e1f57"
              wireframe
              roughness={0.4}
              emissive={ACCENT_FALLBACK}
              emissiveIntensity={0.35}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/** The hero's 3D layer is the games themselves — the three key-art cards
 * floating with a shallow parallax — not an abstract decorative scene. A
 * handful of small wireframe shapes stay in the far background purely for
 * depth, deliberately understated so they read as atmosphere, not content. */
export function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 3, 5]} intensity={0.8} color="#e9e3ff" />
      <Suspense fallback={null}>
        <GameCards />
      </Suspense>
      <AmbientFragments />
      <Sparkles count={70} scale={[9, 5, 6]} size={1.4} speed={0.2} color="#c4b5fd" opacity={0.35} />
    </Canvas>
  );
}
