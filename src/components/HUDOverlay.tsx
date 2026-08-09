import { motion } from 'framer-motion'
import { memo, useEffect, useState } from 'react'
import { profile, systemModules } from '../data/portfolio'

function CornerBracket({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <path d="M4 24V4H24" stroke="currentColor" strokeWidth="1.5" />
      <path d="M56 4H76V24" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 56V76H24" stroke="currentColor" strokeWidth="1.5" />
      <path d="M56 76H76V56" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

const HUDModule = memo(function HUDModule({
  mod,
  index,
  side,
}: {
  mod: (typeof systemModules)[number]
  index: number
  side: 'left' | 'right'
}) {
  const xOffset = side === 'left' ? -20 : 20

  return (
    <motion.div
      className="hud-module"
      initial={{ opacity: 0, x: xOffset }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + index * 0.12, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span>{mod.label}</span>
      <strong>{mod.status}</strong>
      <div className="hud-module-bar">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${mod.load}%` }}
          transition={{ duration: 0.9, delay: 0.55 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </motion.div>
  )
})

export default function HUDOverlay() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
      )
    }
    tick()
    const interval = window.setInterval(tick, 1000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="hud-overlay" aria-hidden="true">
      <div className="scanlines" />
      <div className="hud-vignette" />

      <CornerBracket className="hud-corner hud-corner-tl" />
      <CornerBracket className="hud-corner hud-corner-tr" />
      <CornerBracket className="hud-corner hud-corner-bl" />
      <CornerBracket className="hud-corner hud-corner-br" />

      <div className="hud-top-bar">
        <span>SYS.MODE: MMR_NEXUS</span>
        <span>LOC: {profile.location.toUpperCase()}</span>
        <span className="hud-clock">{time} IST</span>
      </div>

      <div className="hud-side hud-side-left">
        {systemModules.slice(0, 2).map((mod, index) => (
          <HUDModule key={mod.id} mod={mod} index={index} side="left" />
        ))}
      </div>

      <div className="hud-side hud-side-right">
        {systemModules.slice(2).map((mod, index) => (
          <HUDModule key={mod.id} mod={mod} index={index} side="right" />
        ))}
      </div>

      <div className="hud-radar">
        <span className="radar-sweep" />
      </div>
    </div>
  )
}
