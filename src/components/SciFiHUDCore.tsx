import { Float, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'
import { isLowPowerDevice } from '../lib/performance'

const CYAN = '#00e5ff'
const GOLD = '#ffc107'

function lineGeometry(points: number[]) {
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
  return geometry
}

function arcPoints(radius: number, start: number, end: number, segments = 40) {
  const pts: number[] = []
  for (let i = 0; i <= segments; i += 1) {
    const angle = THREE.MathUtils.lerp(start, end, i / segments)
    pts.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
  }
  return pts
}

function tickRingPoints(radius: number, ticks: number, majorEvery = 6) {
  const pts: number[] = []
  for (let i = 0; i < ticks; i += 1) {
    const angle = (i / ticks) * Math.PI * 2
    const len = i % majorEvery === 0 ? 0.09 : 0.045
    pts.push(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0,
      Math.cos(angle) * (radius + len),
      Math.sin(angle) * (radius + len),
      0,
    )
  }
  return pts
}

function bracketPoints(size: number, arm: number) {
  const s = size
  const a = arm
  return [
    -s, s, 0, -s + a, s, 0,
    -s, s, 0, -s, s - a, 0,
    s, s, 0, s - a, s, 0,
    s, s, 0, s, s - a, 0,
    -s, -s, 0, -s + a, -s, 0,
    -s, -s, 0, -s, -s + a, 0,
    s, -s, 0, s - a, -s, 0,
    s, -s, 0, s, -s + a, 0,
  ]
}

function hexagonPoints(radius: number) {
  const pts: number[] = []
  for (let i = 0; i < 6; i += 1) {
    const a1 = (i / 6) * Math.PI * 2 - Math.PI / 2
    const a2 = ((i + 1) / 6) * Math.PI * 2 - Math.PI / 2
    pts.push(
      Math.cos(a1) * radius, Math.sin(a1) * radius, 0,
      Math.cos(a2) * radius, Math.sin(a2) * radius, 0,
    )
  }
  return pts
}

const HUD_ARCS = [
  { start: 0.35, end: 1.55, radius: 1.72 },
  { start: 2.45, end: 3.65, radius: 1.72 },
  { start: 4.55, end: 5.55, radius: 1.72 },
] as const

export default function SciFiHUDCore() {
  const lowPower = isLowPowerDevice()
  const clusterRef = useRef<Group>(null)
  const coreRef = useRef<Mesh>(null)
  const reactorRef = useRef<Mesh>(null)
  const ringARef = useRef<Group>(null)
  const ringBRef = useRef<Group>(null)
  const ringCRef = useRef<Group>(null)
  const sweepRef = useRef<Group>(null)
  const pulseRingRef = useRef<Mesh>(null)
  const dataBarsRef = useRef<Group>(null)
  const pointerSmooth = useRef({ x: 0, y: 0 })
  const velocity = useRef(0)

  const geometries = useMemo(() => {
    const hex = lineGeometry(hexagonPoints(0.52))
    const bracket = lineGeometry(bracketPoints(1.95, 0.28))
    const ticks = lineGeometry(tickRingPoints(1.38, lowPower ? 36 : 48))
    const innerRing = lineGeometry(arcPoints(1.12, 0, Math.PI * 2, 64))
    const crosshairH = lineGeometry([-2.1, 0, 0, 2.1, 0, 0])
    const crosshairV = lineGeometry([0, -2.1, 0, 0, 2.1, 0])
    const arcs = HUD_ARCS.map((arc) => lineGeometry(arcPoints(arc.radius, arc.start, arc.end, 32)))
    const orbitRing = lineGeometry(arcPoints(1.48, 0, Math.PI * 2, 72))
    return { hex, bracket, ticks, innerRing, crosshairH, crosshairV, arcs, orbitRing }
  }, [lowPower])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const { x: px, y: py } = state.pointer
    const lerp = Math.min(1, delta * 14)

    pointerSmooth.current.x = THREE.MathUtils.lerp(pointerSmooth.current.x, px, lerp)
    pointerSmooth.current.y = THREE.MathUtils.lerp(pointerSmooth.current.y, py, lerp)

    const dx = px - pointerSmooth.current.x
    const dy = py - pointerSmooth.current.y
    velocity.current = THREE.MathUtils.lerp(velocity.current, Math.hypot(dx, dy) * 60, lerp)

    const energy = 1 + Math.min(velocity.current * 0.06, 0.28)
    const tiltX = pointerSmooth.current.y * 0.28
    const tiltY = pointerSmooth.current.x * 0.36

    if (clusterRef.current) {
      clusterRef.current.rotation.x = THREE.MathUtils.lerp(clusterRef.current.rotation.x, tiltX, lerp)
      clusterRef.current.rotation.y = THREE.MathUtils.lerp(clusterRef.current.rotation.y, tiltY, lerp)
      clusterRef.current.position.x = THREE.MathUtils.lerp(clusterRef.current.position.x, pointerSmooth.current.x * 0.18, lerp)
      clusterRef.current.position.y = THREE.MathUtils.lerp(
        clusterRef.current.position.y,
        0.08 + pointerSmooth.current.y * 0.12,
        lerp,
      )
      clusterRef.current.scale.setScalar(THREE.MathUtils.lerp(clusterRef.current.scale.x, energy, lerp * 0.55))
    }

    if (ringARef.current) ringARef.current.rotation.z = t * 0.42
    if (ringBRef.current) ringBRef.current.rotation.z = -t * 0.28
    if (ringCRef.current) ringCRef.current.rotation.z = t * 0.18
    if (sweepRef.current) sweepRef.current.rotation.z = t * 1.15

    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 3.2) * 0.08 + velocity.current * 0.01
      coreRef.current.scale.setScalar(pulse)
    }

    if (reactorRef.current) {
      reactorRef.current.rotation.z = -t * 0.65
    }

    if (pulseRingRef.current) {
      const scale = 1 + (Math.sin(t * 2.4) + 1) * 0.06
      pulseRingRef.current.scale.set(scale, scale, 1)
      const mat = pulseRingRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.22 + (Math.sin(t * 3.6) + 1) * 0.12
    }

    if (dataBarsRef.current) {
      dataBarsRef.current.children.forEach((child, index) => {
        const mesh = child as Mesh
        const h = 0.08 + Math.abs(Math.sin(t * 2.2 + index * 0.7)) * 0.18
        mesh.scale.y = h
      })
    }
  })

  const dataBarCount = lowPower ? 6 : 10

  return (
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.22}>
      <group ref={clusterRef} position={[0, 0.08, -1.05]}>
        {/* Crosshair guides */}
        <lineSegments geometry={geometries.crosshairH}>
          <lineBasicMaterial color={CYAN} transparent opacity={0.12} />
        </lineSegments>
        <lineSegments geometry={geometries.crosshairV}>
          <lineBasicMaterial color={CYAN} transparent opacity={0.12} />
        </lineSegments>

        {/* Corner HUD brackets */}
        <lineSegments geometry={geometries.bracket}>
          <lineBasicMaterial color={CYAN} transparent opacity={0.72} linewidth={1} />
        </lineSegments>

        {/* Outer segmented arcs */}
        <group ref={ringARef}>
          {geometries.arcs.map((arc, index) => (
            <lineSegments key={`arc-${index}`} geometry={arc}>
              <lineBasicMaterial color={index === 1 ? GOLD : CYAN} transparent opacity={0.82} />
            </lineSegments>
          ))}
        </group>

        {/* Tick ring */}
        <group ref={ringBRef}>
          <lineSegments geometry={geometries.ticks}>
            <lineBasicMaterial color={CYAN} transparent opacity={0.55} />
          </lineSegments>
          <lineSegments geometry={geometries.orbitRing}>
            <lineBasicMaterial color={CYAN} transparent opacity={0.2} />
          </lineSegments>
        </group>

        {/* Inner ring + hex frame */}
        <group ref={ringCRef}>
          <lineSegments geometry={geometries.innerRing}>
            <lineBasicMaterial color={CYAN} transparent opacity={0.45} />
          </lineSegments>
          <lineSegments geometry={geometries.hex}>
            <lineBasicMaterial color={GOLD} transparent opacity={0.7} />
          </lineSegments>
        </group>

        {/* Radar sweep */}
        <group ref={sweepRef}>
          <mesh position={[0, 0.9, 0]}>
            <planeGeometry args={[0.018, 1.85]} />
            <meshBasicMaterial color={CYAN} transparent opacity={0.28} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI]}>
            <ringGeometry args={[1.05, 1.72, 64, 1, 0, 0.55]} />
            <meshBasicMaterial color={CYAN} transparent opacity={0.14} side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Pulsing scan ring */}
        <mesh ref={pulseRingRef}>
          <ringGeometry args={[0.88, 0.9, 48]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>

        {/* Reactor torus */}
        <mesh ref={reactorRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.62, 0.028, 12, 64]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.75} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.62, 0.008, 8, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>

        {/* Core */}
        <mesh ref={coreRef}>
          <cylinderGeometry args={[0.34, 0.34, 0.12, 6]} />
          <meshStandardMaterial
            color={CYAN}
            emissive={CYAN}
            emissiveIntensity={1.2}
            metalness={0.6}
            roughness={0.2}
            transparent
            opacity={0.95}
          />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <circleGeometry args={[0.2, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.92} />
        </mesh>

        {/* Orbital data bars */}
        <group ref={dataBarsRef}>
          {Array.from({ length: dataBarCount }, (_, index) => {
            const angle = (index / dataBarCount) * Math.PI * 2
            const radius = 1.22
            return (
              <mesh
                key={`bar-${index}`}
                position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
                rotation={[0, 0, angle + Math.PI / 2]}
              >
                <boxGeometry args={[0.035, 0.12, 0.02]} />
                <meshBasicMaterial color={index % 3 === 0 ? GOLD : CYAN} transparent opacity={0.75} />
              </mesh>
            )
          })}
        </group>

        {/* HUD label */}
        {!lowPower ? (
          <>
            <Text
              position={[0, -0.22, 0.12]}
              fontSize={0.11}
              color={CYAN}
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.08}
            >
              MMR NEXUS
            </Text>
            <Text
              position={[0, -0.38, 0.1]}
              fontSize={0.055}
              color={GOLD}
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.12}
            >
              SYS.ONLINE
            </Text>
          </>
        ) : null}

        <pointLight position={[0, 0, 0.8]} intensity={2.2} color={CYAN} distance={3.5} />
        <pointLight position={[0.8, 0.6, 0.3]} intensity={0.8} color={GOLD} distance={2.5} />
      </group>
    </Float>
  )
}
