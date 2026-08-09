import { motion } from 'framer-motion'
import { holoSpring } from '../lib/hologramMotion'
import LiquidGlass from './LiquidGlass'

type SpatialDockProps = {
  brand: string
  items: { id: string; label: string }[]
  activeId: string
  onSelect: (id: string) => void
  booted: boolean
}

export default function SpatialDock({ brand, items, activeId, onSelect, booted }: SpatialDockProps) {
  return (
    <motion.header
      className="spatial-dock-wrap"
      initial={{ opacity: 0, y: -20 }}
      animate={booted ? { opacity: 1, y: 0 } : {}}
      transition={{ ...holoSpring, delay: 0.1 }}
    >
      <LiquidGlass as="nav" className="spatial-dock" intensity="strong" aria-label="Main navigation">
        <a href="#home" className="spatial-dock-brand" onClick={() => onSelect('home')}>
          <span className="spatial-dock-orb" />
          {brand}
        </a>
        <div className="spatial-dock-links">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeId === item.id ? 'is-active' : ''}
              onClick={() => onSelect(item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </LiquidGlass>
    </motion.header>
  )
}
