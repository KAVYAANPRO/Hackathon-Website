"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import * as THREE from "three";

interface AHCoreSceneProps {
  variant?: "hero" | "finale";
  scrollProgress?: number;
}

export function AHCoreScene({
  variant = "hero",
  scrollProgress = 0,
}: AHCoreSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerGimbalRef = useRef<THREE.Group>(null);
  const midGimbalRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const { pointer } = useThree();

  // Deterministic orbital particle field
  const particlePositions = useMemo(() => {
    const count = variant === "hero" ? 220 : 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = i * 2.3999632;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const radius = 2.05 + ((i * 19) % 100) * 0.015;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.85;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return positions;
  }, [variant]);

  // 12 precision calibration ticks around the outer gimbal
  const tickAngles = useMemo(
    () => Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI * 2),
    []
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      const targetRotY = pointer.x * 0.42 + scrollProgress * Math.PI * 0.7;
      const targetRotX = -pointer.y * 0.28 + scrollProgress * 0.35;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        dt * 3.2
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        dt * 3.2
      );

      const scaleBase = variant === "hero" ? 1.05 - scrollProgress * 0.16 : 0.92;
      groupRef.current.scale.setScalar(scaleBase);
    }

    if (outerGimbalRef.current) {
      outerGimbalRef.current.rotation.z += dt * 0.12;
      outerGimbalRef.current.rotation.x = Math.sin(t * 0.3) * 0.16 + 0.52;
    }

    if (midGimbalRef.current) {
      midGimbalRef.current.rotation.z -= dt * 0.22;
      midGimbalRef.current.rotation.y += dt * 0.16;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y += dt * 0.38;
      innerCoreRef.current.rotation.x += dt * 0.2;
    }

    if (shellRef.current) {
      shellRef.current.rotation.y -= dt * 0.08;
      shellRef.current.rotation.z += dt * 0.05;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += dt * 0.045;
    }
  });

  return (
    <>
      {/* Procedural Studio Environment so metallic materials gleam instead of reflecting black */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 4, 0, 0]}>
          <Lightformer
            form="rect"
            intensity={3.5}
            color="#F5F5F5"
            position={[0, 4, 4]}
            scale={[10, 2, 1]}
          />
          <Lightformer
            form="rect"
            intensity={2.4}
            color="#FFB36B"
            position={[-5, 1, 2]}
            scale={[6, 3, 1]}
            target={[0, 0, 0]}
          />
          <Lightformer
            form="rect"
            intensity={4}
            color="#FF5C00"
            position={[5, -2, 1]}
            scale={[5, 2, 1]}
            target={[0, 0, 0]}
          />
          <Lightformer
            form="ring"
            intensity={1.8}
            color="#d4d4dc"
            position={[0, -5, -3]}
            scale={[8, 8, 1]}
            target={[0, 0, 0]}
          />
        </group>
      </Environment>

      <ambientLight intensity={0.45} color="#b8b8c4" />
      <directionalLight position={[4, 6, 5]} intensity={2.6} color="#FFFFFF" />
      <directionalLight position={[-4, -3, 3]} intensity={1.4} color="#FFB36B" />
      <pointLight
        position={[0, 0, 2.2]}
        intensity={4.5}
        distance={8}
        color="#FF5C00"
      />

      <Float speed={1.6} rotationIntensity={0.18} floatIntensity={0.35}>
        <group ref={groupRef}>
          {/* Outer Precision Astrolabe Gimbal */}
          <group ref={outerGimbalRef} rotation={[0.52, 0.22, 0]}>
            <mesh>
              <torusGeometry args={[1.68, 0.036, 20, 96]} />
              <meshStandardMaterial
                color="#b8b8c4"
                metalness={0.92}
                roughness={0.16}
              />
            </mesh>

            {/* Secondary chamfered inner track */}
            <mesh>
              <torusGeometry args={[1.56, 0.012, 12, 96]} />
              <meshStandardMaterial
                color="#FF5C00"
                emissive="#FF5C00"
                emissiveIntensity={1.1}
                metalness={0.5}
                roughness={0.25}
              />
            </mesh>

            {/* Radial calibration ticks */}
            {tickAngles.map((angle, i) => (
              <mesh
                key={angle}
                position={[
                  Math.cos(angle) * 1.68,
                  Math.sin(angle) * 1.68,
                  0,
                ]}
                rotation={[0, 0, angle]}
              >
                <boxGeometry
                  args={[i % 3 === 0 ? 0.14 : 0.07, 0.022, 0.07]}
                />
                <meshStandardMaterial
                  color={i % 3 === 0 ? "#FF5C00" : "#e2e2ea"}
                  emissive={i % 3 === 0 ? "#FF5C00" : "#000000"}
                  emissiveIntensity={i % 3 === 0 ? 0.9 : 0}
                  metalness={0.85}
                  roughness={0.2}
                />
              </mesh>
            ))}
          </group>

          {/* Mid Counter-Rotating Brushed Titanium Ring */}
          <group ref={midGimbalRef} rotation={[-0.65, 0.4, 0.3]}>
            <mesh>
              <torusGeometry args={[1.26, 0.028, 20, 84]} />
              <meshStandardMaterial
                color="#e5e5ed"
                metalness={0.94}
                roughness={0.14}
              />
            </mesh>
            {/* 4 cardinal orbital nodes */}
            {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((a) => (
              <mesh
                key={a}
                position={[Math.cos(a) * 1.26, Math.sin(a) * 1.26, 0]}
              >
                <octahedronGeometry args={[0.065, 0]} />
                <meshStandardMaterial
                  color="#FF5C00"
                  emissive="#FF5C00"
                  emissiveIntensity={1.5}
                  metalness={0.4}
                  roughness={0.2}
                />
              </mesh>
            ))}
          </group>

          {/* Computational Geodesic Lattice Shell */}
          <mesh ref={shellRef}>
            <icosahedronGeometry args={[0.98, 1]} />
            <meshBasicMaterial
              color="#FFB36B"
              wireframe
              transparent
              opacity={0.22}
            />
          </mesh>

          {/* Central Precision-Machined Energy Core */}
          <group ref={innerCoreRef}>
            {/* Brushed dark-titanium faceted outer shell */}
            <mesh>
              <icosahedronGeometry args={[0.62, 0]} />
              <meshStandardMaterial
                color="#464652"
                metalness={0.9}
                roughness={0.18}
                flatShading
              />
            </mesh>

            {/* Glowing molten copper inner core */}
            <mesh scale={0.78}>
              <octahedronGeometry args={[0.62, 0]} />
              <meshStandardMaterial
                color="#FF5C00"
                emissive="#FF5C00"
                emissiveIntensity={2.2}
                roughness={0.15}
                metalness={0.2}
              />
            </mesh>

            {/* Crisp wireframe overlay */}
            <mesh scale={1.03}>
              <icosahedronGeometry args={[0.62, 0]} />
              <meshBasicMaterial
                color="#F5F5F5"
                wireframe
                transparent
                opacity={0.35}
              />
            </mesh>
          </group>

          {/* Procedural Orbital Dust */}
          <points ref={particlesRef}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[particlePositions, 3]}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.026}
              color="#FFB36B"
              transparent
              opacity={0.75}
              sizeAttenuation
            />
          </points>
        </group>
      </Float>
    </>
  );
}
