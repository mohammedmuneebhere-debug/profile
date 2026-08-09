import { motion, useSpring } from 'framer-motion'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { isTouchDevice } from '../lib/performance'

type LiquidGlassProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  intensity?: 'soft' | 'medium' | 'strong'
  variant?: 'full' | 'lite'
  onClick?: () => void
  as?: 'div' | 'button' | 'section' | 'nav'
  'aria-label'?: string
}

export default function LiquidGlass({
  children,
  className = '',
  style,
  intensity = 'medium',
  variant = 'full',
  onClick,
  as = 'div',
  'aria-label': ariaLabel,
}: LiquidGlassProps) {
  const touch = isTouchDevice()
  const shineX = useSpring(50, { stiffness: 140, damping: 28, mass: 0.6 })
  const shineY = useSpring(50, { stiffness: 140, damping: 28, mass: 0.6 })
  const pending = useRef<{ x: number; y: number } | null>(null)
  const frameId = useRef(0)

  const flushShine = useCallback(() => {
    frameId.current = 0
    if (!pending.current) return
    shineX.set(pending.current.x)
    shineY.set(pending.current.y)
    pending.current = null
  }, [shineX, shineY])

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (touch || variant === 'lite') return
    const rect = event.currentTarget.getBoundingClientRect()
    pending.current = {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    }
    if (!frameId.current) {
      frameId.current = requestAnimationFrame(flushShine)
    }
  }

  const handleLeave = () => {
    if (touch || variant === 'lite') return
    shineX.set(50)
    shineY.set(50)
  }

  useEffect(() => {
    return () => {
      if (frameId.current) cancelAnimationFrame(frameId.current)
    }
  }, [])

  const commonProps = {
    className: `liquid-glass liquid-glass-${intensity} liquid-glass-${variant} ${className}`.trim(),
    style,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
    'aria-label': ariaLabel,
  }

  const layers = (
    <>
      {variant === 'full' ? <span className="liquid-glass-filter" aria-hidden="true" /> : null}
      <span className="liquid-glass-bg" aria-hidden="true" />
      {variant === 'full' && !touch ? (
        <motion.span
          className="liquid-glass-shine"
          aria-hidden="true"
          style={{ left: shineX, top: shineY }}
        />
      ) : null}
      {variant === 'full' ? <span className="liquid-glass-caustic" aria-hidden="true" /> : null}
      <span className="liquid-glass-edge" aria-hidden="true" />
      {variant === 'full' ? <span className="liquid-glass-ripple" aria-hidden="true" /> : null}
      <div className="liquid-glass-content">{children}</div>
    </>
  )

  if (as === 'button') {
    return (
      <motion.button type="button" {...commonProps}>
        {layers}
      </motion.button>
    )
  }

  if (as === 'nav') {
    return <motion.nav {...commonProps}>{layers}</motion.nav>
  }

  if (as === 'section') {
    return <motion.section {...commonProps}>{layers}</motion.section>
  }

  return <motion.div {...commonProps}>{layers}</motion.div>
}
