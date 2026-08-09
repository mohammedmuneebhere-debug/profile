import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { holoGridVariants } from '../lib/hologramMotion'

type HoloGridProps = {
  className: string
  children: ReactNode
}

export default function HoloGrid({ className, children }: HoloGridProps) {
  return (
    <motion.div
      className={`holo-grid ${className}`.trim()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px', amount: 0.08 }}
      variants={holoGridVariants}
    >
      {children}
    </motion.div>
  )
}
