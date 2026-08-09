import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { getSectionSlide } from '../lib/hologramMotion'

type GlassSectionProps = {
  id?: string
  className?: string
  children: ReactNode
  from?: 'left' | 'right' | 'bottom'
}

export default function GlassSection({
  id,
  className = '',
  children,
  from = 'left',
}: GlassSectionProps) {
  return (
    <motion.section
      id={id}
      className={`jarvis-section glass-section ${className}`.trim()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px', amount: 0.12 }}
      variants={getSectionSlide(from)}
    >
      {children}
    </motion.section>
  )
}
