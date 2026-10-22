import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function SCurveMesh() {
  // Define control points in 3D space that trace out an "S" shape
  const sCurve = useMemo(() => {
    const points = [
      new THREE.Vector3(-1.2, 1.8, 0),   // Top left tail
      new THREE.Vector3(0.8, 1.4, 0.4),  // Top curve arch
      new THREE.Vector3(0, 0, 0),        // Middle intersection
      new THREE.Vector3(-0.8, -1.4, -0.4),// Bottom curve arch
      new THREE.Vector3(1.2, -1.8, 0),   // Bottom right tail
    ];
    return new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.5);
  }, []);

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh rotation={[0, 0, THREE.MathUtils.degToRad(-10)]}>
        {/* tubeGeometry args: [path, tubularSegments, radius, radialSegments, closed] */}
        <tubeGeometry args={[sCurve, 128, 0.45, 32, false]} />
        
        {/* High-end glass material with chromatic dispersion */}
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.9}
          roughness={0.12}
          ior={1.35}
          chromaticAberration={0.7}
          thickness={0.8}
          color="#d8b4fe"
        />
      </mesh>
    </Float>
  );
}

export default function FluidCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
      {/* Pink, Purple, and Cyan Studio Lighting */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 10, 5]} intensity={3.5} color="#ec4899" />
      <directionalLight position={[-10, -10, -5]} intensity={3.5} color="#06b6d4" />
      <pointLight position={[0, 0, 3]} intensity={2.5} color="#a855f7" />

      <SCurveMesh />
    </Canvas>
  );
}
