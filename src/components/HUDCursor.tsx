import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/performance'

export default function HUDCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const reduced = prefersReducedMotion()
    const followStrength = reduced ? 1 : 0.32

    const onMove = (event: PointerEvent) => {
      target.current.x = event.clientX
      target.current.y = event.clientY
    }

    let raf = 0
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * followStrength
      current.current.y += (target.current.y - current.current.y) * followStrength

      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`
      }

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className="hud-reticle" aria-hidden="true">
      <span className="hud-reticle-ring" />
      <span className="hud-reticle-dot" />
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}
