"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const PIXEL_COUNT = 50000;

function WaterfallParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = new THREE.Object3D();
  const { viewport, mouse } = useThree(); // Access mouse coordinates and viewport size
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < PIXEL_COUNT; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 5,
        y: Math.random() * 10,
        z: (Math.random() - 0.5) * 0.3,
        vx: 0,
        vy: -Math.random() * 0.05 - 0.02,
        size: Math.random() * 0.07 + 0.02,
        isSplashing: false,
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    // 1. Convert 2D mouse coords to 3D scene coords
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    particles.forEach((p, i) => {
      // 2. Mouse Interaction Logic
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const forceRadius = 1.2; // How close the mouse needs to be

      if (distance < forceRadius) {
        const force = (forceRadius - distance) / forceRadius;
        p.vx += dx * force * 0.02; // Push away on X
        p.vy += dy * force * 0.02; // Push away on Y
      }

      // 3. Standard Physics
      if (!p.isSplashing) {
        p.vy -= 0.0018; 
        p.y += p.vy;
        p.x += p.vx;
        p.vx *= 0.95; // Friction so they don't fly away forever
      } else {
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.0015;
      }

      // Splash collision
      if (p.y < -3 && !p.isSplashing) {
        p.isSplashing = true;
        p.vy = Math.random() * 0.06; 
        p.vx = (p.x > 0 ? 1 : -1) * Math.random() * 0.08;
      }

      // Reset
      if (p.y < -5 || Math.abs(p.x) > 6) {
        p.y = 5;
        p.x = (Math.random() - 0.5) * 5;
        p.vy = -Math.random() * 0.05;
        p.vx = 0;
        p.isSplashing = false;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PIXEL_COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#a5f3fc" 
        emissive="#38bdf8" 
        emissiveIntensity={5} 
        toneMapped={false} 
      />
    </instancedMesh>
  );
}

export default function PixelWaterfall() {
  return (
    <div className="w-full h-[600px] bg-black rounded-3xl overflow-hidden cursor-crosshair">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={1} />
        
        <WaterfallParticles />

        <EffectComposer enableNormalPass={false}>
          <Bloom 
            luminanceThreshold={1} 
            mipmapBlur 
            intensity={1.5} 
            radius={0.3} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}