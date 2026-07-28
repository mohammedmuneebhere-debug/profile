import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type HologramFrameProps = {
  children: ReactNode
  className?: string
  delay?: number
  onClick?: () => void
}

export default function HologramFrame({ children, className = '', delay = 0, onClick }: HologramFrameProps) {
  const Tag = onClick ? motion.button : motion.div

  return (
    <Tag
      className={`hologram-frame ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay }}
      whileHover={{ y: -6, boxShadow: '0 0 32px rgba(0, 229, 255, 0.18)' }}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      <span className="holo-corner holo-corner-tl" />
      <span className="holo-corner holo-corner-tr" />
      <span className="holo-corner holo-corner-bl" />
      <span className="holo-corner holo-corner-br" />
      <span className="holo-scan" aria-hidden="true" />
      {children}
    </Tag>
  )
}
