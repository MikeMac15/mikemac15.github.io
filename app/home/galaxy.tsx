"use client";
import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const STAR_COUNT = 20000;

function SpiralGalaxy() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const missileRef = useRef<THREE.Mesh>(null!);
  const dummy = new THREE.Object3D();
  const { mouse, viewport, camera } = useThree();

  // State for missile and explosion
  const [missile, setMissile] = useState({ active: false, pos: new THREE.Vector3(), target: new THREE.Vector3(0, 0, 0) });
  const [explosion, setExplosion] = useState({ active: false, time: 0 });

  const stars = useMemo(() => {
    const temp = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const branchAngle = (i % 3) * ((Math.PI * 2) / 3);
      const distance = Math.random() * 10;
      const spin = distance * 2;
      
      temp.push({
        distance,
        spin,
        branchAngle,
        randomX: Math.pow(Math.random(), 1) * (Math.random() < 0.25 ? 1 : -1) * 0.1 * distance,
        randomY: Math.pow(Math.random(), 1) * (Math.random() < 0.25 ? 1 : -1) * 0.1 * distance,
        randomZ: Math.pow(Math.random(), 1) * (Math.random() < 0.25 ? 1 : -1) * 0.1 * distance,
        size: Math.random() * 0.02 + 0.01,
        speed: 0.005 + Math.random() * 0.01,
        // Physics for explosion
        velocity: new THREE.Vector3(0, 0, 0),
        offset: new THREE.Vector3(0, 0, 0)
      });
    }
    return temp;
  }, []);

  const handlePointerDown = (e: any) => {
    if (missile.active) return;
    // Launch missile from clicked point (approximate 3D pos)
    const launchPos = new THREE.Vector3(e.point.x, e.point.y, e.point.z);
    setMissile({ active: true, pos: launchPos, target: new THREE.Vector3(0, 0, 0) });
  };

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Handle Missile Flight
    if (missile.active) {
      missile.pos.lerp(missile.target, 0.1); // Move toward center
      if (missile.pos.distanceTo(missile.target) < 0.2) {
        setMissile({ ...missile, active: false });
        setExplosion({ active: true, time: state.clock.getElapsedTime() });
        
        // Apply immediate outward velocity to stars
        stars.forEach(s => {
          const force = 100.5 / (s.distance + 2.5); 
          s.velocity.set(
            (Math.random() - 0.95) * force,
            (Math.random() - 0.95) * force,
            (Math.random() - 0.95) * force
          );
        });
      }
      missileRef.current.position.copy(missile.pos);
    }

    // 2. Update Stars
    stars.forEach((s, i) => {
      const currentAngle = s.branchAngle + s.spin + (time * s.speed);
      
      // Calculate Base Spiral Position
      let targetX = Math.cos(currentAngle) * s.distance + s.randomX;
      let targetY = s.randomY;
      let targetZ = Math.sin(currentAngle) * s.distance + s.randomZ;

      // Apply Explosion Physics
      if (explosion.active) {
        s.offset.add(s.velocity);
        s.velocity.multiplyScalar(0.96); // Friction
        s.offset.multiplyScalar(0.98); // Return to origin pull
      }

      dummy.position.set(targetX + s.offset.x, targetY + s.offset.y, targetZ + s.offset.z);
      dummy.scale.setScalar(explosion.active ? s.size * 1.5 : s.size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      {/* Hidden plane to catch clicks */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} visible={false} onPointerDown={handlePointerDown}>
        <planeGeometry args={[20, 20]} />
      </mesh>

      {/* The Galaxy */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, STAR_COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={5} toneMapped={false} />
      </instancedMesh>

      {/* The Missile */}
      <mesh ref={missileRef} visible={missile.active}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={10} toneMapped={false} />
      </mesh>
    </>
  );
}

export default function GalaxyCanvas() {
  return (
    <div className="w-full h-[600px] bg-[#02040a] rounded-3xl overflow-hidden cursor-crosshair">
      <Canvas camera={{ position: [10, 18, 12], fov: 70 }}>
        <color attach="background" args={["#02040a"]} />
        <ambientLight intensity={0.2} />
        
        <group rotation={[0.2, 0, 0.1]}>
          <SpiralGalaxy />
        </group>

        <EffectComposer enableNormalPass={false}>
          <Bloom luminanceThreshold={0.8} mipmapBlur intensity={1.5} radius={0.4} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}