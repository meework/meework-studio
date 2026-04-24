"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 300;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  useFrame((s) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = s.clock.getElapsedTime() * 0.015;
    pointsRef.current.rotation.x = s.clock.getElapsedTime() * 0.005;
  });
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#ffffff" transparent opacity={0.55} />
    </points>
  );
}

function FloatingRings() {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!group.current) return;
    const t = s.clock.getElapsedTime();
    group.current.rotation.x = t * 0.04;
    group.current.rotation.y = t * 0.06;
    group.current.position.x = Math.sin(t * 0.3) * 0.5;
  });
  return (
    <group ref={group} position={[3, 0, -3]}>
      {[2.2, 3.0, 3.8].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.4, 0, i * 0.7]}>
          <torusGeometry args={[r, 0.008, 12, 80]} />
          <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.2} transparent opacity={0.22} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingRings2() {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!group.current) return;
    const t = s.clock.getElapsedTime();
    group.current.rotation.x = -t * 0.03;
    group.current.rotation.z = t * 0.05;
    group.current.position.y = Math.sin(t * 0.25) * 0.4;
  });
  return (
    <group ref={group} position={[-4, 1, -4]}>
      {[1.6, 2.2].map((r, i) => (
        <mesh key={i} rotation={[i * 0.8, Math.PI / 4, i * 0.5]}>
          <torusGeometry args={[r, 0.006, 12, 60]} />
          <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.2} transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

function GlowOrb() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!mesh.current) return;
    const t = s.clock.getElapsedTime();
    mesh.current.position.y = Math.sin(t * 0.4) * 0.3;
    mesh.current.position.x = Math.cos(t * 0.25) * 0.5;
  });
  return (
    <mesh ref={mesh} position={[-2, -1, -5]}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial
        color="#111122"
        metalness={0.9}
        roughness={0.1}
        envMapIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export default function WorkBackground3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1]}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#3333aa" />
        <pointLight position={[-5, -5, -3]} intensity={0.3} color="#aa2222" />
        <Particles />
        <FloatingRings />
        <FloatingRings2 />
        <GlowOrb />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
