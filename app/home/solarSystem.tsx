"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  CameraControls,
  Html,
  Line,
  Stars,
  Text,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

// Planet Definitions
type PlanetDef = {
  name: string;
  id: string;
  radius: number;
  color: string;
  mapUrl?: string;
  cloudUrl?: string;
  ring?: { inner: number; outer: number; textureUrl: string };
  spinSpeed: number;
  tilt?: number;
};

const PLANETS: PlanetDef[] = [
  { name: "Mercury", id: "199", color: "#A5A5A5", radius: 0.22, spinSpeed: 0.2, tilt: 0.0005 },
  { name: "Venus", id: "299", color: "#E3BB76", radius: 0.38, spinSpeed: -0.08, tilt: 3.09 },
  { name: "Earth", id: "399", color: "#2271B3", radius: 0.45, spinSpeed: 0.6, tilt: 0.41, cloudUrl: "/textures/planets/earth_clouds.jpg" },
  { name: "Mars", id: "499", color: "#E27B58", radius: 0.3, spinSpeed: 0.55, tilt: 0.44 },
  { name: "Jupiter", id: "599", color: "#D39C7E", radius: 1.15, spinSpeed: 1.2, tilt: 0.05 },
  { name: "Saturn", id: "699", color: "#C5AB6E", radius: 0.95, spinSpeed: 1.05, tilt: 0.46, ring: { inner: 1.25, outer: 2.15, textureUrl: "/textures/planets/saturn_ring.png" } },
];

async function fetchPlanetData(id: string) {
  const now = new Date();
  const startTime = now.toISOString();
  // Requesting VECTORS gives us exact X,Y,Z and VX,VY,VZ
  const url = `https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND='${id}'&OBJ_DATA='NO'&MAKE_EPHEM='YES'&EPHEM_TYPE='VECTORS'&CENTER='500@0'&START_TIME='${startTime}'&STOP_TIME='${new Date(now.getTime() + 60000).toISOString()}'&STEP_SIZE='1m'`;

  const res = await fetch(url);
  const data = await res.json();
  const result = data?.result ?? "";

  const posMatch = result.match(/X\s*=\s*([-\d.E+]+)\s*Y\s*=\s*([-\d.E+]+)\s*Z\s*=\s*([-\d.E+]+)/);
  const velMatch = result.match(/VX\s*=\s*([-\d.E+]+)\s*VY\s*=\s*([-\d.E+]+)\s*VZ\s*=\s*([-\d.E+]+)/);

  if (!posMatch || !velMatch) throw new Error(`Data error for ${id}`);

  return {
    pos: new THREE.Vector3(Number(posMatch[1]), Number(posMatch[2]), Number(posMatch[3])),
    vel: new THREE.Vector3(Number(velMatch[1]), Number(velMatch[2]), Number(velMatch[3]))
  };
}

function PlanetMesh({ def, realtimeData, scale, onSelect }: any) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create mutable copies of NASA vectors scaled to the scene
  const currentPos = useMemo(() => realtimeData.pos.clone().multiplyScalar(scale), [realtimeData, scale]);
  const currentVel = useMemo(() => realtimeData.vel.clone().multiplyScalar(scale), [realtimeData, scale]);

  useFrame((_, delta) => {
    // REAL-TIME: No accelerated time loop
    // NASA Velocity is KM/Day. Convert to KM/Second for the frame delta
    const velocityPerSecond = currentVel.clone().divideScalar(86400);
    currentPos.add(velocityPerSecond.multiplyScalar(delta));

    if (groupRef.current) {
      groupRef.current.position.copy(currentPos);
      groupRef.current.rotation.y += delta * def.spinSpeed;
    }
  });

  // Use the texture fix here
  const map = def.mapUrl ? (useTexture(def.mapUrl) as THREE.Texture) : null;

  return (
    <group ref={groupRef}>
      <mesh onClick={() => onSelect(def.name, currentPos, def.radius)}>
        <sphereGeometry args={[def.radius, 64, 64]} />
        <meshStandardMaterial map={map} color={def.color} />
      </mesh>
    </group>
  );
}
// 3. Tilted Orbit Path based on NASA Inclination
function OrbitPath({ pos, radius }: { pos: THREE.Vector3, radius: number }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 256; i++) {
      const a = (i / 256) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return pts;
  }, [radius]);

  // Calculate inclination tilt based on the current Y-position relative to distance
  const inclination = Math.atan2(pos.y, Math.sqrt(pos.x**2 + pos.z**2));

  return (
    <group rotation={[inclination, 0, 0]}>
      <Line points={points} color="white" transparent opacity={0.1} lineWidth={1} />
    </group>
  );
}

export default function SolarSystem() {
  const [data, setData] = useState<Record<string, { pos: THREE.Vector3; vel: THREE.Vector3 }> | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    async function load() {
      const results: any = {};
      let maxDist = 0;
      for (const p of PLANETS) {
        const planetData = await fetchPlanetData(p.id);
        results[p.name] = planetData;
        maxDist = Math.max(maxDist, planetData.pos.length());
      }
      setScale(28 / maxDist); // Map farthest planet to 28 scene units
      setData(results);
    }
    load();
  }, []);

  if (!data) return <div className="h-screen w-full flex items-center justify-center bg-black text-white">Connecting to NASA Horizons...</div>;

  return (
    <div className="h-screen w-full bg-black">
      <Canvas camera={{ position: [0, 20, 50], fov: 45 }}>
        <CameraControls makeDefault />
        <Stars radius={300} depth={60} count={10000} factor={7} saturation={0} fade />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={100} color="#ffcc33" />

        {/* The Sun */}
        <mesh>
          <sphereGeometry args={[2.5, 64, 64]} />
          <meshStandardMaterial color="#ffcc33" emissive="#ff9a00" emissiveIntensity={3} />
        </mesh>

        {PLANETS.map((p) => (
          <React.Fragment key={p.name}>
            <OrbitPath pos={data[p.name].pos} radius={data[p.name].pos.length() * scale} />
            <PlanetMesh def={p} realtimeData={data[p.name]} scale={scale} onSelect={() => {}} showLabels={true} />
          </React.Fragment>
        ))}
      </Canvas>
    </div>
  );
}