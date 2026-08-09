import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { holoCardVariants, holoSpringSnappy } from '../lib/hologramMotion'

type HologramFrameProps = {
  children: ReactNode
  className?: string
  staggered?: boolean
  delay?: number
  onClick?: () => void
}

export default function HologramFrame({
  children,
  className = '',
  staggered = false,
  delay = 0,
  onClick,
}: HologramFrameProps) {
  const Tag = onClick ? motion.button : motion.div

  const motionProps = staggered
    ? { variants: holoCardVariants }
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-40px', amount: 0.15 },
        variants: holoCardVariants,
        transition: { delay, ...holoSpringSnappy },
      }

  return (
    <Tag
      className={`hologram-frame glass-card-lite ${className}`}
      whileHover={{ y: -3, transition: holoSpringSnappy }}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
      {...motionProps}
    >
      <span className="holo-corner holo-corner-tl" />
      <span className="holo-corner holo-corner-tr" />
      <span className="holo-corner holo-corner-bl" />
      <span className="holo-corner holo-corner-br" />
      <span className="holo-scan" aria-hidden="true" />
      <div className="holo-content">{children}</div>
    </Tag>
  )
}
