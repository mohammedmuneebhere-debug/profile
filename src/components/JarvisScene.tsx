import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import type { Mesh } from 'three'
import * as THREE from 'three'

function ArcReactorCore() {
  const coreRef = useRef<Mesh>(null)
  const ringARef = useRef<Mesh>(null)
  const ringBRef = useRef<Mesh>(null)
  const ringCRef = useRef<Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.35
      coreRef.current.rotation.x = Math.sin(t * 0.4) * 0.15
    }
    if (ringARef.current) ringARef.current.rotation.z = t * 0.55
    if (ringBRef.current) ringBRef.current.rotation.x = t * 0.42
    if (ringCRef.current) ringCRef.current.rotation.y = -t * 0.38
  })

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.35}>
      <group position={[0, 0, 0]}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.55} />
        </mesh>
        <mesh ref={ringARef}>
          <torusGeometry args={[1.65, 0.02, 16, 120]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.7} />
        </mesh>
        <mesh ref={ringBRef} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[2.05, 0.015, 16, 120]} />
          <meshBasicMaterial color="#ffc107" transparent opacity={0.45} />
        </mesh>
        <mesh ref={ringCRef} rotation={[0, Math.PI / 3, Math.PI / 4]}>
          <torusGeometry args={[2.45, 0.012, 16, 120]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.35} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.18} />
        </mesh>
      </group>
    </Float>
  )
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 2800

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const radius = 8 + Math.random() * 18
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = radius * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#00e5ff" transparent opacity={0.65} sizeAttenuation />
    </points>
  )
}

function HudGrid() {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((state) => {
    if (!gridRef.current) return
    gridRef.current.position.z = (state.clock.elapsedTime * 0.4) % 2
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, '#00e5ff', '#0a1a2a']}
      position={[0, -3.5, 0]}
      rotation={[0, 0, 0]}
    />
  )
}

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const { x, y } = state.pointer
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.35, 0.04)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.2, 0.04)
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#00e5ff" />
      <pointLight position={[-4, -2, 2]} intensity={0.6} color="#ffc107" />
      <ArcReactorCore />
      <ParticleField />
      <HudGrid />
      <Stars radius={60} depth={40} count={1200} factor={3} saturation={0} fade speed={0.6} />
    </group>
  )
}

export default function JarvisScene() {
  return (
    <div className="jarvis-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.5, 7.5], fov: 52 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#02060f', 8, 28]} />
        <SceneContent />
      </Canvas>
    </div>
  )
}
