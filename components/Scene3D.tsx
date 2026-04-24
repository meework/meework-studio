"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLORS = ["#1a1a2e", "#2e1a1a", "#1a2e1a", "#1a1a1a"];
const colorNames = ["Blue", "Red", "Green", "Dark"];

function Sphere({
  scrollProgress,
  colorIndex,
  onClick,
}: {
  scrollProgress: React.MutableRefObject<number>;
  colorIndex: number;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetColor = useRef(new THREE.Color(COLORS[0]));

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.1;

    const scroll = scrollProgress.current;
    meshRef.current.scale.setScalar(1 + scroll * 0.5);
    meshRef.current.rotation.z = scroll * Math.PI;

    targetColor.current.set(COLORS[colorIndex]);
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.color.lerp(targetColor.current, 0.05);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh
        ref={meshRef}
        castShadow
        onClick={onClick}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial
          color={COLORS[0]}
          attach="material"
          distort={0.45}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

function Rings({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = t * 0.05 + scrollProgress.current * Math.PI * 0.5;
    groupRef.current.rotation.y = t * 0.08;
  });

  return (
    <group ref={groupRef}>
      {[1.8, 2.2, 2.6].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, 0, i * 0.5]}>
          <torusGeometry args={[r, 0.015, 16, 100]} />
          <meshStandardMaterial color="#888888" metalness={1} roughness={0.1} emissive="#333333" />
        </mesh>
      ))}
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 400;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}

function SceneCamera({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame(() => {
    const z = 5 - scrollProgress.current * 1.5;
    camera.position.z += (z - camera.position.z) * 0.05;
  });
  return null;
}

export default function Scene3D() {
  const scrollProgress = useRef(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => { scrollProgress.current = self.progress; },
    });
    const t = setTimeout(() => setHint(true), 2500);
    const t2 = setTimeout(() => setHint(false), 5500);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  const handleSphereClick = () => {
    setColorIndex((prev) => (prev + 1) % COLORS.length);
  };

  return (
    <div className="fixed inset-0 z-0">
      {hint && (
        <div className="absolute bottom-32 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs uppercase tracking-widest text-white/50 backdrop-blur-sm pointer-events-none transition-opacity">
          Click the sphere to change color
        </div>
      )}
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true, alpha: false }} dpr={[1, 1.5]}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#4444ff" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#ff4444" />
        <spotLight position={[0, 5, 0]} intensity={1} color="#ffffff" />

        <Sphere scrollProgress={scrollProgress} colorIndex={colorIndex} onClick={handleSphereClick} />
        <Rings scrollProgress={scrollProgress} />
        <Particles />
        <SceneCamera scrollProgress={scrollProgress} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
