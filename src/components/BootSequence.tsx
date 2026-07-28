import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { bootLines, systemBrand } from '../data/portfolio'

type BootSequenceProps = {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [lineIndex, setLineIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (lineIndex >= bootLines.length) {
      const timer = window.setTimeout(() => setDone(true), 600)
      return () => window.clearTimeout(timer)
    }

    const timer = window.setTimeout(() => {
      setLineIndex((prev) => prev + 1)
      setProgress(((lineIndex + 1) / bootLines.length) * 100)
    }, 520)

    return () => window.clearTimeout(timer)
  }, [lineIndex])

  useEffect(() => {
    if (!done) return
    const timer = window.setTimeout(onComplete, 700)
    return () => window.clearTimeout(timer)
  }, [done, onComplete])

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className="boot-sequence"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.65 }}
        >
          <div className="boot-core">
            <div className="boot-reactor">
              <span />
              <span />
              <span />
            </div>
            <p className="boot-label">{systemBrand.fullName.toUpperCase()} // {systemBrand.name.toUpperCase()}</p>
            <div className="boot-log">
              {bootLines.slice(0, lineIndex).map((line) => (
                <motion.p key={line} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="boot-prompt">&gt;</span> {line}
                </motion.p>
              ))}
            </div>
            <div className="boot-progress">
              <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.35 }} />
            </div>
            <p className="boot-percent">{Math.round(progress)}%</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
