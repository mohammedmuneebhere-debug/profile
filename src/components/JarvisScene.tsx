import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import SciFiHUDCore from './SciFiHUDCore'
import { getDevicePixelRatio, isLowPowerDevice } from '../lib/performance'

function SpatialGlassPanel({
  position,
  rotation,
  scale,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}) {
  return (
    <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.32}>
      <mesh position={position} rotation={rotation ?? [0, 0, 0]} scale={scale ?? 1}>
        <planeGeometry args={[2.8, 1.6, 1, 1]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.04} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  )
}

function ParticleField({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const radius = 10 + Math.random() * 22
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = radius * Math.cos(phi) - 4
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.018
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.026} color="#7dd3fc" transparent opacity={0.45} sizeAttenuation />
    </points>
  )
}

function SceneContent({ lowPower }: { lowPower: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const pointerSmooth = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const lerp = Math.min(1, delta * 12)
    pointerSmooth.current.x = THREE.MathUtils.lerp(pointerSmooth.current.x, state.pointer.x, lerp)
    pointerSmooth.current.y = THREE.MathUtils.lerp(pointerSmooth.current.y, state.pointer.y, lerp)

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointerSmooth.current.x * 0.2,
      lerp,
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointerSmooth.current.y * 0.11,
      lerp,
    )
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      -pointerSmooth.current.y * 0.2,
      lerp,
    )
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} color="#dffcff" />
      <pointLight position={[5, 5, 5]} intensity={1.4} color="#00e5ff" />
      <pointLight position={[-5, -3, 3]} intensity={0.65} color="#c4b5fd" />
      <SciFiHUDCore />
      <ParticleField count={lowPower ? 700 : 1100} />
      {!lowPower ? (
        <>
          <SpatialGlassPanel position={[-3.5, 1.2, -3]} rotation={[0, 0.4, 0.1]} scale={1.2} />
          <SpatialGlassPanel position={[3.8, -0.8, -4.5]} rotation={[0, -0.5, -0.08]} scale={0.9} />
          <SpatialGlassPanel position={[0.5, 2.2, -5]} rotation={[0.2, 0.1, 0]} scale={1.4} />
        </>
      ) : null}
      <Stars radius={70} depth={50} count={lowPower ? 280 : 450} factor={2.2} saturation={0} fade speed={0.45} />
    </group>
  )
}

export default function JarvisScene() {
  const lowPower = isLowPowerDevice()
  const [visible, setVisible] = useState(() => typeof document === 'undefined' || !document.hidden)
  const dpr = getDevicePixelRatio(lowPower ? 1 : 1.25)

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return (
    <div className="jarvis-scene spatial-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.2, 7.8], fov: 46 }}
        dpr={dpr}
        frameloop={visible ? 'always' : 'demand'}
        gl={{
          antialias: !lowPower,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <fog attach="fog" args={['#030712', 10, 32]} />
        <SceneContent lowPower={lowPower} />
      </Canvas>
    </div>
  )
}
